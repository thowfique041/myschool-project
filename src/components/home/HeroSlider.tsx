"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "@/components/i18n/Link";
import { ButtonLink } from "@/components/ui/primitives";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";

export type Slide = {
  image: string;
  imageAlt: string;
  title: string;
  /** Lines under the title; the first is shown larger. */
  lines: string[];
  href: string;
  label: string;
  /** Small italic line (the school motto on the first slide). */
  motto?: string;
  secondary?: { href: string; label: string };
};

const INTERVAL = 2000;

/**
 * Full-width photo slideshow. Auto-advances unless the visitor prefers reduced
 * motion, has paused it, or is hovering/focused inside it. Only the first
 * slide carries the page h1.
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

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t.slider.label}
      className="relative isolate overflow-hidden bg-navy-950 text-white"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false);
      }}
    >
      <div className="relative h-[30rem] sm:h-[36rem] lg:h-[42rem]">
        {slides.map((s, i) => {
          const active = i === index;
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={s.title}
              role="group"
              aria-roledescription="slide"
              aria-label={t.slider.slideOf(i + 1, n)}
              aria-hidden={!active}
              inert={!active}
              className={cn("absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none", active ? "opacity-100" : "pointer-events-none opacity-0")}
            >
              <Image src={s.image} alt={s.imageAlt} fill priority={i === 0} sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/70 via-navy-950/25 to-navy-950/10 md:bg-gradient-to-r md:from-navy-950/75 md:via-navy-950/25 md:to-transparent" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-navy-950/50 to-transparent" />
              <div className="container-page flex h-full flex-col justify-center pb-10">
                <div className="max-w-2xl rounded-md border-l-4 border-[#e8b84a] bg-navy-950/75 p-6 shadow-[0_8px_30px_rgb(0_0_0/0.35)] sm:p-8">
                  <Heading id={i === 0 ? "hero-title" : undefined} className="font-serif text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
                    {s.title}
                  </Heading>
                  {s.lines[0] && <p className="mt-3 text-lg text-white sm:text-xl">{s.lines[0]}</p>}
                  {s.motto && <p className="mt-1 text-sm text-[#e8b84a] italic">{s.motto}</p>}
                  {s.lines.slice(1).map((l) => (
                    <p key={l} className="mt-4 text-base font-semibold text-[#f3cc6e] sm:text-lg">{l}</p>
                  ))}
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <ButtonLink href={s.href} variant="secondary">
                      {s.label}
                      <ArrowRight aria-hidden className="size-4" />
                    </ButtonLink>
                    {s.secondary && (
                      <Link href={s.secondary.href} className="text-sm font-semibold underline underline-offset-4 hover:text-navy-100">
                        {s.secondary.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-page flex items-center justify-between gap-4 pb-4">
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={t.slider.goTo(i + 1)}
                  aria-current={i === index ? "true" : undefined}
                  className="flex h-6 items-center"
                >
                  <span className={cn("block h-1.5 rounded-full bg-white transition-all", i === index ? "w-8" : "w-4 opacity-50 hover:opacity-80")} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              {!reduce && (
                <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? t.slider.play : t.slider.pause} className="flex size-9 items-center justify-center rounded border border-white/40 hover:bg-white/10">
                  {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
                </button>
              )}
              <button type="button" onClick={() => go(index - 1)} aria-label={t.slider.prev} className="flex size-9 items-center justify-center rounded border border-white/40 hover:bg-white/10">
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button type="button" onClick={() => go(index + 1)} aria-label={t.slider.next} className="flex size-9 items-center justify-center rounded border border-white/40 hover:bg-white/10">
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
