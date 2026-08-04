"use client";

import { useId, useState } from "react";

export interface AccordionItem {
  q: string;
  a: string;
}

/** Доступный аккордеон: aria-expanded, aria-controls, управление с клавиатуры. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-card">
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-b-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold transition-colors hover:text-accent sm:px-7"
              >
                <span>{item.q}</span>
                <span
                  className={`shrink-0 text-accent transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="px-5 pb-6 text-sm leading-relaxed text-muted sm:px-7"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
