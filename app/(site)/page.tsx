import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { HeroPhoneDemo } from "@/components/HeroPhoneDemo";
import { DesignCard } from "@/components/DesignCard";
import { Accordion } from "@/components/Accordion";
import { Testimonials } from "@/components/Testimonials";
import { Calculator } from "@/components/Calculator";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { FEATURE_ICONS } from "@/components/FeatureIcons";
import { OCCASIONS } from "@/lib/occasions";
import { topDesigns, FEATURES } from "@/lib/designs";
import { FAQ } from "@/lib/faq";
import { SITE } from "@/lib/site";
import { MANAGERS, CONTACT_URLS } from "@/lib/contacts";
import { formatPrice, TARIFFS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.name} — электронные приглашения по ссылке для любого повода`,
  },
  description:
    "Приглашение-сайт с анимацией, музыкой, галереей, картой и подтверждением гостей. Свадьба, день рождения, юбилей и ещё 15 поводов. От 350 ₽, готово за 1–2 дня.",
  alternates: { canonical: "/" },
};

const STEPS = [
  {
    n: "01",
    title: "Выбираете шаблон",
    text: "В каталоге — или присылаете референс для индивидуальной разработки.",
  },
  {
    n: "02",
    title: "Присылаете данные",
    text: "Имена, дату, адрес, фото и тексты. С формулировками поможем.",
  },
  {
    n: "03",
    title: "Мы собираем за 1–2 дня",
    text: "Показываем результат, вносим правки до полного «да, это оно».",
  },
  {
    n: "04",
    title: "Получаете ссылку и QR-код",
    text: "Отправляете гостям в мессенджеры и следите за подтверждениями.",
  },
];

export default function HomePage() {
  const minPrice = Math.min(...TARIFFS.map((t) => t.price));
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          description: SITE.description,
          sameAs: CONTACT_URLS,
        }}
      />

      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 right-[-10%] size-[420px] rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--accent-soft)" }}
          aria-hidden="true"
        />
        {/* Первый экран без Reveal: контент виден до гидрации (LCP),
            появление — чистыми CSS-анимациями */}
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24">
          <div>
            <p className="animate-fade-up text-eyebrow">
              электронные приглашения и открытки
            </p>
            <h1 className="h-display animate-fade-up mt-4 text-4xl sm:text-6xl lg:text-7xl">
              Приглашение, которое{" "}
              <em className="italic text-accent">открывают</em> с восторгом
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
              style={{ animationDelay: "120ms" }}
            >
              Мини-сайт вашего события по одной ссылке: анимация, музыка,
              фотогалерея, карта, таймер и подтверждение гостей. Для свадьбы,
              дня рождения и ещё 16 поводов — от {formatPrice(minPrice)}.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "220ms" }}
            >
              <MagneticButton href="/catalog" className="sm:px-8">
                Смотреть каталог
              </MagneticButton>
              <MagneticButton href="/prices#calculator" variant="ghost" className="sm:px-8">
                Рассчитать стоимость
              </MagneticButton>
            </div>
            <p
              className="animate-fade-up mt-8 text-sm text-muted"
              style={{ animationDelay: "320ms" }}
            >
              Готово за {SITE.leadTimeDays} · QR-код в подарок · правки до полного «да»
            </p>
          </div>
          <div
            className="animate-fade-up flex justify-center lg:justify-end"
            style={{ animationDelay: "200ms" }}
          >
            <HeroPhoneDemo />
          </div>
        </div>
      </section>

      {/* ---- Поводы ---- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="occasions-h">
        <Reveal>
          <p className="text-eyebrow">поводы</p>
          <h2 id="occasions-h" className="h-display mt-3 text-3xl sm:text-5xl">
            Не только свадьбы
          </h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {OCCASIONS.map((o, i) => (
            <Reveal as="li" key={o.slug} delay={Math.min(i * 40, 320)}>
              <Link
                href={`/catalog/${o.slug}`}
                className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-line bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 sm:p-5"
                data-accent={o.slug}
              >
                <span
                  className="size-2.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold leading-snug sm:text-base">
                  {o.title}
                  <span className="ml-1 inline-block text-accent transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---- Топ-6 дизайнов ---- */}
      <section className="border-y border-line bg-card/50 py-16 lg:py-24" aria-labelledby="top-h">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-eyebrow">каталог</p>
                <h2 id="top-h" className="h-display mt-3 text-3xl sm:text-5xl">
                  Самые заказываемые
                </h2>
              </div>
              <Link href="/catalog" className="text-sm font-semibold text-accent hover:underline">
                Все дизайны →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topDesigns(6).map((d, i) => (
              <Reveal key={d.slug} className="h-full" delay={Math.min(i * 60, 300)}>
                <DesignCard design={d} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Что входит ---- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="features-h">
        <Reveal>
          <p className="text-eyebrow">возможности</p>
          <h2 id="features-h" className="h-display mt-3 max-w-xl text-3xl sm:text-5xl">
            Что умеет ваше приглашение
          </h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(FEATURES).map(([id, label], i) => (
            <Reveal as="li" key={id} delay={Math.min(i * 40, 280)}>
              <div className="flex items-center gap-4 rounded-3xl border border-line bg-card p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                  {FEATURE_ICONS[id]}
                </span>
                <span className="text-sm font-semibold">{label}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---- Как мы работаем ---- */}
      <section className="border-y border-line bg-card/50 py-16 lg:py-24" aria-labelledby="steps-h">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-eyebrow">процесс</p>
            <h2 id="steps-h" className="h-display mt-3 text-3xl sm:text-5xl">
              Четыре шага до ссылки
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={Math.min(i * 80, 320)}>
                <div className="flex h-full flex-col rounded-3xl border border-line bg-card p-6">
                  <p className="font-display text-4xl text-accent">{s.n}</p>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Калькулятор ---- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="calc-h">
        <Reveal>
          <p className="text-eyebrow">калькулятор</p>
          <h2 id="calc-h" className="h-display mt-3 text-3xl sm:text-5xl">
            Сколько это стоит
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <Calculator />
        </Reveal>
      </section>

      {/* ---- Отзывы ---- */}
      <section className="border-y border-line bg-card/50 py-16 lg:py-24" aria-labelledby="reviews-h">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-eyebrow">отзывы</p>
            <h2 id="reviews-h" className="h-display mt-3 text-3xl sm:text-5xl">
              Что пишут после праздника
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <Testimonials />
          </Reveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="faq-h">
        <Reveal>
          <p className="text-eyebrow">вопросы</p>
          <h2 id="faq-h" className="h-display mt-3 text-3xl sm:text-5xl">
            Частые вопросы
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <Accordion items={FAQ.slice(0, 5)} />
        </Reveal>
        <p className="mt-6 text-sm text-muted">
          Больше ответов —{" "}
          <Link href="/faq" className="font-semibold text-accent hover:underline">
            на странице FAQ
          </Link>
        </p>
      </section>

      {/* ---- Заявка ---- */}
      <section id="zayavka" className="border-t border-line bg-card/50 py-16 lg:py-24" aria-labelledby="lead-h">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-eyebrow">заявка</p>
            <h2 id="lead-h" className="h-display mt-3 text-3xl sm:text-5xl">
              Расскажите о вашем событии
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Ответим в течение пары часов, покажем подходящие дизайны и
              посчитаем точную стоимость. Или напишите сразу в мессенджер:
            </p>
            <div className="mt-6 space-y-3">
              {MANAGERS.map((m) => (
                <div key={m.telegram.handle} className="flex flex-wrap items-center gap-3">
                  <span className="w-24 text-xs text-muted">{m.label}</span>
                  <a
                    href={m.telegram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                  >
                    Telegram
                  </a>
                  <a
                    href={m.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                  >
                    WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
