import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { MANAGERS } from "@/lib/contacts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты студии электронных приглашений",
  description:
    "Напишите нам в Telegram или WhatsApp — ответим в течение пары часов. Или оставьте заявку на сайте.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <Breadcrumbs items={[{ href: "/contacts", label: "Контакты" }]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h1 className="h-display text-4xl sm:text-6xl">Контакты</h1>
          <p className="mt-4 max-w-sm text-muted">
            Быстрее всего — мессенджеры: отвечаем с 10:00 до 22:00 по Москве,
            обычно в течение {SITE.replyTimeHours} часов. С вами работают два
            менеджера — пишите любому.
          </p>
          <ul className="mt-8 space-y-6">
            {MANAGERS.map((m) => (
              <li key={m.telegram.handle} className="rounded-3xl border border-line bg-card p-5 sm:p-6">
                <p className="text-eyebrow">{m.label}</p>
                <dl className="mt-3 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs text-muted">Telegram</dt>
                    <dd>
                      <a
                        href={m.telegram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold transition-colors hover:text-accent"
                      >
                        {m.telegram.handle}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">WhatsApp / телефон</dt>
                    <dd className="flex flex-wrap items-baseline gap-x-4">
                      <a
                        href={`tel:${m.whatsapp.phoneTel}`}
                        className="text-lg font-semibold transition-colors hover:text-accent"
                      >
                        {m.whatsapp.phoneDisplay}
                      </a>
                      <a
                        href={m.whatsapp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-accent hover:underline"
                      >
                        написать в WhatsApp →
                      </a>
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <LeadForm />
        </Reveal>
      </div>
    </div>
  );
}
