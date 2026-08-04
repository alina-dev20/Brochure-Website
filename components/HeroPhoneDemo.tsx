import Image from "next/image";
import Link from "next/link";
import { PhoneMockup } from "./PhoneMockup";

/**
 * Живое мини-демо в мокапе телефона на первом экране:
 * четыре «экрана» приглашения автоматически пролистываются CSS-анимацией.
 */
export function HeroPhoneDemo() {
  return (
    <Link href="/demo/tishina" target="_blank" aria-label="Открыть живое демо приглашения">
      <PhoneMockup className="animate-float-slow">
        <div
          className="animate-demo-scroll h-[400%]"
          style={{ background: "#f2ede4", color: "#37322a" }}
        >
          {/* Экран 1: обложка */}
          <div className="flex h-1/4 flex-col items-center justify-center px-6 text-center">
            <p className="text-[0.55rem] uppercase tracking-[0.3em] opacity-60">
              приглашение на свадьбу
            </p>
            <p className="font-display mt-3 text-3xl leading-tight">
              Дарья
              <br />
              <span className="text-xl italic opacity-70">и</span> Марк
            </p>
            <div className="mt-4 h-16 w-24 rounded-t-full border border-[#37322a55]" />
            <p className="mt-4 text-[0.6rem] tracking-widest opacity-70">
              19 декабря 2026
            </p>
          </div>
          {/* Экран 2: таймер */}
          <div className="flex h-1/4 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-[0.55rem] uppercase tracking-[0.3em] opacity-60">
              до события
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["137", "дней"],
                ["11", "часов"],
                ["42", "мин"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-[#37322a0d] px-3 py-2.5">
                  <p className="font-display text-2xl">{n}</p>
                  <p className="text-[0.5rem] uppercase tracking-widest opacity-60">{l}</p>
                </div>
              ))}
            </div>
            <p className="text-[0.6rem] opacity-70">Усадьба «Белый сад», Истра</p>
          </div>
          {/* Экран 3: галерея */}
          <div className="flex h-1/4 flex-col justify-center gap-2 px-5">
            <p className="text-center text-[0.55rem] uppercase tracking-[0.3em] opacity-60">
              наша история
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={`/demo/tishina-${n}.webp`}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Экран 4: RSVP */}
          <div className="flex h-1/4 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-display text-xl">Вы придёте?</p>
            <div className="w-full rounded-full bg-[#a15e3b] py-2.5 text-[0.65rem] font-semibold text-[#faf7f0]">
              С удовольствием!
            </div>
            <div className="w-full rounded-full border border-[#37322a44] py-2.5 text-[0.65rem] font-semibold">
              Не смогу быть
            </div>
            <p className="text-[0.5rem] opacity-60">ответьте до 1 декабря</p>
          </div>
        </div>
      </PhoneMockup>
    </Link>
  );
}
