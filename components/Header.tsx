"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/catalog", label: "Каталог" },
  { href: "/prices", label: "Цены" },
  { href: "/individual", label: "Индивидуально" },
  { href: "/texts", label: "Тексты" },
  { href: "/music", label: "Музыка" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  // Блокируем прокрутку страницы под открытым мобильным меню
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight"
          aria-label="Пригласи — на главную"
        >
          Пригласи<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-accent ${
                pathname.startsWith(item.href) ? "text-accent" : "text-fg"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/#zayavka"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Оставить заявку
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform ${open ? "top-1/2 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-current transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-full bg-current transition-transform ${open ? "bottom-1/2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

    </header>

      {/* Мобильное меню: вне <header>, т.к. backdrop-blur создаёт containing
          block и ломает fixed-позиционирование потомков */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${open ? "block" : "hidden"} fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-bg px-6 pb-10 pt-6`}
      >
        <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="border-b border-line py-4 font-display text-3xl transition-colors hover:text-accent"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#zayavka"
          onClick={close}
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 font-semibold text-accent-fg"
        >
          Оставить заявку
        </Link>
      </div>
    </>
  );
}
