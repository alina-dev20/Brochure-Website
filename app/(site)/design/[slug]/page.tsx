import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DesignPreview } from "@/components/DesignPreview";
import { DesignCard } from "@/components/DesignCard";
import { DesignOrder } from "@/components/DesignOrder";
import { PhoneMockup } from "@/components/PhoneMockup";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { FEATURES, DESIGNS, getDesign, designPrice, similarDesigns, STYLES } from "@/lib/designs";
import { getOccasion } from "@/lib/occasions";
import { getTariff, formatPrice } from "@/lib/pricing";
import { BLUR } from "@/lib/blur-data";
import { getCardDemo, getDemo } from "@/lib/demos";
import { ParticleLayer } from "@/components/ParticleLayer";
import { SITE } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DESIGNS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const design = getDesign(slug);
  if (!design) return {};
  const occasion = getOccasion(design.occasion);
  return {
    title: `Шаблон «${design.title}» — ${occasion?.title.toLowerCase()} от ${formatPrice(designPrice(design))}`,
    description: design.description,
    alternates: { canonical: `/design/${design.slug}` },
  };
}

export default async function DesignPage({ params }: Props) {
  const { slug } = await params;
  const design = getDesign(slug);
  if (!design) notFound();

  const occasion = getOccasion(design.occasion);
  const tariff = getTariff(design.tariff);
  const price = designPrice(design);
  // Эффект фона из живого демо этого шаблона — для анимации превью
  const demoEffect = design.demoSlug
    ? (getDemo(design.demoSlug) ?? getCardDemo(design.demoSlug))
    : undefined;

  return (
    <div
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16"
      data-accent={design.occasion}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `Электронное приглашение «${design.title}»`,
          description: design.description,
          brand: { "@type": "Brand", name: SITE.name },
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            url: `${SITE.url}/design/${design.slug}`,
          },
        }}
      />
      <Breadcrumbs
        items={[
          { href: "/catalog", label: "Каталог" },
          { href: `/catalog/${design.occasion}`, label: occasion?.title ?? "" },
          { href: `/design/${design.slug}`, label: `«${design.title}»` },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Превью в мокапе: без Reveal — это LCP-элемент, он должен быть
            виден до гидрации; появление — чистым CSS */}
        <div className="animate-fade-up flex flex-col items-center gap-6">
          <PhoneMockup>
            <div className="relative h-full overflow-hidden">
              {design.photo ? (
                <Image
                  src={design.photo.src}
                  alt={design.photo.alt}
                  fill
                  sizes="300px"
                  priority
                  placeholder={BLUR[design.slug] ? "blur" : "empty"}
                  blurDataURL={BLUR[design.slug]}
                  className="animate-kenburns object-cover"
                />
              ) : (
                <DesignPreview design={design} className="h-full rounded-none aspect-auto!" />
              )}
              {/* Тот же анимированный фон, что и в живом демо шаблона */}
              <ParticleLayer
                effect={demoEffect?.effect}
                colors={demoEffect?.effectColors}
                position="absolute"
              />
              <span
                className="animate-fade-up pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-6 pt-12 text-center font-display text-3xl font-medium text-white"
                style={{ animationDelay: "250ms" }}
                aria-hidden="true"
              >
                {design.preview.caption}
              </span>
            </div>
          </PhoneMockup>
          {design.demoSlug ? (
            <Link
              href={`/demo/${design.demoSlug}`}
              target="_blank"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Открыть демо в новой вкладке ↗
            </Link>
          ) : (
            <p className="text-sm text-muted">Живое демо этого шаблона скоро появится</p>
          )}
        </div>

        {/* Описание + заказ */}
        <div>
          <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
            <p className="text-eyebrow">
              {occasion?.title} · {STYLES[design.style]}
            </p>
            <h1 className="h-display mt-3 text-4xl sm:text-5xl">«{design.title}»</h1>
            <p className="mt-4 leading-relaxed text-muted">{design.description}</p>
          </div>

          <Reveal delay={100}>
            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted">
              Что входит
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {design.features.map((f) => (
                <li
                  key={f}
                  className="rounded-full bg-accent-soft px-3.5 py-1.5 text-xs font-medium"
                >
                  {FEATURES[f]}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line p-4">
                <h3 className="text-sm font-semibold">Можно поменять</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {design.editable.map((e) => (
                    <li key={e}>· {e}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line p-4">
                <h3 className="text-sm font-semibold">Фиксировано в шаблоне</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {design.fixed.map((e) => (
                    <li key={e}>· {e}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted">
                  Нужны правки структуры? Это тариф «Премиум» или{" "}
                  <Link href="/individual" className="text-accent underline">
                    индивидуальная разработка
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={220} className="mt-6">
            <DesignOrder design={design} />
          </Reveal>
          <p className="mt-3 text-xs text-muted">
            Тариф «{tariff.name}»: {tariff.tagline.toLowerCase()}. Полное описание
            тарифов — на странице{" "}
            <Link href="/prices" className="text-accent underline">
              цен
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Похожие */}
      <section className="mt-20" aria-labelledby="similar-h">
        <h2 id="similar-h" className="h-display text-3xl sm:text-4xl">
          Похожие дизайны
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {similarDesigns(design).map((d) => (
            <DesignCard key={d.slug} design={d} />
          ))}
        </div>
      </section>

      {/* Заявка с предзаполненным шаблоном */}
      <section id="order" className="mt-20 scroll-mt-24" aria-labelledby="order-h">
        <div id="zayavka" className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="order-h" className="h-display text-3xl sm:text-4xl">
              Заказать «{design.title}»
            </h2>
            <p className="mt-3 max-w-sm text-sm text-muted">
              Название шаблона уже подставлено. Останется рассказать о событии —
              и через {SITE.leadTimeDays} у вас будет ссылка.
            </p>
          </div>
          <LeadForm
            initial={{
              template: `«${design.title}»`,
              occasion: occasion?.title,
            }}
          />
        </div>
      </section>
    </div>
  );
}
