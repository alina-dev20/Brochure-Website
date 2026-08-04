import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { OCCASIONS } from "@/lib/occasions";
import { DESIGNS } from "@/lib/designs";
import { CARD_DEMOS, DEMOS } from "@/lib/demos";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;

  const statics = [
    ["/", 1],
    ["/catalog", 0.9],
    ["/prices", 0.9],
    ["/individual", 0.8],
    ["/texts", 0.7],
    ["/music", 0.6],
    ["/faq", 0.6],
    ["/about", 0.5],
    ["/contacts", 0.6],
  ] as const;

  return [
    ...statics.map(([path, priority]) => ({
      url: url(path),
      priority,
      changeFrequency: "weekly" as const,
    })),
    ...OCCASIONS.map((o) => ({
      url: url(`/catalog/${o.slug}`),
      priority: 0.8,
      changeFrequency: "weekly" as const,
    })),
    ...DESIGNS.map((d) => ({
      url: url(`/design/${d.slug}`),
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...[...DEMOS, ...CARD_DEMOS].map((d) => ({
      url: url(`/demo/${d.slug}`),
      priority: 0.5,
      changeFrequency: "monthly" as const,
    })),
  ];
}
