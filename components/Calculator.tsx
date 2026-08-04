"use client";

import { useState } from "react";
import {
  ADDONS,
  TARIFFS,
  URGENCY,
  calcEstimate,
  formatPrice,
  type TariffId,
} from "@/lib/pricing";
import { OCCASIONS } from "@/lib/occasions";
import { MagneticButton } from "./MagneticButton";
import { prefillLeadForm } from "./LeadForm";

/**
 * Калькулятор стоимости: повод → тариф → допы → срочность.
 * «Отправить расчёт» подставляет конфигурацию в форму заявки.
 */
export function Calculator() {
  const [occasion, setOccasion] = useState(OCCASIONS[0].title);
  const [tariffId, setTariffId] = useState<TariffId>("standard");
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [urgent, setUrgent] = useState(false);

  const estimate = calcEstimate(tariffId, addonIds, urgent);
  const tariff = TARIFFS.find((t) => t.id === tariffId)!;
  const deadline = urgent ? "за 24 часа" : tariffId === "custom" ? "3–7 дней" : "1–2 дня";

  const toggleAddon = (id: string) =>
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  const sendToForm = () => {
    const addonNames = ADDONS.filter((a) => addonIds.includes(a.id)).map((a) => a.name);
    const parts = [
      `Расчёт из калькулятора: тариф «${tariff.name}»`,
      addonNames.length ? `допы: ${addonNames.join(", ")}` : null,
      urgent ? "срочно за 24 часа" : null,
      `итого от ${formatPrice(estimate.total)}, срок ${deadline}`,
    ].filter(Boolean);
    prefillLeadForm({ occasion, comment: parts.join("; ") });
  };

  return (
    <div className="grid gap-6 rounded-3xl border border-line bg-card p-5 sm:p-8 lg:grid-cols-[1fr_280px]">
      <div className="grid gap-6">
        <label className="grid gap-2 text-sm font-medium">
          Повод
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-sm outline-none focus:border-accent"
          >
            {OCCASIONS.map((o) => (
              <option key={o.slug} value={o.title}>
                {o.title}
              </option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">Тариф</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {TARIFFS.map((t) => (
              <label
                key={t.id}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-2xl border border-line px-4 py-3 text-sm transition-colors has-checked:border-accent has-checked:bg-accent-soft"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="tariff"
                    checked={tariffId === t.id}
                    onChange={() => setTariffId(t.id)}
                    className="size-4 accent-(--accent)"
                  />
                  <span className="font-medium">{t.name}</span>
                </span>
                <span className="whitespace-nowrap text-muted">от {formatPrice(t.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">Дополнительно</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {ADDONS.map((a) => (
              <label
                key={a.id}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-2xl border border-line px-4 py-3 text-sm transition-colors has-checked:border-accent has-checked:bg-accent-soft"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={addonIds.includes(a.id)}
                    onChange={() => toggleAddon(a.id)}
                    className="size-4 accent-(--accent)"
                  />
                  <span className="font-medium">{a.name}</span>
                </span>
                <span className="whitespace-nowrap text-muted">+{formatPrice(a.price)}</span>
              </label>
            ))}
            <label className="flex cursor-pointer items-center justify-between gap-2 rounded-2xl border border-line px-4 py-3 text-sm transition-colors has-checked:border-accent has-checked:bg-accent-soft sm:col-span-2">
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
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-2xl bg-accent-soft p-6" aria-live="polite">
        <div>
          <p className="text-eyebrow">Итого</p>
          <p className="mt-2 font-display text-4xl font-semibold">
            от {formatPrice(estimate.total)}
          </p>
          <dl className="mt-4 space-y-1.5 text-sm text-muted">
            <div className="flex justify-between">
              <dt>Тариф</dt>
              <dd>{formatPrice(estimate.base)}</dd>
            </div>
            {estimate.addonsSum > 0 && (
              <div className="flex justify-between">
                <dt>Допы</dt>
                <dd>+{formatPrice(estimate.addonsSum)}</dd>
              </div>
            )}
            {estimate.urgencyFee > 0 && (
              <div className="flex justify-between">
                <dt>Срочность</dt>
                <dd>+{formatPrice(estimate.urgencyFee)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-line pt-1.5">
              <dt>Срок</dt>
              <dd className="font-medium text-fg">{deadline}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted">QR-код для печати — в подарок.</p>
        </div>
        <MagneticButton onClick={sendToForm} className="w-full">
          Отправить расчёт
        </MagneticButton>
      </div>
    </div>
  );
}
