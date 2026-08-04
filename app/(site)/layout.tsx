import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingMessengers } from "@/components/FloatingMessengers";
import { OCCASIONS } from "@/lib/occasions";

// Акценты поводов: [data-accent="slug"] переключает --accent, у тёмной темы —
// свой, более яркий вариант. Генерируется из occasions.ts (единый источник).
const accentCss = OCCASIONS.map(
  (o) =>
    `[data-accent="${o.slug}"]{--accent:${o.accent}}.dark [data-accent="${o.slug}"]{--accent:${o.accentDark}}`,
).join("");

/** Общий каркас витрины. Демо-приглашения (/demo/*) живут вне этого layout. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: accentCss }} />
      <Header />
      <main id="content">{children}</main>
      <Footer />
      <FloatingMessengers />
    </>
  );
}
