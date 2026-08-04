/**
 * Яндекс.Метрика. Счётчик включается переменной окружения NEXT_PUBLIC_YM_ID.
 * Цели: lead_submit (отправка формы), messenger_click (клик по мессенджеру).
 */

declare global {
  interface Window {
    ym?: (id: number, action: string, goal: string) => void;
  }
}

export const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID ?? 0);

export function reachGoal(goal: "lead_submit" | "messenger_click") {
  if (YM_ID && typeof window !== "undefined" && window.ym) {
    window.ym(YM_ID, "reachGoal", goal);
  }
}
