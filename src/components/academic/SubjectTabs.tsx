"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type Level = { level: string; compulsory: string[]; optional: string[] };

/** Class-level tabs (WAI-ARIA tabs pattern: arrow keys, Home/End). */
export function SubjectTabs({ levels, label, compulsoryLabel, groupLabel }: { levels: Level[]; label: string; compulsoryLabel: string; groupLabel: string }) {
  const [i, setI] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (to: number) => {
    const next = (to + levels.length) % levels.length;
    setI(next);
    refs.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: levels.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      move(map[e.key]);
    }
  };
  const cur = levels[i];
  if (!cur) return null;
  return (
    <div className="mt-8">
      <div role="tablist" aria-label={label} className="flex overflow-x-auto border-b border-line" onKeyDown={onKey}>
        {levels.map((l, k) => (
          <button
            key={l.level}
            ref={(el) => {
              refs.current[k] = el;
            }}
            id={`${base}-t${k}`}
            role="tab"
            type="button"
            aria-selected={k === i}
            aria-controls={`${base}-p`}
            tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            className={cn(
              "-mb-px min-h-12 shrink-0 border-b-2 px-4 font-serif text-lg font-semibold whitespace-nowrap transition-colors",
              k === i ? "border-leaf-600 text-heading dark:border-accent" : "border-transparent text-muted hover:text-heading",
            )}
          >
            {l.level}
          </button>
        ))}
      </div>
      <div id={`${base}-p`} role="tabpanel" aria-labelledby={`${base}-t${i}`} tabIndex={0} className="grid gap-10 py-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <h3 className="eyebrow text-subheading">{compulsoryLabel}</h3>
          <ol className="mt-3 grid border-t-2 border-navy-800 sm:grid-cols-2 dark:border-navy-300">
            {cur.compulsory.map((s, k) => (
              <li key={s} className="flex items-baseline gap-3 border-b border-line py-3 sm:odd:pr-4 sm:even:pl-4">
                <span aria-hidden className="w-6 font-serif text-sm font-semibold text-leaf-600 tabular-nums dark:text-accent">{String(k + 1).padStart(2, "0")}</span>
                <span className="text-ink">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        {cur.optional.length > 0 && (
          <div>
            <h3 className="eyebrow text-subheading">{groupLabel}</h3>
            <ul className="mt-3 border-t-2 border-navy-800 dark:border-navy-300">
              {cur.optional.map((o) => {
                const [g, rest] = o.split(/:\s*/);
                return (
                  <li key={o} className="border-b border-line py-3">
                    {rest ? (
                      <>
                        <span className="block font-serif text-lg font-semibold text-heading">{g}</span>
                        <span className="text-sm leading-relaxed text-muted">{rest}</span>
                      </>
                    ) : (
                      <span className="text-ink">{o}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
