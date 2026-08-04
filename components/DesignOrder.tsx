"use client";

import { useState } from "react";
import {
  ADDONS,
  URGENCY,
  calcEstimate,
  formatPrice,
  getTariff,
} from "@/lib/pricing";
import type { Design } from "@/lib/designs";
import { MagneticButton } from "./MagneticButton";
import { prefillLeadForm } from "./LeadForm";

/** Блок заказа на странице шаблона: апселлы с пересчётом цены на лету. */
export function DesignOrder({ design }: { design: Design }) {
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [urgent, setUrgent] = useState(false);

  const tariff = getTariff(design.tariff);
  const estimate = calcEstimate(design.tariff, addonIds, urgent);
  const deadline = urgent ? "за 24 часа" : "1–2 дня";

  const toggle = (id: string) =>
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  const order = () => {
    const addonNames = ADDONS.filter((a) => addonIds.includes(a.id)).map((a) => a.name);
    const parts = [
      `Хочу шаблон «${design.title}» (тариф «${tariff.name}»)`,
      addonNames.length ? `допы: ${addonNames.join(", ")}` : null,
      urgent ? "срочно за 24 часа" : null,
      `итого от ${formatPrice(estimate.total)}`,
    ].filter(Boolean);
    prefillLeadForm({ template: `«${design.title}»`, comment: parts.join("; ") });
  };

  return (
    <div className="rounded-3xl border border-line bg-card p-5 sm:p-7">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm text-muted">Тариф «{tariff.name}»</p>
        <p className="font-display text-3xl font-semibold" aria-live="polite">
          от {formatPrice(estimate.total)}
        </p>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-medium">Дополнительно</legend>
        <div className="grid gap-2">
          {ADDONS.map((a) => (
            <label
              key={a.id}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3 text-sm transition-colors has-checked:border-accent has-checked:bg-accent-soft"
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={addonIds.includes(a.id)}
                  onChange={() => toggle(a.id)}
                  className="size-4 accent-(--accent)"
                />
                <span>
                  <span className="font-medium">{a.name}</span>
                  {a.hint && <span className="block text-xs text-muted">{a.hint}</span>}
                </span>
              </span>
              <span className="whitespace-nowrap text-muted">+{formatPrice(a.price)}</span>
            </label>
          ))}
          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3 text-sm transition-colors has-checked:border-accent has-checked:bg-accent-soft">
            <span className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={urgent}
                onChange={() => setUrgent(!urgent)}
                className="size-4 accent-(--accent)"
              />
              <span className="font-medium">{URGENCY.name}</span>
            </span>
            <span className="whitespace-nowrap text-muted">+{URGENCY.multiplierPct}%</span>
          </label>
        </div>
      </fieldset>

      <p className="mt-4 text-sm text-muted">
        Срок изготовления: <span className="font-medium text-fg">{deadline}</span> ·
        QR-код в подарок
      </p>

      <MagneticButton onClick={order} className="mt-5 w-full">
        Заказать за {formatPrice(estimate.total)}
      </MagneticButton>
    </div>
  );
}
