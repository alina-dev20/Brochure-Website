import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyButton } from "@/components/CopyButton";
import { Reveal } from "@/components/Reveal";
import { TEXT_GROUPS } from "@/lib/texts";

export const metadata: Metadata = {
  title: "Готовые тексты приглашений — по любому поводу",
  description:
    "Бесплатные тексты для приглашений: свадьба, день рождения, юбилей, корпоратив и другие поводы. Скопируйте и подставьте свои данные.",
  alternates: { canonical: "/texts" },
};

export default function TextsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-16">
      <Breadcrumbs items={[{ href: "/texts", label: "Тексты" }]} />
      <Reveal>
        <h1 className="h-display mt-6 text-4xl sm:text-6xl">Готовые тексты</h1>
        <p className="mt-4 max-w-xl text-muted">
          Не знаете, с чего начать? Возьмите готовую формулировку — слова в
          фигурных скобках замените на свои. В заказе мы бесплатно адаптируем
          текст под ваше событие.
        </p>
      </Reveal>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Быстрый переход по поводам">
        {TEXT_GROUPS.map((g) => (
          <a
            key={g.occasion}
            href={`#${g.occasion}`}
            className="rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            {g.title}
          </a>
        ))}
      </nav>

      {TEXT_GROUPS.map((group) => (
        <section key={group.occasion} id={group.occasion} className="mt-12 scroll-mt-24" aria-labelledby={`h-${group.occasion}`}>
          <Reveal>
            <h2 id={`h-${group.occasion}`} className="font-display text-3xl font-semibold">
              {group.title}
            </h2>
          </Reveal>
          <div className="mt-4 grid gap-3">
            {group.items.map((item) => (
              <Reveal key={item.title}>
                <article className="rounded-3xl border border-line bg-card p-5 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                      {item.title}
                    </h3>
                    <CopyButton text={item.text} />
                  </div>
                  <p className="mt-3 leading-relaxed">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      <p className="mt-14 rounded-3xl bg-accent-soft p-6 text-sm sm:p-8">
        Текст — только часть впечатления. Посмотрите, как он оживает в{" "}
        <Link href="/catalog" className="font-semibold text-accent hover:underline">
          наших дизайнах
        </Link>{" "}
        с анимацией и музыкой.
      </p>
    </div>
  );
}
