import { NextResponse, type NextRequest } from "next/server";
import { isRateLimited, clientIp } from "@/lib/rate-limit";

/**
 * Приём отзывов с сайта. Отзыв НЕ публикуется автоматически:
 * он уходит в ту же Telegram-группу менеджеров, что и заявки,
 * с пометкой «НОВЫЙ ОТЗЫВ» — после проверки менеджер вручную добавляет
 * его в lib/testimonials.ts (один объект = один отзыв).
 *
 * Принимает multipart/form-data: name, occasion, rating (1–5), text,
 * contact (необязательно), photo (необязательно, до 8 МБ),
 * consent, website (honeypot), page.
 */

const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const str = (v: FormDataEntryValue | null) =>
  typeof v === "string" ? v.trim() : "";

export async function POST(req: NextRequest) {
  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  // Honeypot: боты заполняют скрытое поле — отвечаем «успехом» и выходим.
  if (str(fd.get("website"))) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req.headers);
  if (isRateLimited(`review:${ip}`, 3)) {
    return NextResponse.json(
      { error: "Слишком много отзывов с вашего адреса. Попробуйте позже." },
      { status: 429 },
    );
  }

  const name = str(fd.get("name"));
  const occasion = str(fd.get("occasion"));
  const text = str(fd.get("text"));
  const contact = str(fd.get("contact"));
  const rating = Number(str(fd.get("rating")));

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Поставьте оценку от 1 до 5" }, { status: 400 });
  }
  if (text.length < 10 || text.length > 2000) {
    return NextResponse.json(
      { error: "Расскажите чуть подробнее — от 10 символов" },
      { status: 400 },
    );
  }
  if (str(fd.get("consent")) !== "on") {
    return NextResponse.json(
      { error: "Нужно согласие на публикацию и обработку персональных данных" },
      { status: 400 },
    );
  }

  const photo = fd.get("photo");
  const hasPhoto = photo instanceof File && photo.size > 0;
  if (hasPhoto) {
    if (photo.size > MAX_PHOTO_BYTES) {
      return NextResponse.json({ error: "Фото больше 8 МБ" }, { status: 400 });
    }
    if (!photo.type.startsWith("image/")) {
      return NextResponse.json({ error: "Можно приложить только изображение" }, { status: 400 });
    }
  }

  const submittedAt = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
  const lines = [
    "⭐️ <b>НОВЫЙ ОТЗЫВ</b> — на модерацию, на сайте не публикуется автоматически",
    `<b>Имя:</b> ${esc(name)}`,
    occasion && `<b>Повод:</b> ${esc(occasion)}`,
    `<b>Оценка:</b> ${stars} (${rating}/5)`,
    `<b>Отзыв:</b> ${esc(text)}`,
    contact && `<b>Контакт:</b> ${esc(contact)}`,
    hasPhoto && "<b>Фото:</b> приложено отдельным сообщением",
    `<b>Отправлено:</b> ${submittedAt} (МСК)`,
    "\nОпубликовать: добавить объект в lib/testimonials.ts",
  ].filter(Boolean);
  const message = lines.join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // В деве без настроенного бота логируем отзыв и отвечаем успехом.
    console.warn("[review] TELEGRAM_* не настроены. Отзыв:\n" + message);
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
    });
    if (!tgRes.ok) {
      console.error("[review] Telegram error:", await tgRes.text());
      return NextResponse.json(
        { error: "Не получилось отправить отзыв автоматически." },
        { status: 502 },
      );
    }
  } catch (e) {
    console.error("[review] Telegram unreachable:", e);
    return NextResponse.json(
      { error: "Не получилось отправить отзыв автоматически." },
      { status: 502 },
    );
  }

  // Фото — отдельным сообщением; его сбой не роняет уже принятый отзыв.
  if (hasPhoto) {
    try {
      const photoFd = new FormData();
      photoFd.append("chat_id", chatId);
      photoFd.append("caption", `Фото к отзыву от ${name}`);
      photoFd.append("photo", photo, photo.name || "review.jpg");
      const phRes = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: "POST",
        body: photoFd,
      });
      if (!phRes.ok) console.error("[review] Telegram photo error:", await phRes.text());
    } catch (e) {
      console.error("[review] Telegram photo unreachable:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
