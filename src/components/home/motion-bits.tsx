"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { Megaphone, Pause, Play } from "lucide-react";
import type { Notice } from "@/types";

/** Staggered entrance for hero content on first load. */
export function HeroIntro({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up to a value once visible. */
export function StatCounter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {(reduce ? value : display).toFixed(decimals)}
      {suffix}
    </span>
  );
}

/**
 * The scrolling "latest notice" strip familiar from Bangladeshi school sites —
 * pausable, pauses on hover/focus, and static for reduced-motion users.
 */
export function NoticeTicker({ notices }: { notices: Notice[] }) {
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const paused = hovered || userPaused;
  const reduce = useReducedMotion();
  const items = notices.slice(0, 5);

  const list = (hidden = false) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((n) => (
        <li key={n.slug} className="flex items-center gap-3 whitespace-nowrap">
          <span aria-hidden className="size-1.5 rounded-full bg-signal-600" />
          <Link href={`/notices/${n.slug}`} lang="bn" tabIndex={hidden ? -1 : undefined} className="text-[0.92rem] text-heading hover:text-accent hover:underline underline-offset-4">
            {n.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex items-stretch overflow-hidden rounded-lg border border-line bg-surface shadow-[var(--shadow-card)]">
      <div className="flex shrink-0 items-center gap-2 bg-signal-600 px-3 text-sm font-semibold text-white sm:px-4">
        <Megaphone aria-hidden className="size-4" />
        <span lang="bn" className="hidden sm:inline">সর্বশেষ নোটিশ</span>
        <span className="sm:hidden">Latest</span>
      </div>
      <div
        className="group relative flex min-w-0 flex-1 items-center overflow-hidden py-2.5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {reduce ? (
          <div className="overflow-x-auto px-4">{list()}</div>
        ) : (
          <div
            className="flex w-max pl-4"
            style={{
              animation: "wsc-marquee 38s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {list()}
            {list(true)}
          </div>
        )}
      </div>
      {!reduce && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? "Resume scrolling notices" : "Pause scrolling notices"}
          className="flex w-11 shrink-0 items-center justify-center border-l border-line text-subheading hover:bg-paper"
        >
          {userPaused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
        </button>
      )}
      <style>{`@keyframes wsc-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
