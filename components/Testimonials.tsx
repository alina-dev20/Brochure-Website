"use client";

import { useRef } from "react";
import { TESTIMONIALS } from "@/lib/testimonials";

/** Карусель отзывов: scroll-snap + кнопки, стилизация под переписку. */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div>
      <ul
        ref={trackRef}
        className="thin-scroll -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0"
        aria-label="Отзывы клиентов"
      >
        {TESTIMONIALS.map((t) => (
          <li
            key={t.name}
            className="w-[85%] max-w-sm shrink-0 snap-start rounded-3xl border border-line bg-card p-6 sm:w-[45%] lg:w-[31%]"
          >
            <div className="flex items-center gap-3">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-lg font-semibold text-accent"
                aria-hidden="true"
              >
                {t.name[0]}
              </span>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted">{t.occasion}</p>
              </div>
            </div>
            <blockquote className="mt-4 rounded-2xl rounded-tl-sm bg-accent-soft p-4 text-sm leading-relaxed">
              {t.text}
            </blockquote>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Предыдущие отзывы"
          className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Следующие отзывы"
          className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
        >
          →
        </button>
      </div>
    </div>
  );
}
