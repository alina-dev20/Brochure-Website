import type { ReactNode } from "react";

/** Мокап телефона. Внутрь кладётся любой контент (живое демо, превью). */
export function PhoneMockup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`phone-frame relative w-[270px] p-2.5 sm:w-[300px] ${className}`}>
      <div
        className="pointer-events-none absolute left-1/2 top-4 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80"
        aria-hidden="true"
      />
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem]">
        {children}
      </div>
    </div>
  );
}
