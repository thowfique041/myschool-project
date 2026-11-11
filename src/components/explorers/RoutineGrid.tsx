"use client";

import type { CSSProperties } from "react";
import { BellRing, Coffee } from "lucide-react";
import { cn, toBnDigits } from "@/lib/utils";

const DAY_KEYS = ["sat", "sun", "mon", "tue", "wed", "thu"] as const;
type DayKey = (typeof DAY_KEYS)[number];
type Row = Record<string, string>;

export type RoutineLabels = {
  title: string;
  time: string;
  days: string[];
  today: string;
  now: string;
  lab: string;
  /** Templates with {n}, e.g. "Period {n}", "{n} periods", "{n} min". */
  period: string;
  periods: string;
  minutes: string;
  caption: string;
  scrollHint: string;
  bangla: boolean;
};

const fill = (tpl: string, n: number, bangla: boolean) => tpl.replace("{n}", bangla ? toBnDigits(n) : String(n));

/** Subject colour by English name (light / dark). Unknown subjects fall back to grey. */
const TONES: [RegExp, string][] = [
  [/^bangla/i, "bg-orange-100 text-orange-900 dark:bg-orange-400/15 dark:text-orange-200"],
  [/^english/i, "bg-violet-100 text-violet-900 dark:bg-violet-400/15 dark:text-violet-200"],
  [/^math/i, "bg-blue-100 text-blue-900 dark:bg-blue-400/15 dark:text-blue-200"],
  [/^science/i, "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-200"],
  [/^digital|^ict/i, "bg-cyan-100 text-cyan-900 dark:bg-cyan-400/15 dark:text-cyan-200"],
  [/^history|social/i, "bg-amber-100 text-amber-900 dark:bg-amber-300/20 dark:text-amber-100"],
  [/^religion/i, "bg-stone-200 text-stone-800 dark:bg-stone-400/15 dark:text-stone-200"],
  [/^life/i, "bg-lime-100 text-lime-900 dark:bg-lime-400/15 dark:text-lime-200"],
  [/^wellbeing/i, "bg-pink-100 text-pink-900 dark:bg-pink-400/15 dark:text-pink-200"],
  [/^arts/i, "bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-400/15 dark:text-fuchsia-200"],
];
const toneFor = (en: string) => TONES.find(([re]) => re.test(en))?.[1] ?? "bg-slate-100 text-slate-800 dark:bg-slate-400/15 dark:text-slate-200";

const isLab = (en: string) => /\(lab\)/i.test(en);
const stripLab = (s: string) => s.replace(/\s*\((lab|ল্যাব)\)\s*$/i, "");

/** "10:20 – 11:00" → minutes since midnight. School hours: 1–6 o'clock means PM. */
function parseRange(t: string): [number, number] | null {
  const m = t.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const toMin = (h: number, mm: number) => (h < 7 ? h + 12 : h) * 60 + mm;
  return [toMin(+m[1], +m[2]), toMin(+m[3], +m[4])];
}

export function RoutineGrid({ rows, rowsEn, labels }: { rows: Row[]; rowsEn: Row[]; labels: RoutineLabels }) {
  const ranges = rowsEn.map((r) => parseRange(r.time ?? ""));

  let periodNo = 0;
  const periodOf = rowsEn.map((r) => (["Assembly", "Break"].includes(r.sat) ? 0 : ++periodNo));

  const cells: { key: string; style: CSSProperties; node: React.ReactNode }[] = [];
  const col = (d: DayKey) => DAY_KEYS.indexOf(d) + 2;

  rowsEn.forEach((rEn, i) => {
    const gridRow = i + 2;
    const r = rows[i] ?? rEn;
    const range = ranges[i];
    // Time column
    cells.push({
      key: `t${i}`,
      style: { gridRow, gridColumn: 1 },
      node: (
        <div className="flex h-full flex-col justify-center pr-2">
          {periodOf[i] > 0 && <span className="text-xs text-muted">{fill(labels.period, periodOf[i], labels.bangla)}</span>}
          <span className={cn("text-sm tabular-nums text-heading", periodOf[i] > 0 ? "font-bold" : "text-muted")}>{r.time}</span>
        </div>
      ),
    });

    if (rEn.sat === "Assembly" || rEn.sat === "Break") {
      const isBreak = rEn.sat === "Break";
      const Icon = isBreak ? Coffee : BellRing;
      const mins = range ? range[1] - range[0] : 0;
      cells.push({
        key: `b${i}`,
        style: { gridRow, gridColumn: "2 / -1" },
        node: (
          <div className="flex h-full items-center gap-2 border border-dashed border-line-strong bg-paper-dark px-4 py-2 text-sm font-medium text-subheading">
            <Icon aria-hidden className="size-4" />
            {r.sat}
            {isBreak && mins > 0 && <span className="text-muted">· {fill(labels.minutes, mins, labels.bangla)}</span>}
          </div>
        ),
      });
      return;
    }

    DAY_KEYS.forEach((d) => {
      const en = rEn[d] ?? "";
      // Second half of a double lab period is drawn by the cell above.
      if (isLab(en) && i > 0 && rowsEn[i - 1][d] === en) return;
      const span = isLab(en) && rowsEn[i + 1]?.[d] === en ? 2 : 1;
      cells.push({
        key: `${d}${i}`,
        style: { gridRow: span > 1 ? `${gridRow} / span ${span}` : gridRow, gridColumn: col(d) },
        node: (
          <div
            className={cn(
              "flex h-full min-h-12 flex-col justify-center gap-1 px-3 py-2 text-sm font-semibold",
              toneFor(en),
              span > 1 && "items-start",
            )}
          >
            <span className="flex flex-wrap items-center gap-1.5">
              {stripLab(r[d] ?? en)}
              {isLab(en) && span === 1 && <span className="bg-white/80 px-1.5 text-[0.65rem] font-semibold text-heading dark:bg-white/15 dark:text-white">{labels.lab}</span>}
            </span>
            {span > 1 && <span className="bg-white/80 px-2 py-0.5 text-[0.65rem] font-semibold text-heading dark:bg-white/15 dark:text-white">{labels.lab} · {fill(labels.periods, span, labels.bangla)}</span>}
          </div>
        ),
      });
    });
  });

  return (
    <>
      {/* Plain table for screen readers; the visual grid below is hidden from them. */}
      {/* Tables ignore the 1px width of sr-only, so the wrapper carries it. */}
      <div className="sr-only">
      <table>
        <caption>{labels.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{labels.time}</th>
            {labels.days.map((d) => (
              <th key={d} scope="col">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <th scope="row">{r.time}</th>
              {DAY_KEYS.map((d) => (
                <td key={d}>{r[d]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="overflow-x-auto" tabIndex={0} aria-label={labels.scrollHint}>
        <div aria-hidden className="grid min-w-[52rem] gap-2 p-3 sm:p-4" style={{ gridTemplateColumns: "7rem repeat(6, minmax(7rem, 1fr))" }}>
          <div style={{ gridRow: 1, gridColumn: 1 }} className="flex items-center px-0 text-sm font-semibold text-heading">
            {labels.time}
          </div>
          {DAY_KEYS.map((d, i) => (
            <div key={d} style={{ gridRow: 1, gridColumn: i + 2 }} className="bg-navy-800 px-3 py-2 text-sm font-semibold text-white">
              {labels.days[i]}
            </div>
          ))}
          {cells.map((c) => (
            <div key={c.key} style={c.style}>
              {c.node}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
