"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { OCCASIONS } from "@/lib/occasions";
import { MagneticButton } from "./MagneticButton";

/**
 * «Оставить отзыв»: кнопка под каруселью отзывов открывает модальное окно
 * с формой в стилистике формы заявки. Отзыв не публикуется автоматически —
 * уходит в Telegram-группу менеджеров с пометкой «НОВЫЙ ОТЗЫВ» и появляется
 * на сайте после ручной проверки (см. app/api/review/route.ts).
 */

const inputCls =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent";

const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

export function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);
  const [photoName, setPhotoName] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape закрывает окно, фон под ним не скроллится
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    fd.set("page", window.location.pathname + window.location.search);

    const photo = fd.get("photo");
    if (photo instanceof File && photo.size > MAX_PHOTO_BYTES) {
      setError("Фото больше 8 МБ — приложите файл поменьше.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/review", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Что-то пошло не так");
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    }
  }

  return (
    <div className="mt-8 flex justify-center">
      <MagneticButton variant="ghost" onClick={() => setOpen(true)} className="px-8">
        Оставить отзыв
      </MagneticButton>

      {open && (
        <div
          className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Форма отзыва"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div ref={dialogRef} className="my-8 w-full max-w-lg">
            {status === "done" ? (
              <div className="rounded-3xl border border-line bg-card p-8 text-center sm:p-12">
                <p className="font-display text-3xl">Спасибо за отзыв!</p>
                <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
                  Мы читаем каждый отзыв вручную. После проверки он появится
                  на сайте — обычно в течение одного-двух дней.
                </p>
                <div className="mt-6">
                  <MagneticButton variant="ghost" onClick={() => setOpen(false)}>
                    Закрыть
                  </MagneticButton>
                </div>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="grid gap-4 rounded-3xl border border-line bg-card p-5 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-eyebrow">отзыв</p>
                    <p className="h-display mt-2 text-2xl">Расскажите, как прошло</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Закрыть форму отзыва"
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-medium">
                    Ваше имя *
                    <input name="name" required minLength={2} maxLength={100} placeholder="Анна" className={inputCls} />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium">
                    Повод
                    <select name="occasion" defaultValue="" className={`${inputCls} select-field`}>
                      <option value="">Выберите повод</option>
                      {OCCASIONS.map((o) => (
                        <option key={o.slug} value={o.title}>
                          {o.title}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <fieldset>
                  <legend className="mb-1.5 text-sm font-medium">Оценка *</legend>
                  <div className="flex gap-1" role="radiogroup" aria-label="Оценка от 1 до 5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <label key={n} className="cursor-pointer p-1">
                        <input
                          type="radio"
                          name="rating"
                          value={n}
                          checked={rating === n}
                          onChange={() => setRating(n)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`text-2xl transition-colors ${
                            n <= rating ? "text-accent" : "text-line"
                          }`}
                        >
                          ★
                        </span>
                        <span className="sr-only">
                          {n} {n === 1 ? "звезда" : n < 5 ? "звезды" : "звёзд"}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="grid gap-1.5 text-sm font-medium">
                  Отзыв *
                  <textarea
                    name="text"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={4}
                    placeholder="Что понравилось, как отреагировали гости?"
                    className={`${inputCls} resize-y`}
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-medium">
                    Фото (по желанию)
                    <span className={`${inputCls} cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap ${photoName ? "" : "text-muted"}`}>
                      {photoName || "Прикрепить фото"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? "")}
                      />
                    </span>
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium">
                    Контакт (по желанию)
                    <input
                      name="contact"
                      maxLength={100}
                      placeholder="@nick в Telegram или WhatsApp"
                      className={inputCls}
                    />
                  </label>
                </div>

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
                    Согласен(на) на публикацию отзыва на сайте и обработку
                    персональных данных в соответствии с{" "}
                    <Link href="/policy" className="underline transition-colors hover:text-accent">
                      политикой конфиденциальности
                    </Link>{" "}
                    *
                  </span>
                </label>

                <p className="text-xs text-muted">
                  Отзыв появится на сайте после проверки менеджером — это защита
                  от спама.
                </p>

                {error && (
                  <div role="alert" className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <MagneticButton type="submit" disabled={status === "loading"} className="w-full">
                  {status === "loading" ? "Отправляем…" : "Отправить отзыв"}
                </MagneticButton>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
