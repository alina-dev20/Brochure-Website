"use client";

import { useEffect, useRef, useState } from "react";
import { TRACKS, type Track } from "@/lib/music";

/**
 * Плеер подборки композиций. Генеративные треки играют через WebAudio;
 * если у трека задан src (реальный файл в /public), играет <audio>.
 */
export function TrackList() {
  const [current, setCurrent] = useState<string | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    ctxRef.current?.close();
    ctxRef.current = null;
    audioRef.current?.pause();
    audioRef.current = null;
    setCurrent(null);
  };

  useEffect(() => stop, []);

  const play = (track: Track) => {
    stop();
    if (track.src) {
      const audio = new Audio(track.src);
      audio.loop = true;
      audio.play();
      audioRef.current = audio;
      setCurrent(track.id);
      return;
    }
    const Ctx = window.AudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0.12;
    master.connect(ctx.destination);
    const beat = 60 / track.tempo;
    let step = 0;
    const note = () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = track.notes[step % track.notes.length];
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(1, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + beat * 1.8);
      osc.connect(gain).connect(master);
      osc.start();
      osc.stop(ctx.currentTime + beat * 2);
      step += 1;
    };
    note();
    timerRef.current = setInterval(note, beat * 1000);
    setCurrent(track.id);
  };

  return (
    <ul className="divide-y divide-line rounded-3xl border border-line bg-card">
      {TRACKS.map((track) => {
        const playing = current === track.id;
        return (
          <li key={track.id} className="flex items-center gap-4 px-5 py-4 sm:px-7">
            <button
              type="button"
              onClick={() => (playing ? stop() : play(track))}
              aria-label={playing ? `Остановить «${track.title}»` : `Прослушать «${track.title}»`}
              className={`grid size-12 shrink-0 place-items-center rounded-full transition-colors ${
                playing ? "bg-accent text-accent-fg" : "bg-accent-soft text-accent hover:bg-accent hover:text-accent-fg"
              }`}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <rect x="2" y="2" width="3.5" height="10" rx="1" fill="currentColor" />
                  <rect x="8.5" y="2" width="3.5" height="10" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M3.5 2.2v9.6c0 .5.55.8.97.54l7.2-4.8a.65.65 0 0 0 0-1.08l-7.2-4.8a.65.65 0 0 0-.97.54Z" fill="currentColor" />
                </svg>
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                «{track.title}»
                {playing && (
                  <span className="ml-2 text-xs font-normal text-accent">— играет</span>
                )}
              </p>
              <p className="truncate text-sm text-muted">{track.mood}</p>
            </div>
            <p className="hidden shrink-0 text-xs text-muted sm:block">
              {track.occasions.join(" · ")}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
