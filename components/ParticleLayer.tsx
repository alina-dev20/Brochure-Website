/**
 * Анимированный фон демо: падающие лепестки/снег/конфетти, поднимающиеся
 * искры или мерцающее боке. Чистый CSS, без JS-циклов; при
 * prefers-reduced-motion слой скрывается (см. globals.css).
 *
 * Позиции и тайминги — детерминированная псевдослучайность от индекса,
 * чтобы серверный и клиентский рендер совпадали.
 */

export type ParticleEffect = "petals" | "snow" | "confetti" | "sparks" | "bokeh";

interface Props {
  effect?: ParticleEffect;
  colors?: string[];
  /** fixed — поверх всей страницы (полные демо), absolute — внутри блока */
  position?: "fixed" | "absolute";
}

const COUNT: Record<ParticleEffect, number> = {
  petals: 18,
  snow: 26,
  confetti: 24,
  sparks: 16,
  bokeh: 12,
};

/** Детерминированный «рандом» 0..1 от пары чисел */
const rnd = (i: number, salt: number) =>
  ((Math.sin(i * 127.1 + salt * 311.7) * 43758.5453) % 1 + 1) % 1;

export function ParticleLayer({ effect, colors = ["#ffffff"], position = "fixed" }: Props) {
  if (!effect) return null;

  const count = COUNT[effect];
  const items = Array.from({ length: count }, (_, i) => {
    const color = colors[i % colors.length];
    const left = `${Math.round(rnd(i, 1) * 96 + 2)}%`;
    const delay = `${(rnd(i, 2) * 12).toFixed(1)}s`;

    switch (effect) {
      case "petals": {
        const size = 8 + Math.round(rnd(i, 3) * 8);
        return (
          <span
            key={i}
            className="particle"
            style={{
              left,
              top: "-6vh",
              width: size,
              height: size * 0.8,
              background: color,
              opacity: 0.75,
              borderRadius: "62% 38% 58% 42% / 55% 60% 40% 45%",
              animation: `p-fall ${(9 + rnd(i, 4) * 8).toFixed(1)}s linear ${delay} infinite`,
            }}
          />
        );
      }
      case "snow": {
        const size = 3 + Math.round(rnd(i, 3) * 5);
        return (
          <span
            key={i}
            className="particle"
            style={{
              left,
              top: "-6vh",
              width: size,
              height: size,
              background: color,
              opacity: 0.4 + rnd(i, 5) * 0.45,
              borderRadius: "50%",
              filter: "blur(0.5px)",
              animation: `p-fall ${(10 + rnd(i, 4) * 10).toFixed(1)}s linear ${delay} infinite`,
            }}
          />
        );
      }
      case "confetti": {
        const size = 6 + Math.round(rnd(i, 3) * 6);
        return (
          <span
            key={i}
            className="particle"
            style={{
              left,
              top: "-6vh",
              width: size,
              height: size * 0.45,
              background: color,
              opacity: 0.85,
              borderRadius: 1,
              animation: `p-fall ${(7 + rnd(i, 4) * 7).toFixed(1)}s linear ${delay} infinite`,
            }}
          />
        );
      }
      case "sparks": {
        const size = 3 + Math.round(rnd(i, 3) * 3);
        return (
          <span
            key={i}
            className="particle"
            style={{
              left,
              bottom: "-2vh",
              width: size,
              height: size,
              background: color,
              borderRadius: "50%",
              boxShadow: `0 0 ${size * 3}px ${size}px ${color}55`,
              animation: `p-rise ${(6 + rnd(i, 4) * 6).toFixed(1)}s ease-out ${delay} infinite`,
            }}
          />
        );
      }
      case "bokeh": {
        const size = 5 + Math.round(rnd(i, 3) * 9);
        return (
          <span
            key={i}
            className="particle"
            style={{
              left,
              top: `${Math.round(rnd(i, 6) * 88 + 4)}%`,
              width: size,
              height: size,
              background: color,
              borderRadius: "50%",
              filter: "blur(1px)",
              boxShadow: `0 0 ${size * 2}px ${size / 2}px ${color}44`,
              animation: `p-twinkle ${(5 + rnd(i, 4) * 6).toFixed(1)}s ease-in-out ${delay} infinite`,
            }}
          />
        );
      }
    }
  });

  return (
    <div
      className={`${position} inset-0 z-20 overflow-hidden`}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      {items}
    </div>
  );
}
