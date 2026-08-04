import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoInvitation } from "@/components/DemoInvitation";
import { DEMOS, getDemo } from "@/lib/demos";

/**
 * Живые демо-приглашения. Живут вне layout витрины — открываются как
 * самостоятельные мини-сайты, как их увидят гости.
 */

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DEMOS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return {};
  return {
    title: `${demo.pageTitle} (демо)`,
    description:
      "Живое демо электронного приглашения студии «Пригласи»: анимация, таймер, галерея, карта и RSVP.",
    alternates: { canonical: `/demo/${demo.slug}` },
  };
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();
  return <DemoInvitation demo={demo} />;
}
