"use client";

import { useMemo, useState } from "react";
import { cn, datePartsL, formatDate, toBnDigits } from "@/lib/utils";
import type { CalendarEvent } from "@/types";

export type CalendarLabels = {
  all: string;
  filter: string;
  months: string;
  nextUp: string;
  past: string;
  until: string;
  empty: string;
  /** Template with {n} and {total}. */
  shown: string;
  monthNames: string[];
};

/** One colour per event type, drawn as a thin rule and a dot (never colour alone: the label is always shown). */
const TONE: Record<string, string> = {
  exam: "bg-navy-800 dark:bg-navy-300",
  holiday: "bg-signal-600",
  event: "bg-leaf-600 dark:bg-accent",
  academic: "bg-navy-400",
  admission: "bg-amber-600",
};
const tone = (t: string) => TONE[t] ?? "bg-line-strong";

export function CalendarExplorer({
  events,
  types,
  today,
  lang,
  labels,
}: {
  events: CalendarEvent[];
  types: [string, string][];
  today: string;
  lang: "en" | "bn";
  labels: CalendarLabels;
}) {
  const [type, setType] = useState("all");
  const n = (v: number | string) => (lang === "bn" ? toBnDigits(v) : String(v));
  const sorted = useMemo(() => [...events].sort((a, b) => a.date.localeCompare(b.date)), [events]);
  const shown = sorted.filter((e) => type === "all" || e.type === type);
  const isPast = (e: CalendarEvent) => (e.endDate ?? e.date) < today;
  const next = shown.find((e) => !isPast(e));
  const groups = new Map<string, CalendarEvent[]>();
  for (const e of shown) groups.set(e.date.slice(0, 7), [...(groups.get(e.date.slice(0, 7)) ?? []), e]);
  const thisMonth = today.slice(0, 7);
  const monthLabel = (key: string, short = false) => {
    const [y, m] = key.split("-").map(Number);
    const name = labels.monthNames[m - 1];
    return short ? `${lang === "en" ? name.slice(0, 3) : name} ${n(String(y).slice(2))}` : `${name} ${n(y)}`;
  };
  const count = (t: string) => (t === "all" ? sorted.length : sorted.filter((e) => e.type === t).length);
  const range = (e: CalendarEvent) => (e.endDate ? `${formatDate(e.date, lang)} – ${formatDate(e.endDate, lang)}` : formatDate(e.date, lang));
  const typeLabel = (t: string) => types.find(([k]) => k === t)?.[1] ?? t;

  return (
    <div>
      {/* Filters */}
      <div role="group" aria-label={labels.filter} className="print-hide flex flex-wrap gap-x-1 gap-y-2 border-b border-line">
        {[["all", labels.all] as [string, string], ...types].map(([k, label]) => (
          <button
            key={k}
            type="button"
            aria-pressed={type === k}
            onClick={() => setType(k)}
            className={cn(
              "-mb-px inline-flex min-h-11 items-center gap-2 border-b-2 px-3 text-sm font-medium transition-colors",
              type === k ? "border-leaf-600 text-heading dark:border-accent" : "border-transparent text-muted hover:text-heading",
            )}
          >
            {k !== "all" && <span aria-hidden className={cn("size-2 rounded-full", tone(k))} />}
            {label}
            <span className="text-xs text-muted tabular-nums">{n(count(k))}</span>
          </button>
        ))}
      </div>
      <p className="print-hide mt-3 text-sm text-muted" aria-live="polite">
        {labels.shown.replace("{n}", n(shown.length)).replace("{total}", n(sorted.length))}
      </p>

      {/* Next up */}
      {next && (
        <div className="mt-8 grid gap-6 border-t-4 border-leaf-600 bg-navy-900 p-6 text-white sm:grid-cols-[auto_1fr] sm:items-center sm:p-8 dark:border-accent">
          <p className="eyebrow text-on-navy-accent sm:col-span-2">{labels.nextUp}</p>
          <time dateTime={next.date} className="flex items-baseline gap-3 sm:block sm:border-r sm:border-white/20 sm:pr-8">
            <span className="block font-serif text-6xl leading-none font-semibold">{datePartsL(next.date, lang).day}</span>
            <span className="eyebrow mt-2 block text-on-navy-accent">
              {datePartsL(next.date, lang).month} {datePartsL(next.date, lang).year}
            </span>
          </time>
          <div>
            <p className="font-serif text-2xl leading-snug font-semibold sm:text-3xl">{next.title}</p>
            <p className="mt-2 text-sm text-navy-100">
              {typeLabel(next.type)} · {range(next)}
              {next.venue && ` · ${next.venue}`}
            </p>
          </div>
        </div>
      )}

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[11rem_minmax(0,1fr)]">
        {/* Month navigation: sticky list on desktop, scrolling row on mobile */}
        <nav aria-label={labels.months} className="print-hide lg:sticky lg:top-28 lg:self-start">
          <ul className="flex gap-1 overflow-x-auto border-b border-line lg:flex-col lg:border-b-0 lg:border-l">
            {[...groups.keys()].map((key) => (
              <li key={key}>
                <a
                  href={`#m-${key}`}
                  aria-current={key === thisMonth ? "date" : undefined}
                  className={cn(
                    "-mb-px flex min-h-10 items-center gap-2 border-b-2 px-3 text-sm whitespace-nowrap lg:mb-0 lg:-ml-px lg:border-b-0 lg:border-l-2",
                    key === thisMonth ? "border-leaf-600 font-semibold text-heading dark:border-accent" : "border-transparent text-muted hover:text-heading",
                  )}
                >
                  {monthLabel(key)}
                  <span className="text-xs tabular-nums">{n(groups.get(key)!.length)}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Monthly timeline */}
        <div className="space-y-12">
          {groups.size === 0 && <p className="text-muted">{labels.empty}</p>}
          {[...groups.entries()].map(([key, list]) => (
            <section key={key} id={`m-${key}`} aria-labelledby={`mh-${key}`} className="scroll-mt-4">
              <h2 id={`mh-${key}`} className="flex items-baseline gap-3 font-serif text-2xl leading-tight font-semibold text-heading">
                {monthLabel(key)}
                {key === thisMonth && <span className="eyebrow text-leaf-600 dark:text-accent">●</span>}
              </h2>
              <ul className="mt-3 border-t-2 border-navy-800 dark:border-navy-300">
                {list.map((e) => {
                  const d = datePartsL(e.date, lang);
                  const past = isPast(e);
                  return (
                    <li key={e.date + e.title} className={cn("grid grid-cols-[4rem_1fr] gap-x-5 border-b border-line py-4 sm:grid-cols-[4rem_1fr_auto]", past && "bg-paper-dark/40")}>
                      <time dateTime={e.date} className="border-r border-line pr-3 text-center">
                        <span className={cn("block font-serif text-[1.7rem] leading-none font-semibold", past ? "text-muted" : "text-heading")}>{d.day}</span>
                        <span className={cn("eyebrow mt-1 block", past ? "text-muted" : "text-leaf-600 dark:text-accent")}>{d.month}</span>
                      </time>
                      <div className="min-w-0">
                        <p className={cn("font-semibold", past ? "text-muted" : "text-heading")}>
                          {e.title}
                          {e === next && <span className="eyebrow ml-2 text-leaf-600 dark:text-accent">{labels.nextUp}</span>}
                        </p>
                        {e.endDate && <p className="mt-0.5 text-sm text-muted">{range(e)}</p>}
                        {(e.venue || e.description) && (
                          <p className="mt-1 text-sm text-ink">
                            {e.venue && <span className="font-medium">{e.venue}. </span>}
                            {e.description}
                          </p>
                        )}
                        <p className="mt-2 flex items-center gap-2 text-xs text-muted sm:hidden">
                          <span aria-hidden className={cn("size-2 rounded-full", tone(e.type))} />
                          {e.typeLabel ?? typeLabel(e.type)}
                          {past && ` · ${labels.past}`}
                        </p>
                      </div>
                      <p className="hidden items-center gap-2 self-start text-sm text-muted sm:flex">
                        <span aria-hidden className={cn("size-2 rounded-full", tone(e.type))} />
                        {e.typeLabel ?? typeLabel(e.type)}
                        {past && <span className="text-xs">· {labels.past}</span>}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
