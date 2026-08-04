import Link from "next/link";
import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  href: string;
  label: string;
}

/** Хлебные крошки + микроразметка BreadcrumbList. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ href: "/", label: "Главная" }, ...items];
  return (
    <>
      <nav aria-label="Хлебные крошки" className="text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-fg">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="transition-colors hover:text-accent">
                      {c.label}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${SITE.url}${c.href}`,
          })),
        }}
      />
    </>
  );
}
