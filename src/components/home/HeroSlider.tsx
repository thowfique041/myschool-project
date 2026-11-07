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

const INTERVAL = 5000;

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

  const btn = "flex size-10 items-center justify-center border border-line-strong text-heading hover:border-heading hover:bg-surface";
  return (
    <section
      aria-roledescription="carousel"
      aria-label={t.slider.label}
      className="border-b border-line bg-paper"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false);
      }}
    >
      {/* Every slide sits in the same grid cell, so the hero is as tall as its tallest slide. */}
      <div className="grid grid-cols-[minmax(0,1fr)]">
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
              className={cn(
                "grid grid-cols-[minmax(0,1fr)] [grid-area:1/1] transition-opacity duration-700 motion-reduce:transition-none lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
                active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              {/* Text: aligned to the page grid on the left; the photograph bleeds to the right edge. */}
              <div className="order-2 flex flex-col justify-center px-4 py-9 sm:px-6 sm:py-12 lg:order-1 lg:py-16 lg:pr-12 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
                {s.motto && <p className="font-serif text-lg text-leaf-600 italic dark:text-accent">{s.motto}</p>}
                <Heading id={i === 0 ? "hero-title" : undefined} className={cn("font-serif text-[2.4rem] leading-[1.05] font-semibold text-heading sm:text-[3.2rem] xl:text-[3.9rem]", s.motto && "mt-3")}>
                  {s.title}
                </Heading>
                {s.lines[0] && <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{s.lines[0]}</p>}
                {s.lines.slice(1).map((l) => (
                  <p key={l} className="mt-5 max-w-md border-t border-line pt-4 text-base font-semibold text-heading">{l}</p>
                ))}
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <ButtonLink href={s.href} variant="secondary">
                    {s.label}
                    <ArrowRight aria-hidden className="size-4" />
                  </ButtonLink>
                  {s.secondary && (
                    <Link href={s.secondary.href} className="text-sm font-semibold text-heading underline underline-offset-4 hover:text-accent">
                      {s.secondary.label}
                    </Link>
                  )}
                </div>
              </div>
              <div className="relative order-1 aspect-[4/3] bg-paper-dark sm:aspect-[16/9] lg:order-2 lg:aspect-auto lg:min-h-[36rem]">
                <Image src={s.image} alt={s.imageAlt} fill priority={i === 0} sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover object-[70%_center]" />
              </div>
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <div className="border-t border-line">
          <div className="container-page flex items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-4">
              <p className="font-serif text-sm text-muted tabular-nums" aria-hidden>
                {t.slider.slideOf(index + 1, n)}
              </p>
              <div className="flex items-center gap-1.5">
                {slides.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={t.slider.goTo(i + 1)}
                    aria-current={i === index ? "true" : undefined}
                    className="flex h-6 items-center"
                  >
                    <span className={cn("block h-0.5 transition-all", i === index ? "w-8 bg-leaf-600 dark:bg-accent" : "w-4 bg-line-strong hover:bg-muted")} />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {!reduce && (
                <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? t.slider.play : t.slider.pause} className={btn}>
                  {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
                </button>
              )}
              <button type="button" onClick={() => go(index - 1)} aria-label={t.slider.prev} className={btn}>
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button type="button" onClick={() => go(index + 1)} aria-label={t.slider.next} className={btn}>
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
