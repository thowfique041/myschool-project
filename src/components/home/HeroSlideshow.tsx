"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

export type Slide = { image: ImageAsset; caption: string };

const INTERVAL_MS = 5000;

/**
 * Crossfading photo slideshow for the hero. Advances every few seconds,
 * pauses on hover/focus or via the pause button, and does not auto-advance
 * for people who prefer reduced motion.
 */
export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const paused = hovered || userPaused || Boolean(reduce);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, paused, slides.length]);

  const current = slides[index];
  const credit = current.image.credit;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="School life photos"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(false);
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-paper-dark">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.image.src}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Image
              src={current.image.src}
              alt={current.image.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-navy-950/75 to-transparent px-4 pt-10 pb-3">
          <p className="text-sm font-medium text-white" aria-live={paused ? "polite" : "off"}>
            {current.caption}
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.image.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1} of ${slides.length}`}
                aria-current={i === index ? "true" : undefined}
                className="flex size-6 items-center justify-center"
              >
                <span className={cn("block h-1.5 rounded-full bg-white transition-all", i === index ? "w-5" : "w-1.5 opacity-60")} />
              </button>
            ))}
            {!reduce && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                className="ml-1 flex size-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
              >
                {userPaused ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
              </button>
            )}
          </div>
        </div>
      </div>
      <p className="px-1 pt-2 text-[0.72rem] leading-snug text-muted">
        Representative photos — not Webnion&apos;s campus.{" "}
        {credit && (
          <>
            Photo{credit.author ? ` by ${credit.author}` : ""} on{" "}
            <a href={credit.page} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
              Unsplash
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}
