import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoInvitation } from "@/components/DemoInvitation";
import { DemoCard } from "@/components/DemoCard";
import { CARD_DEMOS, DEMOS, getCardDemo, getDemo } from "@/lib/demos";

/**
 * Живые демо. Полные приглашения рендерит DemoInvitation,
 * открытки (350–900 ₽) — DemoCard. Живут вне layout витрины —
 * открываются как самостоятельные мини-сайты, как их увидят гости.
 */

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...DEMOS, ...CARD_DEMOS].map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug) ?? getCardDemo(slug);
  if (!demo) return {};
  return {
    title: `${demo.pageTitle} (демо)`,
    description:
      "Живое демо студии «Пригласи»: так выглядит электронное приглашение или открытка, которую получают гости.",
    alternates: { canonical: `/demo/${demo.slug}` },
  };
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  const invitation = getDemo(slug);
  if (invitation) return <DemoInvitation demo={invitation} />;
  const card = getCardDemo(slug);
  if (card) return <DemoCard demo={card} />;
  notFound();
}
