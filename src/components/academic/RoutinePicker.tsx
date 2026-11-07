"use client";

import { useMemo, useState } from "react";
import { Printer } from "lucide-react";
import { RoutineGrid, type RoutineLabels } from "@/components/explorers/RoutineGrid";
import { buttonClasses } from "@/components/ui/primitives";

type Routine = { title: string; rows: Record<string, string>[]; rowsEn: Record<string, string>[] };
export type PickerLabels = { klass: string; section: string; shift: string; print: string; none: string };

/** Routine titles are "Class · Section · Shift"; the selectors only offer combinations that exist. */
const parts = (t: string) => {
  const [klass = t, section = "", shift = ""] = t.split(/\s*·\s*/);
  return { klass, section, shift };
};

export function RoutinePicker({ routines, grid, labels }: { routines: Routine[]; grid: Omit<RoutineLabels, "title" | "caption">; labels: PickerLabels & { caption: string } }) {
  const parsed = useMemo(() => routines.map((r) => ({ r, ...parts(r.title) })), [routines]);
  const first = parsed[0];
  const [klass, setKlass] = useState(first?.klass ?? "");
  const [section, setSection] = useState(first?.section ?? "");
  const [shift, setShift] = useState(first?.shift ?? "");
  const uniq = (xs: string[]) => [...new Set(xs.filter(Boolean))];
  const classes = uniq(parsed.map((p) => p.klass));
  const sections = uniq(parsed.filter((p) => p.klass === klass).map((p) => p.section));
  const shifts = uniq(parsed.filter((p) => p.klass === klass && p.section === section).map((p) => p.shift));
  const match = parsed.find((p) => p.klass === klass && p.section === section && p.shift === shift) ?? parsed.find((p) => p.klass === klass);

  const pickClass = (v: string) => {
    setKlass(v);
    const p = parsed.find((x) => x.klass === v);
    setSection(p?.section ?? "");
    setShift(p?.shift ?? "");
  };
  const pickSection = (v: string) => {
    setSection(v);
    setShift(parsed.find((x) => x.klass === klass && x.section === v)?.shift ?? "");
  };
  const print = () => {
    document.body.dataset.printing = "routine";
    const done = () => {
      delete document.body.dataset.printing;
      window.removeEventListener("afterprint", done);
    };
    window.addEventListener("afterprint", done);
    window.print();
  };

  if (!first) return <p className="mt-6 text-muted">{labels.none}</p>;
  const select = "min-h-11 w-full border border-line-strong bg-surface px-3 text-ink focus:border-leaf-600 disabled:opacity-70";
  const field = (label: string, value: string, opts: string[], on: (v: string) => void) => (
    <label className="block text-sm">
      <span className="eyebrow text-subheading">{label}</span>
      <select className={`${select} mt-1.5`} value={value} onChange={(e) => on(e.target.value)} disabled={opts.length < 2}>
        {opts.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
  return (
    <div className="mt-6">
      <div className="print-hide grid items-end gap-4 border-t-2 border-navy-800 pt-5 sm:grid-cols-[repeat(3,minmax(0,1fr))_auto] dark:border-navy-300">
        {field(labels.klass, klass, classes, pickClass)}
        {sections.length > 0 && field(labels.section, section, sections, pickSection)}
        {shifts.length > 0 && field(labels.shift, shift, shifts, setShift)}
        <button type="button" onClick={print} className={buttonClasses("outline")}>
          <Printer aria-hidden className="size-4" />
          {labels.print}
        </button>
      </div>
      {match && (
        <div className="mt-6 border border-line bg-surface" aria-live="polite">
          <p className="border-b border-line bg-paper px-4 py-3 font-serif text-lg font-semibold text-heading">{match.r.title}</p>
          <RoutineGrid rows={match.r.rows} rowsEn={match.r.rowsEn} labels={{ ...grid, title: match.r.title, caption: `${labels.caption} ${match.r.title}` }} />
        </div>
      )}
    </div>
  );
}
