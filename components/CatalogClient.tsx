"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  DESIGNS,
  STYLES,
  designPrice,
  type Design,
  type StyleId,
} from "@/lib/designs";
import { OCCASIONS } from "@/lib/occasions";
import { formatPrice } from "@/lib/pricing";
import { DesignCard } from "./DesignCard";
import { Reveal } from "./Reveal";

/**
 * Каталог: фильтры работают без перезагрузки, состояние живёт в URL
 * (/catalog?occasion=wedding&style=minimal) и восстанавливается при обновлении.
 */

const FEATURE_FILTERS = [
  { id: "animation", label: "Анимация" },
  { id: "music", label: "Музыка" },
  { id: "rsvp", label: "RSVP" },
] as const;

const PRICE_FILTERS = [
  { id: "", label: "Любая цена" },
  { id: "500", label: "до 500 ₽" },
  { id: "900", label: "до 900 ₽" },
  { id: "1500", label: "до 1 500 ₽" },
  { id: "2400", label: "до 2 400 ₽" },
  { id: "3200", label: "до 3 200 ₽" },
] as const;

const SORTS = [
  { id: "popular", label: "Популярное" },
  { id: "cheap", label: "Сначала дешевле" },
  { id: "expensive", label: "Сначала дороже" },
  { id: "new", label: "Новинки" },
] as const;

const chip = (active: boolean) =>
  `cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
    active
      ? "border-accent bg-accent text-accent-fg"
      : "border-line bg-card hover:border-accent hover:text-accent"
  }`;

export function CatalogClient() {
  const params = useSearchParams();

  const occasion = params.get("occasion") ?? "";
  const style = params.get("style") ?? "";
  const price = params.get("price") ?? "";
  const sort = params.get("sort") ?? "popular";
  const features = useMemo(
    () => (params.get("features") ?? "").split(",").filter(Boolean),
    [params],
  );

  // Shallow routing: history.replaceState синхронизируется App Router'ом
  // с useSearchParams без перезагрузки и запроса на сервер.
  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      window.history.replaceState(null, "", `/catalog${next.size ? `?${next}` : ""}`);
    },
    [params],
  );

  const toggleFeature = (id: string) => {
    const next = features.includes(id)
      ? features.filter((f) => f !== id)
      : [...features, id];
    setParam("features", next.join(","));
  };

  const filtered = useMemo(() => {
    let list: Design[] = DESIGNS.filter(
      (d) =>
        (!occasion || d.occasion === occasion) &&
        (!style || d.style === style) &&
        (!price || designPrice(d) <= Number(price)) &&
        features.every((f) => d.features.includes(f as Design["features"][number])),
    );
    switch (sort) {
      case "cheap":
        list = [...list].sort((a, b) => designPrice(a) - designPrice(b));
        break;
      case "expensive":
        list = [...list].sort((a, b) => designPrice(b) - designPrice(a));
        break;
      case "new":
        list = [...list].sort(
          (a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false),
        );
        break;
      default:
        list = [...list].sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [occasion, style, price, sort, features]);

  const hasFilters = occasion || style || price || features.length > 0;

  return (
    <div>
      {/* Фильтры */}
      <div className="grid gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по поводу">
          <button type="button" className={chip(!occasion)} onClick={() => setParam("occasion", "")}>
            Все поводы
          </button>
          {OCCASIONS.filter((o) => DESIGNS.some((d) => d.occasion === o.slug)).map((o) => (
            <button
              key={o.slug}
              type="button"
              className={chip(occasion === o.slug)}
              onClick={() => setParam("occasion", occasion === o.slug ? "" : o.slug)}
            >
              {o.title}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Фильтр по стилю и возможностям">
          {(Object.entries(STYLES) as [StyleId, string][]).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={chip(style === id)}
              onClick={() => setParam("style", style === id ? "" : id)}
            >
              {label}
            </button>
          ))}
          <span className="mx-1 hidden h-5 w-px bg-line sm:block" aria-hidden="true" />
          {FEATURE_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={chip(features.includes(f.id))}
              onClick={() => toggleFeature(f.id)}
              aria-pressed={features.includes(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-muted">
            Цена
            <select
              value={price}
              onChange={(e) => setParam("price", e.target.value)}
              className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-fg outline-none focus:border-accent"
            >
              {PRICE_FILTERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-muted">
            Сортировка
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-fg outline-none focus:border-accent"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Результаты */}
      <p className="mt-8 text-sm text-muted" aria-live="polite">
        {filtered.length > 0
          ? `Найдено дизайнов: ${filtered.length}`
          : "По этим фильтрам пока пусто"}
        {hasFilters && (
          <button
            type="button"
            onClick={() => window.history.replaceState(null, "", "/catalog")}
            className="ml-3 font-semibold text-accent hover:underline"
          >
            Сбросить фильтры
          </button>
        )}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((d, i) => (
            <Reveal key={d.slug} className="h-full" delay={Math.min((i % 8) * 60, 420)}>
              <DesignCard design={d} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-line bg-card p-10 text-center">
          <p className="font-display text-2xl">Сделаем под вас</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Такого сочетания в каталоге ещё нет — но это повод для
            индивидуальной разработки: соберём приглашение по вашей идее
            от {formatPrice(4000)}.
          </p>
          <a
            href="/individual"
            className="mt-6 inline-flex rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-fg"
          >
            Узнать об индивидуальной разработке
          </a>
        </div>
      )}
    </div>
  );
}
