import type { Design } from "@/lib/designs";

/**
 * Генеративное превью шаблона: мини-макет приглашения, нарисованный кодом.
 * Заменяется на реальный скриншот/видео добавлением файла и поля в designs.ts.
 */
export function DesignPreview({
  design,
  className = "",
  animated = true,
}: {
  design: Design;
  className?: string;
  animated?: boolean;
}) {
  const { from, to, ink, variant, caption, sub } = design.preview;

  return (
    <div
      className={`relative flex aspect-4/5 w-full flex-col items-center justify-center overflow-hidden rounded-2xl ${className}`}
      style={{ background: `linear-gradient(160deg, ${from}, ${to})`, color: ink }}
      aria-hidden="true"
    >
      <Ornament variant={variant} ink={ink} animated={animated} />
      <div className="relative z-10 px-4 text-center">
        <p className="font-display text-3xl font-medium leading-none sm:text-4xl">
          {caption}
        </p>
        <p
          className="mt-2 text-[0.65rem] uppercase tracking-[0.22em] opacity-70"
          style={{ color: ink }}
        >
          {sub}
        </p>
      </div>
      {/* лёгкое зерно поверх градиента */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

function Ornament({
  variant,
  ink,
  animated,
}: {
  variant: Design["preview"]["variant"];
  ink: string;
  animated: boolean;
}) {
  const float = animated ? "animate-float-slow" : "";
  switch (variant) {
    case "arch":
      return (
        <div
          className={`absolute top-[12%] h-[52%] w-[46%] rounded-t-full border ${float}`}
          style={{ borderColor: `${ink}55` }}
        />
      );
    case "lines":
      return (
        <>
          <div className="absolute inset-x-[16%] top-[16%] h-px" style={{ background: `${ink}66` }} />
          <div className="absolute inset-x-[16%] bottom-[16%] h-px" style={{ background: `${ink}66` }} />
          <div
            className={`absolute top-[24%] size-2 rounded-full ${float}`}
            style={{ background: `${ink}88` }}
          />
        </>
      );
    case "confetti":
      return (
        <>
          {[
            ["12%", "18%", "8px", "0deg"],
            ["78%", "14%", "10px", "24deg"],
            ["20%", "74%", "9px", "48deg"],
            ["70%", "70%", "7px", "12deg"],
            ["46%", "10%", "6px", "60deg"],
            ["86%", "48%", "8px", "30deg"],
            ["8%", "48%", "7px", "75deg"],
          ].map(([left, top, size, rot], i) => (
            <span
              key={i}
              className={`absolute rounded-sm ${animated ? "animate-float-slow" : ""}`}
              style={{
                left,
                top,
                width: size,
                height: size,
                background: `${ink}${i % 2 ? "aa" : "66"}`,
                transform: `rotate(${rot})`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
        </>
      );
    case "star":
      return (
        <svg
          viewBox="0 0 100 100"
          className={`absolute top-[10%] w-[34%] ${animated ? "animate-spin-slow" : ""}`}
          style={{ color: `${ink}77` }}
          fill="none"
        >
          <path
            d="M50 5 58 42 95 50 58 58 50 95 42 58 5 50 42 42Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "wave":
      return (
        <svg
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
          className={`absolute bottom-[18%] w-[70%] ${float}`}
          style={{ color: `${ink}66` }}
          fill="none"
        >
          <path
            d="M0 20 Q 25 0 50 20 T 100 20 T 150 20 T 200 20"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "frame":
      return (
        <div
          className={`absolute inset-[10%] rounded-xl border ${float}`}
          style={{ borderColor: `${ink}55` }}
        />
      );
  }
}
