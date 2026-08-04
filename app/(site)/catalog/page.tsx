import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CatalogClient } from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Каталог электронных приглашений — все дизайны",
  description:
    "Готовые дизайны электронных приглашений: свадьба, день рождения, юбилей, корпоратив и другие поводы. Фильтры по стилю, цене и возможностям, живые демо каждого шаблона.",
  alternates: { canonical: "/catalog" },
};

function CatalogSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-full border border-line bg-card" />
        ))}
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="rounded-3xl border border-line bg-card p-3">
            <div className="aspect-4/5 animate-pulse rounded-2xl bg-accent-soft" />
            <div className="h-28" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <Breadcrumbs items={[{ href: "/catalog", label: "Каталог" }]} />
      <h1 className="h-display mt-6 text-4xl sm:text-6xl">Каталог дизайнов</h1>
      <p className="mt-4 max-w-xl text-muted">
        Каждый шаблон открывается как живое демо — посмотрите на телефоне,
        прежде чем заказывать.
      </p>
      <h2 className="sr-only">Все дизайны</h2>
      <div className="mt-10">
        {/* Фолбэк-скелет той же высоты, что и контент — исключает сдвиг (CLS) */}
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogClient />
        </Suspense>
      </div>
    </div>
  );
}
