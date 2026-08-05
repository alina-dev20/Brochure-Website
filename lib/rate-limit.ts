/**
 * Простейший rate limit в памяти процесса — общий для всех API-маршрутов.
 * Ключ должен включать имя маршрута, чтобы лимиты не пересекались:
 * isRateLimited(`lead:${ip}`), isRateLimited(`review:${ip}`, 3).
 */

const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = WINDOW_MS): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= limit) {
    hits.set(key, list);
    return true;
  }
  list.push(now);
  hits.set(key, list);
  return false;
}

/** IP клиента из заголовков прокси (Vercel/Nginx) */
export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}
