import Link from "next/link";
import { OCCASIONS } from "@/lib/occasions";
import { SITE } from "@/lib/site";
import { MANAGERS } from "@/lib/contacts";

export function Footer() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-semibold">
              {SITE.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Электронные приглашения и открытки — мини-сайт по ссылке для
              любого повода.
            </p>
          </div>

          <nav aria-label="Разделы сайта">
            <p className="text-eyebrow mb-4">Разделы</p>
            <ul className="space-y-2 text-sm">
              {[
                ["/catalog", "Каталог дизайнов"],
                ["/prices", "Цены"],
                ["/individual", "Индивидуальная разработка"],
                ["/texts", "Готовые тексты"],
                ["/music", "Музыка"],
                ["/faq", "Вопросы и ответы"],
                ["/about", "О студии"],
                ["/contacts", "Контакты"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-accent">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Поводы">
            <p className="text-eyebrow mb-4">Поводы</p>
            <ul className="columns-2 gap-6 space-y-2 text-sm lg:columns-1">
              {OCCASIONS.slice(0, 10).map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/catalog/${o.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/catalog" className="font-semibold text-accent">
                  Все поводы →
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-eyebrow mb-4">Связаться</p>
            <ul className="space-y-3 text-sm">
              {MANAGERS.map((m) => (
                <li key={m.telegram.handle}>
                  <p className="text-xs text-muted">{m.label}</p>
                  <p className="mt-0.5 flex flex-wrap gap-x-3">
                    <a
                      href={m.telegram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      Telegram
                    </a>
                    <a
                      href={m.whatsapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      WhatsApp
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>© {new Date().getFullYear()} {SITE.name}. Все дизайны — авторские.</p>
            <p className="mt-1">
              Фото в превью шаблонов —{" "}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-accent"
              >
                Unsplash
              </a>{" "}
              (свободная лицензия).
            </p>
          </div>
          <p className="flex gap-4">
            <Link href="/policy" className="transition-colors hover:text-accent">
              Политика конфиденциальности
            </Link>
            <Link href="/oferta" className="transition-colors hover:text-accent">
              Оферта
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
