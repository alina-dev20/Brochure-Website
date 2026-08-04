"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { OCCASIONS } from "@/lib/occasions";
import { SITE } from "@/lib/site";
import { MANAGERS } from "@/lib/contacts";
import { reachGoal } from "@/lib/metrika";
import { MagneticButton } from "./MagneticButton";

export interface LeadPrefill {
  occasion?: string;
  template?: string;
  comment?: string;
}

/** Событие для предзаполнения формы (шлют калькулятор и страницы шаблонов). */
export const LEAD_PREFILL_EVENT = "lead-prefill";

export function prefillLeadForm(detail: LeadPrefill) {
  window.dispatchEvent(new CustomEvent(LEAD_PREFILL_EVENT, { detail }));
  document.getElementById("zayavka")?.scrollIntoView({ behavior: "smooth" });
}

/** Маска телефона: цифры → +7 (999) 123-45-67; @ники и текст не трогаем. */
function formatPhone(raw: string): string {
  if (/^[@a-zA-Zа-яА-Я]/.test(raw.trim())) return raw;
  let digits = raw.replace(/\D/g, "");
  if (!digits) return raw.startsWith("+") ? "+" : "";
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);
  const p = digits.slice(1);
  let out = "+7";
  if (p.length) out += ` (${p.slice(0, 3)}`;
  if (p.length >= 3) out += `) ${p.slice(3, 6)}`;
  if (p.length >= 6) out += `-${p.slice(6, 8)}`;
  if (p.length >= 8) out += `-${p.slice(8, 10)}`;
  return out;
}

const inputCls =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent";

export function LeadForm({ initial }: { initial?: LeadPrefill }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState(initial?.occasion ?? "");
  const [template, setTemplate] = useState(initial?.template ?? "");
  const [comment, setComment] = useState(initial?.comment ?? "");

  // Предзаполнение из калькулятора / карточек шаблонов
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const d = (e as CustomEvent<LeadPrefill>).detail;
      if (d.occasion !== undefined) setOccasion(d.occasion);
      if (d.template !== undefined) setTemplate(d.template);
      if (d.comment !== undefined) setComment(d.comment);
    };
    window.addEventListener(LEAD_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(LEAD_PREFILL_EVENT, onPrefill);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      messenger: String(fd.get("messenger") ?? ""),
      occasion: String(fd.get("occasion") ?? ""),
      template: String(fd.get("template") ?? ""),
      eventDate: String(fd.get("eventDate") ?? ""),
      comment: String(fd.get("comment") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      /** Страница, с которой отправлена заявка — уходит менеджерам */
      page: window.location.pathname + window.location.search,
    };
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Что-то пошло не так");
      reachGoal("lead_submit");
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-line bg-card p-8 text-center sm:p-12">
        <p className="font-display text-3xl">Спасибо!</p>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
          Заявка уже у менеджеров. Ответим в выбранный мессенджер в течение{" "}
          {SITE.replyTimeHours} часов — обычно быстрее.
        </p>
        <div className="mt-6 text-sm">
          <p className="text-muted">Не хочется ждать? Напишите напрямую:</p>
          <p className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
            {MANAGERS.map((m) => (
              <a
                key={m.telegram.handle}
                href={m.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent hover:underline"
              >
                {m.telegram.handle}
              </a>
            ))}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-3xl border border-line bg-card p-5 sm:p-8"
      aria-label="Форма заявки"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Ваше имя *
          <input name="name" required minLength={2} maxLength={100} placeholder="Анна" className={inputCls} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Телефон или @ник *
          <input
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="+7 (999) 123-45-67 или @nick"
            className={inputCls}
            inputMode="tel"
          />
        </label>
      </div>

      <fieldset className="grid gap-1.5">
        <legend className="mb-1.5 text-sm font-medium">Куда вам удобнее написать?</legend>
        <div className="flex gap-2">
          {["Telegram", "WhatsApp"].map((m, i) => (
            <label
              key={m}
              className="flex-1 cursor-pointer rounded-2xl border border-line px-4 py-3 text-center text-sm font-medium transition-colors has-checked:border-accent has-checked:bg-accent-soft"
            >
              <input type="radio" name="messenger" value={m} defaultChecked={i === 0} className="sr-only" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Повод
          <select
            name="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className={inputCls}
          >
            <option value="">Выберите повод</option>
            {OCCASIONS.map((o) => (
              <option key={o.slug} value={o.title}>
                {o.title}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Дата события
          <input name="eventDate" type="date" className={inputCls} />
        </label>
      </div>

      <label className="grid gap-1.5 text-sm font-medium">
        Выбранный шаблон
        <input
          name="template"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          placeholder="Например, «Тишина» — или оставьте пустым"
          className={inputCls}
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        Комментарий
        <textarea
          name="comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Пара слов о событии, пожелания, вопросы"
          className={`${inputCls} resize-y`}
        />
      </label>

      {/* Honeypot: скрыт от людей, боты его заполняют */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label>
          Ваш сайт
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-xs text-muted">
        <input type="checkbox" name="consent" required className="mt-0.5 size-4 accent-(--accent)" />
        <span>
          Согласен(на) на обработку персональных данных в соответствии с{" "}
          <Link href="/policy" className="underline transition-colors hover:text-accent">
            политикой конфиденциальности
          </Link>{" "}
          *
        </span>
      </label>

      {error && (
        <div role="alert" className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <p className="mt-2 text-fg">
            Заявка не потеряется — напишите нам напрямую:{" "}
            {MANAGERS.map((m, i) => (
              <span key={m.telegram.handle}>
                {i > 0 && " · "}
                <a
                  href={m.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:underline"
                >
                  {m.telegram.handle}
                </a>{" "}
                /{" "}
                <a
                  href={m.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:underline"
                >
                  WhatsApp
                </a>
              </span>
            ))}
          </p>
        </div>
      )}

      <MagneticButton type="submit" disabled={status === "loading"} className="w-full sm:w-auto sm:justify-self-start sm:px-10">
        {status === "loading" ? "Отправляем…" : "Отправить заявку"}
      </MagneticButton>
    </form>
  );
}
