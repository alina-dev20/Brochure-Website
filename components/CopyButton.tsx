"use client";

import { useState } from "react";

/** Кнопка «скопировать текст» для страницы готовых текстов. */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback для старых браузеров
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
        copied
          ? "border-accent bg-accent text-accent-fg"
          : "border-line hover:border-accent hover:text-accent"
      }`}
    >
      {copied ? "Скопировано ✓" : "Скопировать"}
    </button>
  );
}
