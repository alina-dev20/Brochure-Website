"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { DemoConfig } from "@/lib/demos";
import { Reveal } from "./Reveal";
import { ParticleLayer } from "./ParticleLayer";

/**
 * Движок живого демо-приглашения. Полностью конфигурируется из lib/demos.ts:
 * тема, тексты, таймер, галерея, карта, дресс-код, RSVP и генеративная музыка.
 */
export function DemoInvitation({ demo }: { demo: DemoConfig }) {
  const t = demo.theme;
  const displayFont = t.font === "serif" ? "var(--font-cormorant)" : "var(--font-manrope)";

  return (
    <div
      className="min-h-dvh"
      style={{
        background: t.bg,
        color: t.ink,
        // Переиспользуем токены для focus-и selection-стилей
        ["--accent" as string]: t.accent,
        ["--accent-fg" as string]: t.accentInk,
      }}
    >
      <ParticleLayer effect={demo.effect} colors={demo.effectColors} />
      <main className="mx-auto max-w-lg px-5 pb-16">
        {/* Обложка */}
        <header className="flex min-h-dvh flex-col items-center justify-center py-16 text-center">
          <p className="animate-fade-up text-xs uppercase tracking-[0.35em]" style={{ color: t.muted }}>
            {demo.hero.eyebrow}
          </p>
          <h1
            className="animate-fade-up mt-6 text-5xl font-medium leading-tight sm:text-6xl"
            style={{ fontFamily: displayFont, animationDelay: "120ms" }}
          >
            {demo.hero.title}
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-xs text-sm leading-relaxed"
            style={{ color: t.muted, animationDelay: "240ms" }}
          >
            {demo.hero.subtitle}
          </p>
          <p
            className="animate-fade-up mt-8 rounded-full border px-6 py-2.5 text-sm tracking-wide"
            style={{ borderColor: `${t.ink}33`, animationDelay: "360ms" }}
          >
            {demo.hero.dateLabel}
          </p>
          <MusicToggle demo={demo} />
          <span className="mt-12 animate-float-slow text-xl" aria-hidden="true" style={{ color: t.muted }}>
            ↓
          </span>
        </header>

        {/* Обращение */}
        <Reveal as="section" className="py-12 text-center">
          {demo.message.map((p, i) => (
            <p
              key={i}
              className="mx-auto mt-4 max-w-md text-base leading-relaxed first:mt-0"
              style={i === 0 ? { fontFamily: displayFont, fontSize: "1.35rem" } : { color: t.muted }}
            >
              {p}
            </p>
          ))}
        </Reveal>

        {/* Таймер */}
        <Reveal as="section" className="py-12">
          <SectionTitle t={t}>до события</SectionTitle>
          <Countdown dateISO={demo.dateISO} theme={t} />
        </Reveal>

        {/* Галерея */}
        <Reveal as="section" className="py-12">
          <SectionTitle t={t}>наша галерея</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            {demo.gallery.map((g, i) => (
              <figure key={i}>
                {g.src ? (
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={g.src}
                      alt={g.alt ?? g.label}
                      fill
                      sizes="(max-width: 640px) 45vw, 250px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="aspect-4/5 w-full rounded-2xl"
                    style={{ background: `linear-gradient(150deg, ${g.from}, ${g.to})` }}
                    role="img"
                    aria-label={`Фото: ${g.label}`}
                  />
                )}
                <figcaption className="mt-1.5 text-xs" style={{ color: t.muted }}>
                  {g.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-3 text-center text-xs" style={{ color: t.muted }}>
            Фотографии — для примера: в вашем приглашении будут ваши снимки
          </p>
        </Reveal>

        {/* Тайминг */}
        <Reveal as="section" className="py-12">
          <SectionTitle t={t}>{demo.timingTitle ?? "программа дня"}</SectionTitle>
          <ol className="relative ml-3 border-l" style={{ borderColor: `${t.ink}26` }}>
            {demo.timing.map((item) => (
              <li key={item.time} className="relative mb-6 pl-6 last:mb-0">
                <span
                  className="absolute -left-[5px] top-1.5 size-2.5 rounded-full"
                  style={{ background: t.accent }}
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold" style={{ color: t.accent }}>
                  {item.time}
                </p>
                <p className="text-sm" style={{ color: t.ink }}>
                  {item.label}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Карта */}
        <Reveal as="section" className="py-12">
          <SectionTitle t={t}>как добраться</SectionTitle>
          <div className="rounded-3xl p-6 text-center" style={{ background: t.card }}>
            <p className="text-lg font-semibold" style={{ fontFamily: displayFont }}>
              {demo.address.title}
            </p>
            <p className="mt-2 text-sm" style={{ color: t.muted }}>
              {demo.address.line}
            </p>
            <a
              href={`https://yandex.ru/maps/?text=${encodeURIComponent(demo.address.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: t.accent, color: t.accentInk }}
            >
              Открыть в Яндекс.Картах ↗
            </a>
          </div>
        </Reveal>

        {/* Дресс-код */}
        {demo.dresscode && (
          <Reveal as="section" className="py-12 text-center">
            <SectionTitle t={t}>дресс-код</SectionTitle>
            <p className="text-sm" style={{ color: t.muted }}>
              {demo.dresscode.label}
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {demo.dresscode.colors.map((c) => (
                <span
                  key={c}
                  className="size-9 rounded-full border"
                  style={{ background: c, borderColor: `${t.ink}22` }}
                  role="img"
                  aria-label={`Цвет ${c}`}
                />
              ))}
            </div>
          </Reveal>
        )}

        {/* RSVP */}
        <Reveal as="section" className="py-12">
          <SectionTitle t={t}>подтверждение</SectionTitle>
          <Rsvp demo={demo} />
        </Reveal>

        <footer className="pt-8 text-center text-xs" style={{ color: t.muted }}>
          <p>
            Это демо-приглашение студии{" "}
            <Link href="/" className="underline" style={{ color: t.accent }}>
              Пригласи
            </Link>
            . Тексты и даты — вымышленные.
          </p>
          <Link
            href={`/design/${demo.designSlug}`}
            className="mt-4 inline-flex rounded-full border px-6 py-3 text-sm font-semibold"
            style={{ borderColor: `${t.ink}33`, color: t.ink }}
          >
            Хочу такое приглашение
          </Link>
        </footer>
      </main>
    </div>
  );
}

function SectionTitle({ children, t }: { children: React.ReactNode; t: DemoConfig["theme"] }) {
  return (
    <h2
      className="mb-6 text-center text-xs uppercase tracking-[0.35em]"
      style={{ color: t.muted }}
    >
      {children}
    </h2>
  );
}

/* ---------- Таймер обратного отсчёта ---------- */

function Countdown({ dateISO, theme }: { dateISO: string; theme: DemoConfig["theme"] }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(dateISO).getTime();
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [dateISO]);

  const sec = Math.floor((left ?? 0) / 1000);
  const parts = [
    [Math.floor(sec / 86400), "дней"],
    [Math.floor((sec % 86400) / 3600), "часов"],
    [Math.floor((sec % 3600) / 60), "минут"],
    [sec % 60, "секунд"],
  ] as const;

  return (
    <div className="grid grid-cols-4 gap-2" role="timer" aria-label="До события">
      {parts.map(([n, label]) => (
        <div key={label} className="rounded-2xl py-4 text-center" style={{ background: theme.card }}>
          <p className="text-2xl font-semibold tabular-nums sm:text-3xl">
            {left === null ? "—" : String(n).padStart(2, "0")}
          </p>
          <p className="mt-1 text-[0.6rem] uppercase tracking-widest" style={{ color: theme.muted }}>
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------- RSVP (в демо ответ никуда не отправляется) ---------- */

function Rsvp({ demo }: { demo: DemoConfig }) {
  const t = demo.theme;
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-3xl p-8 text-center" style={{ background: t.card }}>
        <p className="text-2xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {answer === "yes" ? "Ура! Ждём вас" : "Жаль! Будем скучать"}
        </p>
        <p className="mt-2 text-sm" style={{ color: t.muted }}>
          {answer === "yes"
            ? `${name || "Гость"}, ваш ответ записан. До встречи!`
            : "Спасибо, что предупредили — это очень помогает."}
        </p>
        <p className="mt-4 text-xs" style={{ color: t.muted }}>
          В настоящем приглашении ответ мгновенно приходит организатору.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-3xl p-6 sm:p-8"
      style={{ background: t.card }}
      onSubmit={(e) => {
        e.preventDefault();
        if (answer) setSent(true);
      }}
    >
      <p className="text-center text-lg" style={{ fontFamily: "var(--font-cormorant)" }}>
        {demo.rsvp.question}
      </p>
      <p className="mt-1 text-center text-xs" style={{ color: t.muted }}>
        Пожалуйста, ответьте {demo.rsvp.deadline}
      </p>
      <label className="mt-5 block text-sm">
        <span className="sr-only">Ваше имя</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          className="w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none placeholder:opacity-60"
          style={{ borderColor: `${t.ink}33`, color: t.ink }}
        />
      </label>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setAnswer("yes")}
          aria-pressed={answer === "yes"}
          className="rounded-full py-3 text-sm font-semibold transition-all"
          style={
            answer === "yes"
              ? { background: t.accent, color: t.accentInk }
              : { border: `1px solid ${t.ink}33`, color: t.ink }
          }
        >
          Приду
        </button>
        <button
          type="button"
          onClick={() => setAnswer("no")}
          aria-pressed={answer === "no"}
          className="rounded-full py-3 text-sm font-semibold transition-all"
          style={
            answer === "no"
              ? { background: t.accent, color: t.accentInk }
              : { border: `1px solid ${t.ink}33`, color: t.ink }
          }
        >
          Не смогу
        </button>
      </div>
      <button
        type="submit"
        disabled={!answer}
        className="mt-3 w-full rounded-full py-3.5 text-sm font-semibold transition-opacity disabled:opacity-40"
        style={{ background: t.accent, color: t.accentInk }}
      >
        Отправить ответ
      </button>
    </form>
  );
}

/* ---------- Генеративная музыка (WebAudio, без файлов) ---------- */

function MusicToggle({ demo }: { demo: DemoConfig }) {
  const t = demo.theme;
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    ctxRef.current?.close();
    ctxRef.current = null;
    setPlaying(false);
  };

  const start = () => {
    const Ctx = window.AudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0.12;
    master.connect(ctx.destination);

    const { notes, tempo } = demo.music;
    const beat = 60 / tempo;
    let step = 0;
    const playNote = () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = notes[step % notes.length];
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(1, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + beat * 1.8);
      osc.connect(gain).connect(master);
      osc.start();
      osc.stop(ctx.currentTime + beat * 2);
      step += 1;
    };
    playNote();
    timerRef.current = setInterval(playNote, beat * 1000);
    setPlaying(true);
  };

  // Останавливаем звук при уходе со страницы
  useEffect(() => stop, []);

  return (
    <button
      type="button"
      onClick={playing ? stop : start}
      aria-pressed={playing}
      className="animate-fade-up mt-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-opacity hover:opacity-85"
      style={{ background: t.accent, color: t.accentInk, animationDelay: "480ms" }}
    >
      <span
        className={`size-1.5 rounded-full ${playing ? "animate-[pulse_1s_infinite]" : ""}`}
        style={{ background: t.accentInk }}
        aria-hidden="true"
      />
      {playing ? "Выключить музыку" : "Включить музыку"}
    </button>
  );
}
