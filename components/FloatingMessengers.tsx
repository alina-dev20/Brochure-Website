"use client";

import { useState } from "react";
import { MANAGERS } from "@/lib/contacts";
import { reachGoal } from "@/lib/metrika";

/**
 * Плавающая кнопка мессенджеров. Разворачивает список из двух менеджеров
 * (Telegram + WhatsApp у каждого). На мобильном прижата к правому нижнему
 * углу с отступом под safe-area и не перекрывает контент.
 */
export function FloatingMessengers() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {open && (
        <div className="flex w-56 flex-col gap-2 animate-fade-up">
          {MANAGERS.map((m) => (
            <div
              key={m.telegram.handle}
              className="rounded-2xl border border-line bg-card p-2 shadow-lg"
            >
              <p className="px-2 pt-1 text-[0.65rem] uppercase tracking-wider text-muted">
                {m.label}
              </p>
              <a
                href={m.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => reachGoal("messenger_click")}
                className="mt-1 flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold transition-colors hover:bg-accent-soft"
              >
                <span className="size-2 rounded-full bg-sky-500" aria-hidden="true" />
                Telegram
              </a>
              <a
                href={m.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => reachGoal("messenger_click")}
                className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold transition-colors hover:bg-accent-soft"
              >
                <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Скрыть мессенджеры" : "Написать в мессенджер"}
        aria-expanded={open}
        className="grid size-14 place-items-center rounded-full bg-accent text-accent-fg shadow-xl transition-transform hover:scale-105"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="m4 4 10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              d="M11 3.5c-4.4 0-8 3-8 6.8 0 2.1 1.1 4 2.9 5.2l-.7 3 3.1-1.6c.9.2 1.8.4 2.7.4 4.4 0 8-3.1 8-6.9s-3.6-6.9-8-6.9Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
