import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calculator } from "@/components/Calculator";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { ADDONS, GIFT, TARIFFS, URGENCY, formatPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Цены на электронные приглашения — от 350 ₽",
  description:
    "Открытка от 350 ₽, готовый шаблон от 1 500 ₽, «Стандарт» со всеми блоками от 2 400 ₽, индивидуальная разработка от 4 000 ₽. Калькулятор стоимости онлайн.",
  alternates: { canonical: "/prices" },
};

export default function PricesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <Breadcrumbs items={[{ href: "/prices", label: "Цены" }]} />
      <Reveal>
        <h1 className="h-display mt-6 text-4xl sm:text-6xl">Цены</h1>
        <p className="mt-4 max-w-xl text-muted">
          Вход — от {formatPrice(Math.min(...TARIFFS.map((t) => t.price)))}: дешевле
          букета цветов. {GIFT}.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TARIFFS.map((t, i) => (
          <Reveal key={t.id} delay={Math.min(i * 60, 240)}>
            <article
              className={`relative flex h-full flex-col rounded-3xl border p-6 sm:p-7 ${
                t.popular ? "border-accent bg-accent-soft" : "border-line bg-card"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-fg">
                  Чаще всего выбирают
                </span>
              )}
              <h2 className="font-display text-2xl font-semibold">{t.name}</h2>
              <p className="mt-1 text-sm text-muted">{t.tagline}</p>
              <p className="mt-4 font-display text-4xl font-semibold">
                от {formatPrice(t.price)}
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
                {t.excluded?.map((f) => (
                  <li key={f} className="flex gap-2 text-muted line-through decoration-line">
                    <span aria-hidden="true">✗</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#zayavka"
                className={`mt-6 inline-flex items-center justify-center rounded-full py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${
                  t.popular
                    ? "bg-accent text-accent-fg"
                    : "border border-line hover:border-accent hover:text-accent"
                }`}
              >
                Выбрать
              </Link>
            </article>
          </Reveal>
        ))}

        {/* Допы */}
        <Reveal delay={300}>
          <article className="flex h-full flex-col rounded-3xl border border-dashed border-line p-6 sm:p-7">
            <h2 className="font-display text-2xl font-semibold">Дополнительно</h2>
            <ul className="mt-5 flex-1 space-y-3 text-sm">
              {ADDONS.map((a) => (
                <li key={a.id} className="flex items-baseline justify-between gap-3">
                  <span>
                    {a.name}
                    {a.hint && <span className="block text-xs text-muted">{a.hint}</span>}
                  </span>
                  <span className="whitespace-nowrap font-semibold">
                    +{formatPrice(a.price)}
                  </span>
                </li>
              ))}
              <li className="flex items-baseline justify-between gap-3">
                <span>{URGENCY.name}</span>
                <span className="whitespace-nowrap font-semibold">
                  +{URGENCY.multiplierPct}%
                </span>
              </li>
              <li className="flex items-baseline justify-between gap-3 text-accent">
                <span>QR-код для печати</span>
                <span className="font-semibold">в подарок</span>
              </li>
            </ul>
          </article>
        </Reveal>
      </div>

      <section id="calculator" className="mt-20 scroll-mt-24" aria-labelledby="calc-h">
        <Reveal>
          <h2 id="calc-h" className="h-display text-3xl sm:text-5xl">
            Рассчитайте свой вариант
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <Calculator />
        </Reveal>
      </section>

      <section id="zayavka" className="mt-20 scroll-mt-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="h-display text-3xl sm:text-4xl">Оставить заявку</h2>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Пришлём подборку дизайнов под ваш повод и точный расчёт.
          </p>
        </div>
        <LeadForm />
      </section>
    </div>
  );
}
