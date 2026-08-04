import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "О студии — кто делает ваши приглашения",
  description:
    "Студия «Пригласи»: дизайнеры и разработчики, которые делают электронные приглашения уровня дизайн-студий — быстро и по честной цене.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Дизайн, а не конструктор",
    text: "Каждый шаблон рисуем руками: типографика, ритм, воздух. Никаких «наборов клипарта» — и это видно с первого экрана.",
  },
  {
    title: "Скорость без потери качества",
    text: "Готовые шаблоны собираем за 1–2 дня. Умеем и за 24 часа, когда праздник уже завтра.",
  },
  {
    title: "Честные цены",
    text: "Открытка — от 350 ₽, полное приглашение — от 1 500 ₽. Все цены на сайте, без «уточняйте в личке».",
  },
  {
    title: "Правки до «да, это оно»",
    text: "Показываем результат до оплаты остатка и правим, пока вам не понравится. Мелкие правки после публикации — бесплатно.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <Breadcrumbs items={[{ href: "/about", label: "О студии" }]} />
      <Reveal>
        <h1 className="h-display mt-6 max-w-3xl text-4xl sm:text-6xl">
          Мы делаем страницы, с которых начинается праздник
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {SITE.name} — небольшая студия дизайнеров и разработчиков. Мы начали с
          приглашений для собственных свадеб и дней рождения, когда поняли: между
          «открыткой из конструктора» и «сайтом за сто тысяч» ничего нет. Теперь
          есть — электронные приглашения студийного уровня по цене букета.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={Math.min(i * 60, 240)}>
            <article className="h-full rounded-3xl border border-line bg-card p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold">{v.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 grid grid-cols-2 gap-4 rounded-3xl bg-accent-soft p-8 text-center sm:grid-cols-4 sm:p-10">
        {[
          ["300+", "приглашений сделано"],
          ["18", "поводов в каталоге"],
          ["24 ч", "минимальный срок"],
          ["4.9", "средняя оценка"],
        ].map(([n, label]) => (
          <div key={label}>
            <p className="font-display text-4xl font-semibold text-accent">{n}</p>
            <p className="mt-1 text-xs text-muted">{label}</p>
          </div>
        ))}
      </Reveal>

      <div className="mt-12 flex justify-center">
        <MagneticButton href="/catalog" className="px-10">
          Посмотреть работы в каталоге
        </MagneticButton>
      </div>
    </div>
  );
}
