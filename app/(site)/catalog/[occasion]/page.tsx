import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DesignCard } from "@/components/DesignCard";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { OCCASIONS, getOccasion } from "@/lib/occasions";
import { designsByOccasion } from "@/lib/designs";
import { formatPrice } from "@/lib/pricing";

interface Props {
  params: Promise<{ occasion: string }>;
}

export function generateStaticParams() {
  return OCCASIONS.map((o) => ({ occasion: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { occasion } = await params;
  const data = getOccasion(occasion);
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `/catalog/${data.slug}` },
  };
}

export default async function OccasionPage({ params }: Props) {
  const { occasion } = await params;
  const data = getOccasion(occasion);
  if (!data) notFound();

  const designs = designsByOccasion(data.slug);

  return (
    <div
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16"
      data-accent={data.slug}
    >
      <Breadcrumbs
        items={[
          { href: "/catalog", label: "Каталог" },
          { href: `/catalog/${data.slug}`, label: data.title },
        ]}
      />
      <Reveal>
        <h1 className="h-display mt-6 max-w-3xl text-4xl sm:text-6xl">{data.h1}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">{data.lead}</p>
      </Reveal>

      <h2 className="sr-only">Дизайны для этого повода</h2>
      {designs.length > 0 ? (
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((d, i) => (
            <Reveal key={d.slug} className="h-full" delay={Math.min(i * 60, 240)}>
              <DesignCard design={d} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-3xl border border-line bg-card p-10 text-center">
          <p className="font-display text-2xl">Готовим дизайны для этого повода</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            А пока сделаем приглашение индивидуально — по вашему референсу,
            от {formatPrice(4000)}, за 3–7 дней.
          </p>
          <div className="mt-6 flex justify-center">
            <MagneticButton href="/individual">Индивидуальная разработка</MagneticButton>
          </div>
        </div>
      )}

      <div className="mt-16 grid gap-8 rounded-3xl border border-line bg-card p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold">Об этом формате</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{data.seoText}</p>
        </div>
        <MagneticButton href="/#zayavka" className="justify-self-start lg:justify-self-end">
          Оставить заявку
        </MagneticButton>
      </div>

      <p className="mt-10 text-sm text-muted">
        Другие поводы:{" "}
        {OCCASIONS.filter((o) => o.slug !== data.slug)
          .slice(0, 6)
          .map((o, i) => (
            <span key={o.slug}>
              {i > 0 && " · "}
              <Link href={`/catalog/${o.slug}`} className="text-accent hover:underline">
                {o.title}
              </Link>
            </span>
          ))}
      </p>
    </div>
  );
}
