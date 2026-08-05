import type { ReactNode } from "react";

/**
 * Мокап телефона: чёрный корпус с рамкой по всему периметру, вырез-динамик,
 * индикатор снизу и тень. Внутрь кладётся любой контент (живое демо, превью).
 *
 * Все размеры корпуса заданы в cqw (% от ширины контейнера), поэтому рамка,
 * радиусы и вырез масштабируются пропорционально при любой ширине —
 * компонент одинаково выглядит на главной, в каталоге и на страницах шаблонов.
 */
export function PhoneMockup({
  children,
  className = "",
  width = "w-[270px] sm:w-[300px]",
  screenAspect = "9 / 19",
}: {
  children: ReactNode;
  className?: string;
  /** Классы ширины корпуса; для резиновых карточек передайте "w-full" */
  width?: string;
  /** Пропорции экрана; в карточках каталога — "9 / 16" */
  screenAspect?: string;
}) {
  return (
    <div className={`@container relative ${width} ${className}`}>
      {/* Корпус: равномерная рамка со всех сторон, скругление больше экранного */}
      <div className="rounded-[13cqw] bg-[#121214] p-[3cqw] shadow-[0_18px_44px_-14px_rgb(0_0_0/0.45)] ring-1 ring-black/50 dark:ring-white/15">
        {/* Экран: скругление = радиус корпуса минус рамка, контент обрезается */}
        <div
          className="relative overflow-hidden rounded-[10cqw] bg-[#121214]"
          style={{ aspectRatio: screenAspect }}
        >
          {children}
          {/* Вырез-динамик */}
          <span
            className="pointer-events-none absolute left-1/2 top-[2.4cqw] z-20 h-[3.6cqw] w-[24cqw] -translate-x-1/2 rounded-full bg-[#121214]"
            aria-hidden="true"
          />
          {/* Индикатор-полоска */}
          <span
            className="pointer-events-none absolute bottom-[1.8cqw] left-1/2 z-20 h-[1.2cqw] w-[28cqw] -translate-x-1/2 rounded-full bg-black/25"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
