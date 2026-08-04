import { ImageResponse } from "next/og";
import { getDesign, designPrice } from "@/lib/designs";
import { getOccasion } from "@/lib/occasions";
import { formatPrice } from "@/lib/pricing";
import { SITE } from "@/lib/site";

/** Динамическая Open Graph картинка для каждого шаблона. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Электронное приглашение";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const design = getDesign(slug);
  const occasion = design && getOccasion(design.occasion);
  const p = design?.preview;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: p ? `linear-gradient(135deg, ${p.from}, ${p.to})` : "#f7f5f1",
          color: p?.ink ?? "#16140f",
          fontFamily: "serif",
          padding: 80,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", opacity: 0.7 }}>
            {occasion?.title ?? "Электронные приглашения"}
          </div>
          <div style={{ fontSize: 110, marginTop: 20, fontStyle: "italic" }}>
            «{design?.title ?? SITE.name}»
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34 }}>
          <div>{SITE.name} — приглашения по ссылке</div>
          {design && <div>от {formatPrice(designPrice(design))}</div>}
        </div>
      </div>
    ),
    size,
  );
}
