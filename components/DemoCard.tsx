"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CardDemoConfig } from "@/lib/demos";
import { ParticleLayer } from "./ParticleLayer";

/**
 * Движок демо-открытки: фото на весь экран, строки поздравления появляются
 * по очереди, у «Открытки с анимацией» — музыка и парящие огоньки.
 */
export function DemoCard({ demo }: { demo: CardDemoConfig }) {
  const t = demo.theme;

  return (
    <div className="relative min-h-dvh" style={{ background: t.overlay, color: t.ink }}>
      {/* Фото с затемнением и медленным «живым» зумом */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={demo.photo.src}
          alt={demo.photo.alt}
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover opacity-60"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${t.overlay}55 0%, ${t.overlay}22 40%, ${t.overlay}ee 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Анимированный фон: искры, лепестки, снег, конфетти или боке */}
      <ParticleLayer
        effect={demo.effect}
        colors={demo.effectColors ?? [t.accent]}
        position="absolute"
      />

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-end px-6 pb-10 pt-24 text-center">
        <p className="animate-fade-up text-xs uppercase tracking-[0.35em] opacity-80">
          {demo.eyebrow}
        </p>
        <h1
          className="animate-fade-up mt-4 font-display text-5xl font-medium leading-tight sm:text-6xl"
          style={{ animationDelay: "150ms" }}
        >
          {demo.title}
        </h1>

        <div className="mt-7 space-y-4">
          {demo.lines.map((line, i) => (
            <p
              key={i}
              className="animate-fade-up text-base leading-relaxed opacity-90"
              style={{ animationDelay: `${500 + i * 700}ms` }}
            >
              {line}
            </p>
          ))}
        </div>

        <p
          className="animate-fade-up mt-7 font-display text-2xl italic"
          style={{ animationDelay: `${500 + demo.lines.length * 700}ms` }}
        >
          {demo.signature}
        </p>

        {demo.music && <MusicToggle demo={demo} />}

        <footer
          className="animate-fade-up mt-12 border-t pt-6 text-xs opacity-80"
          style={{
            borderColor: `${t.ink}33`,
            animationDelay: `${900 + demo.lines.length * 700}ms`,
          }}
        >
          <p>
            Это демо-открытка студии{" "}
            <Link href="/" className="underline" style={{ color: t.accent }}>
              Пригласи
            </Link>
            . Фото, текст и подпись будут вашими.
          </p>
          <Link
            href={`/design/${demo.designSlug}`}
            className="mt-4 inline-flex rounded-full px-6 py-3 text-sm font-semibold no-underline"
            style={{ background: t.accent, color: t.accentInk }}
          >
            Хочу такую открытку
          </Link>
        </footer>
      </main>
    </div>
  );
}

/* Музыка — та же генеративная механика, что и в полных демо */
function MusicToggle({ demo }: { demo: CardDemoConfig }) {
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
    if (!Ctx || !demo.music) return;
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

  useEffect(() => stop, []);

  return (
    <button
      type="button"
      onClick={playing ? stop : start}
      aria-pressed={playing}
      className="animate-fade-up mt-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-opacity hover:opacity-85"
      style={{
        background: t.accent,
        color: t.accentInk,
        animationDelay: "1000ms",
      }}
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
