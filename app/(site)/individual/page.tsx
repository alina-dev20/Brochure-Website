import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { formatPrice, getTariff } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Индивидуальная разработка приглашения — дизайн с нуля",
  description:
    "Электронное приглашение по вашему референсу, доске Pinterest или фирменному стилю. Дизайн с нуля «под ключ» от 4 000 ₽ за 3–7 дней.",
  alternates: { canonical: "/individual" },
};

const OPTIONS = [
  {
    title: "По референсу",
    text: "Понравилось чужое приглашение или сайт? Пришлите ссылку или скриншот — сделаем в том же настроении, но своё и лучше.",
  },
  {
    title: "По доске Pinterest",
    text: "Соберите пины с эстетикой праздника — палитры, типографика, детали. Мы переведём мудборд в работающее приглашение.",
  },
  {
    title: "Под фирменный стиль",
    text: "Для брендов и мероприятий компаний: приглашение в вашей айдентике — логотип, цвета, шрифты, тон коммуникации.",
  },
];

const STEPS = [
  "Обсуждаем идею и референсы — бесплатно",
  "Фиксируем структуру, стоимость и срок",
  "Показываем дизайн-концепцию, дорабатываем",
  "Собираем, тестируем на телефонах, отдаём ссылку и QR-код",
];

export default function IndividualPage() {
  const custom = getTariff("custom");
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <Breadcrumbs items={[{ href: "/individual", label: "Индивидуальная разработка" }]} />
      <Reveal>
        <h1 className="h-display mt-6 max-w-3xl text-4xl sm:text-6xl">
          Приглашение, которого нет ни у кого
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Дизайн с нуля по вашей идее — от {formatPrice(custom.price)}, срок 3–7
          дней, «под ключ» от первого эскиза до готовой ссылки.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {OPTIONS.map((o, i) => (
          <Reveal key={o.title} delay={Math.min(i * 80, 240)}>
            <article className="h-full rounded-3xl border border-line bg-card p-6 sm:p-7">
              <h2 className="font-display text-2xl font-semibold">{o.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{o.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 rounded-3xl border border-line bg-card p-6 sm:p-10">
        <h2 className="font-display text-3xl font-semibold">Как проходит работа</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm leading-relaxed">
              <span className="font-display text-2xl text-accent">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <MagneticButton href="#zayavka">Обсудить идею</MagneticButton>
        </div>
      </Reveal>

      <section id="zayavka" className="mt-20 scroll-mt-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="h-display text-3xl sm:text-4xl">Расскажите об идее</h2>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Приложите ссылки на референсы в комментарии — вернёмся с
            предложением и точной ценой.
          </p>
        </div>
        <LeadForm initial={{ template: "Индивидуальная разработка" }} />
      </section>
    </div>
  );
}
