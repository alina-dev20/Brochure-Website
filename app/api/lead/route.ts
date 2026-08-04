import { NextResponse, type NextRequest } from "next/server";

/**
 * Приём заявок: валидация → защита от спама → Telegram-группа менеджеров
 * (+ опционально строка в Google Таблицу).
 *
 * Переменные окружения (.env.local, см. .env.example и README):
 *  TELEGRAM_BOT_TOKEN  — токен бота от @BotFather
 *  TELEGRAM_CHAT_ID    — id закрытой группы с менеджерами (обычно -100…)
 *  SHEETS_WEBHOOK_URL  — (необязательно) URL веб-приложения Google Apps Script;
 *                        если задан — каждая заявка дублируется строкой в таблицу
 */

interface LeadPayload {
  name?: string;
  phone?: string;
  messenger?: string;
  occasion?: string;
  template?: string;
  eventDate?: string;
  comment?: string;
  consent?: boolean;
  page?: string;
  /** honeypot: реальные пользователи это поле не видят и не заполняют */
  website?: string;
}

// Простейший rate limit в памяти процесса: до 5 заявок в час с одного IP.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_LIMIT) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Прямая ссылка на клиента для кнопки «Написать клиенту» */
function clientLink(contact: string, messenger: string): string | null {
  const c = contact.trim();
  if (c.startsWith("@")) return `https://t.me/${c.slice(1)}`;
  const digits = c.replace(/\D/g, "");
  if (digits.length >= 10) {
    const normalized = digits.startsWith("8") ? "7" + digits.slice(1) : digits;
    return messenger === "Telegram"
      ? `https://t.me/+${normalized}`
      : `https://wa.me/${normalized}`;
  }
  return null;
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  // Honeypot: боты заполняют скрытое поле — отвечаем «успехом» и выходим.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Слишком много заявок с вашего адреса. Попробуйте позже." },
      { status: 429 },
    );
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
  }
  if (phone.length < 5 || phone.length > 60) {
    return NextResponse.json(
      { error: "Укажите телефон или ник в мессенджере" },
      { status: 400 },
    );
  }
  if (!body.consent) {
    return NextResponse.json(
      { error: "Нужно согласие на обработку персональных данных" },
      { status: 400 },
    );
  }

  const submittedAt = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const lines = [
    "🎉 <b>Новая заявка с сайта</b>",
    `<b>Имя:</b> ${esc(name)}`,
    `<b>Контакт:</b> ${esc(phone)}`,
    body.messenger && `<b>Удобный мессенджер:</b> ${esc(body.messenger)}`,
    body.occasion && `<b>Повод:</b> ${esc(body.occasion)}`,
    body.template && `<b>Шаблон:</b> ${esc(body.template)}`,
    body.eventDate && `<b>Дата события:</b> ${esc(body.eventDate)}`,
    body.comment && `<b>Комментарий:</b> ${esc(body.comment.slice(0, 1500))}`,
    `<b>Отправлено:</b> ${submittedAt} (МСК)`,
    body.page && `<b>Страница:</b> ${esc(body.page)}`,
  ].filter(Boolean);
  const text = lines.join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // В деве без настроенного бота логируем заявку и отвечаем успехом,
    // чтобы можно было проверить весь путь формы.
    console.warn("[lead] TELEGRAM_* не настроены. Заявка:\n" + text);
    await sendToSheet(body, submittedAt);
    return NextResponse.json({ ok: true, dev: true });
  }

  const link = clientLink(phone, body.messenger ?? "");
  let tgOk = false;
  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          ...(link && {
            reply_markup: {
              inline_keyboard: [[{ text: "✍️ Написать клиенту", url: link }]],
            },
          }),
        }),
      },
    );
    tgOk = tgRes.ok;
    if (!tgRes.ok) console.error("[lead] Telegram error:", await tgRes.text());
  } catch (e) {
    console.error("[lead] Telegram unreachable:", e);
  }

  // Дубль в Google Таблицу — не должен ронять заявку при сбое.
  await sendToSheet(body, submittedAt);

  if (!tgOk) {
    return NextResponse.json(
      { error: "Не получилось отправить заявку автоматически." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}

/**
 * Опциональный архив заявок в Google Таблице.
 * Включается переменной SHEETS_WEBHOOK_URL (Apps Script Web App, см. README).
 * Колонки строки: дата, имя, контакт, мессенджер, повод, шаблон, дата события,
 * комментарий (с суммой из калькулятора), страница, статус (пустой — для ручной
 * отметки менеджером).
 */
async function sendToSheet(body: LeadPayload, submittedAt: string) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        row: [
          submittedAt,
          body.name ?? "",
          body.phone ?? "",
          body.messenger ?? "",
          body.occasion ?? "",
          body.template ?? "",
          body.eventDate ?? "",
          body.comment ?? "",
          body.page ?? "",
          "", // статус — заполняется вручную
        ],
      }),
    });
  } catch (e) {
    console.error("[lead] Sheets error:", e);
  }
}
