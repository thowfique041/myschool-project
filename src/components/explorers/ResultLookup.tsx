"use client";

import { useI18n } from "@/i18n/client";
import { term } from "@/content/bn";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, Loader2, Printer, Search } from "lucide-react";
import { Field, SelectInput, TextInput } from "@/components/ui/fields";
import { Badge, buttonClasses } from "@/components/ui/primitives";
import { mockResults } from "@/data/results";
import type { ResultOptions } from "@/content/site-content";
import type { StudentResult } from "@/types";
import { cn, num } from "@/lib/utils";

type Query = { className: string; examId: string; roll: string };
type State = { kind: "idle" } | { kind: "loading" } | { kind: "found"; result: StudentResult } | { kind: "notfound"; query: Query };

export function ResultLookup({ options, isDemo }: { options: ResultOptions; isDemo: boolean }) {
  const [q, setQ] = useState<Query>({ className: options.classes.includes("Class 8") ? "Class 8" : options.classes[0] ?? "", examId: options.exams[0]?.id ?? "", roll: "" });
  const [error, setError] = useState("");
  const { t, lang } = useI18n();
  const T = (v: string) => (lang === "bn" ? term(v) : v);
  const N = (v: string | number) => num(v, lang);
  const examLabel = (id: string) => options.exams.find((e) => e.id === id)?.label ?? "";
  const [rollError, setRollError] = useState<string>();
  const [state, setState] = useState<State>({ kind: "idle" });
  const reduce = useReducedMotion();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const roll = q.roll.trim();
    if (!/^\d{1,6}$/.test(roll)) {
      setRollError(t.results.rollError);
      document.getElementById("f-roll")?.focus();
      return;
    }
    setRollError(undefined);
    setState({ kind: "loading" });
    setError("");
    try {
      await new Promise((r) => setTimeout(r, 500));
      const [exam, year] = q.examId.split("|");
      const result = mockResults.find((r) => r.exam === exam && r.year === year && r.className === q.className && r.roll === roll);
      setState(result ? { kind: "found", result } : { kind: "notfound", query: { ...q, roll } });
    } catch {
      setError(t.results.loadError);
      setState({ kind: "idle" });
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      <form noValidate onSubmit={onSubmit} className="h-fit space-y-4 border border-line bg-surface p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-heading">{t.results.searchTitle}</h3>
          {isDemo && <Badge tone="gold">{t.common.demoData}</Badge>}
        </div>
        <Field label={t.results.class} name="className">
          {({ id }) => (
            <SelectInput id={id} value={q.className} onChange={(e) => setQ({ ...q, className: e.target.value })}>
              {options.classes.map((c) => (
                <option key={c} value={c}>
                  {options.classLabels[c] ?? c}
                </option>
              ))}
            </SelectInput>
          )}
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t.results.exam} name="exam" className="col-span-2">
            {({ id }) => (
              <SelectInput id={id} value={q.examId} onChange={(e) => setQ({ ...q, examId: e.target.value })}>
                {options.exams.length === 0 && <option value="">{t.results.noExams}</option>}
                {options.exams.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </SelectInput>
            )}
          </Field>
          <Field label={t.results.roll} name="roll" required error={rollError} className="col-span-2">
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} inputMode="numeric" placeholder={t.results.rollPlaceholder} value={q.roll} onChange={(e) => setQ({ ...q, roll: e.target.value })} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
        </div>
        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
        <button type="submit" disabled={state.kind === "loading" || !q.examId} className={cn(buttonClasses("primary"), "w-full")}>
          {state.kind === "loading" ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Search aria-hidden className="size-4" />}
          {state.kind === "loading" ? t.results.searching : t.results.view}
        </button>
      </form>

      <div aria-live="polite" className="min-h-64 min-w-0">
        <AnimatePresence mode="wait">
          {state.kind === "idle" && (
            <motion.div key="idle" initial={false} exit={{ opacity: 0 }} className="flex h-full min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-line bg-surface p-8 text-center">
              <Search aria-hidden className="size-8 text-navy-200" />
              <p className="mt-3 font-semibold text-heading">{t.results.idleTitle}</p>
              <p className="mt-1 max-w-sm text-sm text-muted">{t.results.idleText}</p>
            </motion.div>
          )}
          {state.kind === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 border border-line bg-surface p-6">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 animate-pulse rounded bg-paper-dark" style={{ width: `${90 - i * 12}%` }} />
              ))}
              <span className="sr-only">{t.results.loading}</span>
            </motion.div>
          )}
          {state.kind === "notfound" && (
            <motion.div key="nf" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="flex gap-3 border border-signal-100 bg-signal-50 p-6">
              <AlertCircle aria-hidden className="size-6 shrink-0 text-danger" />
              <div>
                <p className="font-semibold text-danger">{t.results.notFound}</p>
                <p className="mt-1 text-sm text-ink">
                  {t.results.notFoundText(state.query.roll, options.classLabels[state.query.className] ?? state.query.className, examLabel(state.query.examId))}
                </p>
              </div>
            </motion.div>
          )}
          {state.kind === "found" && (
            <motion.article
              key={state.result.registration}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden border border-line bg-surface"
            >
              <header className="flex flex-wrap items-start justify-between gap-4 bg-navy-900 px-6 py-5 text-white">
                <div>
                  <p className="text-xs text-navy-200">
                    {T(state.result.exam)} {N(state.result.year)}
                  </p>
                  <h3 className="mt-0.5 text-lg font-semibold">{lang === "bn" && state.result.nameBn ? state.result.nameBn : state.result.name}</h3>
                  <p className="text-sm text-navy-200">
                    {T(state.result.className)} · {t.results.section} {state.result.section}
                    {state.result.group && ` · ${T(state.result.group)}`} · {t.results.roll} {state.result.roll}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-navy-200">{t.results.gpa}</p>
                  <p className="font-serif text-3xl font-semibold">{N(state.result.gpa.toFixed(2))}</p>
                  {state.result.position && <p className="text-xs text-navy-200">{t.results.merit} {N(state.result.position)}</p>}
                </div>
              </header>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[28rem] text-left text-sm">
                  <thead className="border-b border-line text-xs text-muted uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3 font-semibold">{t.results.subject}</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">{t.results.marks}</th>
                      <th scope="col" className="px-4 py-3 text-center font-semibold">{t.results.grade}</th>
                      <th scope="col" className="px-6 py-3 text-right font-semibold">{t.results.point}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {state.result.subjects.map((s) => (
                      <tr key={s.subject}>
                        <th scope="row" className="px-6 py-2.5 font-medium text-ink">
                          {T(s.subject)}
                        </th>
                        <td className="px-4 py-2.5 text-right tabular-nums">{N(s.marks)}</td>
                        <td className="px-4 py-2.5 text-center font-semibold text-heading">{s.grade}</td>
                        <td className="px-6 py-2.5 text-right tabular-nums">{N(s.point.toFixed(2))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper px-6 py-4">
                <p className="text-xs text-muted">
                  {t.results.registration} {state.result.registration}
                  {isDemo && t.results.demoRecord}
                </p>
                <button type="button" onClick={() => window.print()} className={buttonClasses("outline", "sm")}>
                  <Printer aria-hidden className="size-4" /> {t.common.print}
                </button>
              </footer>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
