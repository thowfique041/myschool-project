"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, Loader2, Printer, Search } from "lucide-react";
import { Field, SelectInput, TextInput } from "@/components/ui/fields";
import { Badge, buttonClasses } from "@/components/ui/primitives";
import { mockResults } from "@/data/results";
import type { ResultOptions } from "@/content/site-content";
import type { StudentResult } from "@/types";
import { cn } from "@/lib/utils";

type Query = { className: string; examId: string; roll: string };
type State = { kind: "idle" } | { kind: "loading" } | { kind: "found"; result: StudentResult } | { kind: "notfound"; query: Query };

export function ResultLookup({ options, isDemo }: { options: ResultOptions; isDemo: boolean }) {
  const [q, setQ] = useState<Query>({ className: options.classes.includes("Class 8") ? "Class 8" : options.classes[0] ?? "", examId: options.exams[0]?.id ?? "", roll: "" });
  const [error, setError] = useState("");
  const examLabel = (id: string) => options.exams.find((e) => e.id === id)?.label ?? "";
  const [rollError, setRollError] = useState<string>();
  const [state, setState] = useState<State>({ kind: "idle" });
  const reduce = useReducedMotion();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const roll = q.roll.trim();
    if (!/^\d{1,6}$/.test(roll)) {
      setRollError("Enter a roll number using digits only (e.g. 101).");
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
      setError("The result could not be loaded. Please check your connection and try again.");
      setState({ kind: "idle" });
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      <form noValidate onSubmit={onSubmit} className="h-fit space-y-4 rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-navy-900">Search a result</h3>
          {isDemo && <Badge tone="gold">Demo data</Badge>}
        </div>
        <Field label="Class" name="className">
          {({ id }) => (
            <SelectInput id={id} value={q.className} onChange={(e) => setQ({ ...q, className: e.target.value })}>
              {options.classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </SelectInput>
          )}
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Examination" name="exam" className="col-span-2">
            {({ id }) => (
              <SelectInput id={id} value={q.examId} onChange={(e) => setQ({ ...q, examId: e.target.value })}>
                {options.exams.length === 0 && <option value="">No results published yet</option>}
                {options.exams.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </SelectInput>
            )}
          </Field>
          <Field label="Roll" name="roll" required error={rollError} className="col-span-2">
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} inputMode="numeric" placeholder="e.g. 101" value={q.roll} onChange={(e) => setQ({ ...q, roll: e.target.value })} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
        </div>
        {error && (
          <p role="alert" className="text-sm text-signal-700">
            {error}
          </p>
        )}
        <button type="submit" disabled={state.kind === "loading" || !q.examId} className={cn(buttonClasses("primary"), "w-full")}>
          {state.kind === "loading" ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Search aria-hidden className="size-4" />}
          {state.kind === "loading" ? "Searching…" : "View result"}
        </button>
        {isDemo && (
          <p className="text-xs leading-relaxed text-muted">
            Try <strong>Class 8 · Half-Yearly 2026 · Roll 101</strong> or <strong>Class 9 · Roll 205</strong>. No real student records are used.
          </p>
        )}
      </form>

      <div aria-live="polite" className="min-h-64 min-w-0">
        <AnimatePresence mode="wait">
          {state.kind === "idle" && (
            <motion.div key="idle" initial={false} exit={{ opacity: 0 }} className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white p-8 text-center">
              <Search aria-hidden className="size-8 text-navy-200" />
              <p className="mt-3 font-semibold text-navy-900">Your result will appear here</p>
              <p className="mt-1 max-w-sm text-sm text-muted">Choose the class, examination and year, then enter the roll number.</p>
            </motion.div>
          )}
          {state.kind === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 rounded-2xl border border-line bg-white p-6">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 animate-pulse rounded bg-paper-dark" style={{ width: `${90 - i * 12}%` }} />
              ))}
              <span className="sr-only">Loading result</span>
            </motion.div>
          )}
          {state.kind === "notfound" && (
            <motion.div key="nf" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="flex gap-3 rounded-2xl border border-signal-100 bg-signal-50 p-6">
              <AlertCircle aria-hidden className="size-6 shrink-0 text-signal-600" />
              <div>
                <p className="font-semibold text-signal-700">No result found</p>
                <p className="mt-1 text-sm text-ink">
                  No published result was found for roll {state.query.roll}, {state.query.className}, {examLabel(state.query.examId)}. Please
                  check the details and try again.
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
              className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)]"
            >
              <header className="flex flex-wrap items-start justify-between gap-4 bg-navy-900 px-6 py-5 text-white">
                <div>
                  <p className="text-xs text-navy-200">
                    {state.result.exam} {state.result.year}
                  </p>
                  <h3 className="mt-0.5 text-lg font-semibold">{state.result.name}</h3>
                  <p className="text-sm text-navy-200">
                    {state.result.className} · Section {state.result.section}
                    {state.result.group && ` · ${state.result.group}`} · Roll {state.result.roll}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-navy-200">GPA</p>
                  <p className="font-serif text-3xl font-semibold">{state.result.gpa.toFixed(2)}</p>
                  {state.result.position && <p className="text-xs text-leaf-200">Merit position: {state.result.position}</p>}
                </div>
              </header>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[28rem] text-left text-sm">
                  <thead className="border-b border-line text-xs text-muted uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3 font-semibold">Subject</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">Marks</th>
                      <th scope="col" className="px-4 py-3 text-center font-semibold">Grade</th>
                      <th scope="col" className="px-6 py-3 text-right font-semibold">Point</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {state.result.subjects.map((s) => (
                      <tr key={s.subject}>
                        <th scope="row" className="px-6 py-2.5 font-medium text-ink">
                          {s.subject}
                        </th>
                        <td className="px-4 py-2.5 text-right tabular-nums">{s.marks}</td>
                        <td className="px-4 py-2.5 text-center font-semibold text-navy-900">{s.grade}</td>
                        <td className="px-6 py-2.5 text-right tabular-nums">{s.point.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper px-6 py-4">
                <p className="text-xs text-muted">
                  Registration {state.result.registration}
                  {isDemo && " · Demonstration record — not a real student."}
                </p>
                <button type="button" onClick={() => window.print()} className={buttonClasses("outline", "sm")}>
                  <Printer aria-hidden className="size-4" /> Print
                </button>
              </footer>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
