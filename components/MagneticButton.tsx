"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-300 will-change-transform select-none disabled:opacity-50 disabled:pointer-events-none";
const variants = {
  primary: "bg-accent text-accent-fg hover:opacity-90",
  ghost: "border border-line text-fg hover:border-accent hover:text-accent",
};

/**
 * «Магнитная» кнопка: слегка тянется к курсору. На touch-устройствах и при
 * prefers-reduced-motion ведёт себя как обычная кнопка.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  ariaLabel,
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (
      !el ||
      !matchMedia("(pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        href={href}
        className={cls}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      type={type}
      className={cls}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
