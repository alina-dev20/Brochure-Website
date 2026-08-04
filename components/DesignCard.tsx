"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { STYLES, designPrice, type Design } from "@/lib/designs";
import { formatPrice } from "@/lib/pricing";
import { getOccasion } from "@/lib/occasions";
import { BLUR } from "@/lib/blur-data";
import { DesignPreview } from "./DesignPreview";

/**
 * Карточка дизайна: превью в мокапе телефона, фото с blur-заглушкой и
 * плавным появлением, зум при наведении. Кнопки «Демо»/«Заказать» на
 * устройствах с мышью появляются по hover, на touch видны всегда.
 */
export function DesignCard({ design }: { design: Design }) {
  const occasion = getOccasion(design.occasion);
  const price = designPrice(design);
  const [loaded, setLoaded] = useState(false);

  const hasAnimationBadge =
    design.features.includes("animation") && design.features.includes("music");

  return (
    <article
      className="group flex h-full flex-col rounded-3xl border border-line bg-card p-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10"
      data-accent={design.occasion}
    >
      {/* Превью-«телефон» */}
      <div className="relative">
        <Link
          href={`/design/${design.slug}`}
          className="relative block overflow-hidden rounded-[1.7rem] border-4 border-fg/85 bg-fg/85"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.45rem]">
            {design.photo ? (
              <Image
                src={design.photo.src}
                alt={design.photo.alt}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
                placeholder={BLUR[design.slug] ? "blur" : "empty"}
                blurDataURL={BLUR[design.slug]}
                onLoad={() => setLoaded(true)}
                className={`object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-105 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : (
              <div className="h-full transition-transform duration-700 ease-out group-hover:scale-105 [&>div]:h-full [&>div]:rounded-none">
                <DesignPreview design={design} />
              </div>
            )}
            {/* «Чёлка» телефона */}
            <span
              className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-fg/70"
              aria-hidden="true"
            />
            {/* Подпись поверх фото — как заголовок приглашения */}
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/55 to-transparent px-4 pb-4 pt-10 text-center font-display text-2xl font-medium text-white"
              aria-hidden="true"
            >
              {design.preview.caption}
            </span>
          </div>
        </Link>

        {/* Бейджи */}
        <div className="absolute left-3 top-3 z-20 flex flex-col items-start gap-1.5">
          {design.popularity >= 85 ? (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-fg shadow-sm">
              Хит
            </span>
          ) : design.isNew ? (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-fg shadow-sm">
              Новинка
            </span>
          ) : null}
          {hasAnimationBadge && (
            <span className="rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              С анимацией
            </span>
          )}
        </div>
        <span className="absolute right-3 top-3 z-20 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          от {formatPrice(price)}
        </span>

        {/* Кнопки поверх превью: hover на десктопе, всегда — на touch */}
        <div className="absolute inset-x-4 bottom-4 z-20 grid grid-cols-2 gap-2 transition-all duration-300 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
          {design.demoSlug ? (
            <Link
              href={`/demo/${design.demoSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white/90 py-2.5 text-sm font-semibold text-neutral-900 backdrop-blur-sm transition-colors hover:bg-white"
            >
              Демо
            </Link>
          ) : (
            <Link
              href={`/design/${design.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-white/90 py-2.5 text-sm font-semibold text-neutral-900 backdrop-blur-sm transition-colors hover:bg-white"
            >
              Подробнее
            </Link>
          )}
          <Link
            href={`/design/${design.slug}#order`}
            className="inline-flex items-center justify-center rounded-full bg-accent py-2.5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
          >
            Заказать
          </Link>
        </div>
      </div>

      {/* Текстовая часть */}
      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-semibold">
            <Link href={`/design/${design.slug}`} className="transition-colors hover:text-accent">
              «{design.title}»
            </Link>
          </h3>
          <p className="whitespace-nowrap text-sm font-semibold">от {formatPrice(price)}</p>
        </div>
        <p className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted">
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-medium text-fg">
            {occasion?.title}
          </span>
          <span className="rounded-full border border-line px-2.5 py-0.5">
            {STYLES[design.style]}
          </span>
        </p>
      </div>
    </article>
  );
}
