import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Accordion } from "@/components/Accordion";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Вопросы и ответы об электронных приглашениях",
  description:
    "Как работает электронное приглашение, сколько делается, как гости подтверждают участие, сколько живёт ссылка — ответы на частые вопросы.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <Breadcrumbs items={[{ href: "/faq", label: "FAQ" }]} />
      <Reveal>
        <h1 className="h-display mt-6 text-4xl sm:text-6xl">Вопросы и ответы</h1>
      </Reveal>
      <Reveal delay={120} className="mt-10">
        <Accordion items={[...FAQ]} />
      </Reveal>
      <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="text-sm">Не нашли ответ? Спросите нас напрямую.</p>
        <MagneticButton href="/contacts">Написать нам</MagneticButton>
      </div>
    </div>
  );
}
