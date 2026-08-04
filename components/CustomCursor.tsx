"use client";

import { useEffect, useRef } from "react";

/**
 * Кастомный курсор: точка следует за мышью мгновенно, кольцо — с инерцией.
 * Рендерится только на устройствах с точным указателем (см. globals.css),
 * дополнительно не активируется при prefers-reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !matchMedia("(pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      const target = e.target as HTMLElement | null;
      const hover = !!target?.closest(
        "a, button, [role='button'], input, select, textarea, [data-cursor='hover']",
      );
      ring.classList.toggle("is-hover", hover);
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
