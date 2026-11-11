"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";

export type Slide = {
  image: string;
  imageAlt: string;
  /** Short caption shown on a strip under the photo. */
  caption: string;
};

const INTERVAL = 2000;

/**
 * Photo slideshow for the homepage's main column, with a one-line caption.
 * Auto-advances unless the visitor prefers reduced motion, has paused it, or
 * is hovering/focused inside it.
 */
export function HeroSlider({ slides }: { slides: Slide[] }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const n = slides.length;
  const go = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);
  const running = n > 1 && !reduce && !paused && !hold;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [running, index, go]);

  const btn = "flex size-8 items-center justify-center border border-white/40 text-white hover:bg-white/15";
  return (
    <section
      aria-roledescription="carousel"
      aria-label={t.slider.label}
      className="border border-line bg-navy-950"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false);
      }}
    >
      <div className="relative aspect-[16/9] sm:aspect-[2/1]">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.image + i}
              role="group"
              aria-roledescription="slide"
              aria-label={t.slider.slideOf(i + 1, n)}
              aria-hidden={!active}
              inert={!active}
              className={cn("absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none", active ? "opacity-100" : "pointer-events-none opacity-0")}
            >
              <Image src={s.image} alt={s.imageAlt} fill priority={i === 0} sizes="(min-width: 1024px) 54rem, 100vw" className="object-cover" />
              {s.caption && (
                <p className="absolute inset-x-0 bottom-0 bg-navy-950/80 px-4 py-2 pr-36 text-sm text-white sm:text-base">{s.caption}</p>
              )}
            </div>
          );
        })}
        {n > 1 && (
          <div className="absolute right-2 bottom-1.5 flex items-center gap-1">
            {!reduce && (
              <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? t.slider.play : t.slider.pause} className={btn}>
                {paused ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
              </button>
            )}
            <button type="button" onClick={() => go(index - 1)} aria-label={t.slider.prev} className={btn}>
              <ChevronLeft aria-hidden className="size-4" />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label={t.slider.next} className={btn}>
              <ChevronRight aria-hidden className="size-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
