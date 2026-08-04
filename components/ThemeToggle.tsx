"use client";

import { useSyncExternalStore } from "react";

/** Переключатель светлой/тёмной темы. Выбор хранится в localStorage. */

const THEME_EVENT = "themechange";

function subscribe(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
}

export function ThemeToggle() {
  // На сервере считаем тему светлой; после гидрации читаем реальный класс
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Включить светлую тему" : "Включить тёмную тему"}
      className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
    >
      {!dark ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M8 1v1.8M8 13.2V15M15 8h-1.8M2.8 8H1m11.3-4.3-1.3 1.3M5 11l-1.3 1.3m9.6 0L12 11M5 5 3.7 3.7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
