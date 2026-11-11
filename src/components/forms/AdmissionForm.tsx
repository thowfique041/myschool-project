"use client";

import { useI18n } from "@/i18n/client";
import type { Dictionary } from "@/i18n/dict";
import { term } from "@/content/bn";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, Loader2, Printer, RotateCcw } from "lucide-react";
import { Field, SelectInput, TextArea, TextInput, isBdPhone, isEmail } from "@/components/ui/fields";
import { buttonClasses } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Values = {
  studentName: string;
  dob: string;
  gender: string;
  classApplied: string;
  shift: string;
  previousSchool: string;
  guardianName: string;
  relation: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  studentName: "",
  dob: "",
  gender: "",
  classApplied: "",
  shift: "",
  previousSchool: "",
  guardianName: "",
  relation: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
  consent: false,
};

const needsPreviousSchool = (cls: string) => !["", "Play", "Nursery", "Class 1"].includes(cls);

function validate(v: Values, t: Dictionary): Errors {
  const m = t.admissionForm.errors;
  const e: Errors = {};
  if (v.studentName.trim().length < 3) e.studentName = m.studentName;
  if (!v.dob) e.dob = m.dob;
  else {
    const year = Number(v.dob.slice(0, 4));
    if (year < 2004 || year > 2023) e.dob = m.dobYear;
  }
  if (!v.gender) e.gender = m.gender;
  if (!v.classApplied) e.classApplied = m.classApplied;
  if (!v.shift) e.shift = m.shift;
  if (needsPreviousSchool(v.classApplied) && v.previousSchool.trim().length < 3)
    e.previousSchool = m.previousSchool;
  if (v.guardianName.trim().length < 3) e.guardianName = m.guardianName;
  if (!v.relation) e.relation = m.relation;
  if (!isBdPhone(v.phone)) e.phone = t.form.phoneInvalid;
  if (v.email && !isEmail(v.email)) e.email = m.email;
  if (v.address.trim().length < 8) e.address = m.address;
  if (!v.consent) e.consent = m.consent;
  return e;
}

export function AdmissionForm({ classOptions, open = true }: { classOptions: string[]; open?: boolean }) {
  const { t, lang } = useI18n();
  const a = t.admissionForm;
  const T = (v: string) => (lang === "bn" ? term(v) : v);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "review" | "submitting" | "done">("idle");
  const [reference, setReference] = useState("");
  const [formError, setFormError] = useState("");
  const reduce = useReducedMotion();

  const set =
    <K extends keyof Values>(k: K) =>
    (e: { target: { value: string; checked?: boolean; type?: string } }) => {
      const value = (e.target.type === "checkbox" ? Boolean(e.target.checked) : e.target.value) as Values[K];
      setValues((v) => ({ ...v, [k]: value }));
      if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values, t);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setFormError("");
    setStatus("review");
    requestAnimationFrame(() => document.getElementById("admission-review")?.focus());
  }

  async function confirm() {
    setStatus("submitting");
    // Frontend-only: nothing is sent to a server.
    await new Promise((r) => setTimeout(r, 900));
    setReference(`WSC-27-${Math.floor(100000 + Math.random() * 900000)}`);
    setStatus("done");
  }

  const shiftLabel = a.shifts[["Morning", "Day", "No preference"].indexOf(values.shift)] ?? values.shift;
  const rows: [string, string][] = [
    [a.studentName, values.studentName],
    [a.dob, values.dob],
    [a.gender, a.genders[["Male", "Female"].indexOf(values.gender)] ?? values.gender],
    [a.classApplied, T(values.classApplied)],
    [a.shift, shiftLabel],
    [a.previousSchool, values.previousSchool],
    [a.guardianName, values.guardianName],
    [a.relation, a.relations[["Father", "Mother", "Legal guardian"].indexOf(values.relation)] ?? values.relation],
    [a.phone, values.phone],
    [a.email, values.email],
    [a.address, values.address],
    [a.notes, values.notes],
  ];
  const summary = (
    <dl className="mt-6 grid border-t-2 border-navy-800 sm:grid-cols-2 dark:border-navy-300">
      {rows.map(([k, v]) => (
        <div key={k} className="border-b border-line py-3 sm:odd:pr-6 sm:even:pl-6">
          <dt className="text-xs text-muted">{k}</dt>
          <dd className={cn("mt-0.5 font-medium break-words", v ? "text-heading" : "text-muted italic")}>{v || a.none}</dd>
        </div>
      ))}
    </dl>
  );
  const print = () => {
    document.body.dataset.printing = "admission";
    const done = () => {
      delete document.body.dataset.printing;
      window.removeEventListener("afterprint", done);
    };
    window.addEventListener("afterprint", done);
    window.print();
  };

  if (status === "review" || status === "submitting") {
    return (
      <div id="admission-review" tabIndex={-1} className="border-t-4 border-leaf-600 bg-surface p-6 outline-none sm:p-8 dark:border-accent">
        <p className="text-sm font-semibold text-accent">{a.review}</p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-heading">{a.reviewTitle}</h3>
        <p className="mt-1 text-muted">{a.reviewText}</p>
        {summary}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button type="button" onClick={() => setStatus("idle")} className={buttonClasses("outline")} disabled={status === "submitting"}>
            {a.edit}
          </button>
          <button type="button" onClick={confirm} className={buttonClasses("secondary")} disabled={status === "submitting"}>
            {status === "submitting" && <Loader2 aria-hidden className="size-4 animate-spin" />}
            {status === "submitting" ? t.form.submitting : a.confirm}
          </button>
        </div>
      </div>
    );
  }

  if (status === "done") {
    return (
      <motion.div
        role="status"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        id="admission-summary"
        className="border-t-4 border-leaf-600 bg-surface p-6 sm:p-8 dark:border-accent"
      >
        <p className="flex items-center gap-2 text-sm font-semibold text-accent">
          <CheckCircle2 aria-hidden className="size-4" />
          {a.summaryTitle}
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-heading">{a.doneTitle}</h3>
        <p className="mt-2 text-muted">
          {a.doneText}
        </p>
        <p className="mt-5 text-sm">
          <span className="text-muted">{a.reference}: </span>
          <span className="font-mono font-semibold text-heading">{reference}</span>
          <span className="text-muted"> · {a.dateLabel}: </span>
          <span className="font-semibold text-heading">{new Date().toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
        </p>
        {summary}
        <p className="mt-5 text-sm text-muted">
          {a.nextStep}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={print} className={cn(buttonClasses("outline"), "print-hide")}>
            <Printer aria-hidden className="size-4" /> {a.printSummary}
          </button>
          <button
            type="button"
            onClick={() => {
              setValues(empty);
              setErrors({});
              setStatus("idle");
            }}
            className={cn(buttonClasses("ghost"), "print-hide")}
          >
            <RotateCcw aria-hidden className="size-4" /> {a.newApplication}
          </button>
        </div>
      </motion.div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  // Numbered group headings with a ruled line, as in the rest of the site.
  const legend = "mb-5 w-full border-b-2 border-navy-800 pb-2 font-serif text-xl font-semibold text-heading dark:border-navy-300";

  return (
    !open ? (
      <div className="border border-line bg-surface p-6 text-muted">
        {a.closed}
      </div>
    ) : <form noValidate onSubmit={onSubmit} className="space-y-8">
      {errorCount > 0 && (
        <p role="alert" className="border-l-4 border-signal-600 bg-signal-50 px-4 py-3 text-sm text-danger">
          {t.form.fixFields} ({lang === "bn" ? errorCount.toLocaleString("bn-BD") : errorCount})
        </p>
      )}

      <fieldset>
        <legend className={legend}>{a.student}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={a.studentName} name="studentName" required error={errors.studentName} className="sm:col-span-2">
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} value={values.studentName} onChange={set("studentName")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
          <Field label={a.dob} name="dob" required error={errors.dob} hint={a.dobHint}>
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} type="date" value={values.dob} onChange={set("dob")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
          <Field label={a.gender} name="gender" required error={errors.gender}>
            {({ id, describedBy, invalid }) => (
              <SelectInput id={id} value={values.gender} onChange={set("gender")} aria-describedby={describedBy} invalid={invalid}>
                <option value="">{t.form.select}</option>
                <option value="Male">{a.genders[0]}</option>
                <option value="Female">{a.genders[1]}</option>
              </SelectInput>
            )}
          </Field>
          <Field label={a.classApplied} name="classApplied" required error={errors.classApplied}>
            {({ id, describedBy, invalid }) => (
              <SelectInput id={id} value={values.classApplied} onChange={set("classApplied")} aria-describedby={describedBy} invalid={invalid}>
                <option value="">{a.selectClass}</option>
                {classOptions.map((c) => (
                  <option key={c} value={c}>
                    {T(c)}
                  </option>
                ))}
              </SelectInput>
            )}
          </Field>
          <Field label={a.shift} name="shift" required error={errors.shift}>
            {({ id, describedBy, invalid }) => (
              <SelectInput id={id} value={values.shift} onChange={set("shift")} aria-describedby={describedBy} invalid={invalid}>
                <option value="">{a.selectShift}</option>
                <option value="Morning">{a.shifts[0]}</option>
                <option value="Day">{a.shifts[1]}</option>
                <option value="No preference">{a.shifts[2]}</option>
              </SelectInput>
            )}
          </Field>
          <Field
            label={a.previousSchool}
            name="previousSchool"
            required={needsPreviousSchool(values.classApplied)}
            error={errors.previousSchool}
            className="sm:col-span-2"
            hint={a.previousSchoolHint}
          >
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} value={values.previousSchool} onChange={set("previousSchool")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className={legend}>{a.guardian}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={a.guardianName} name="guardianName" required error={errors.guardianName}>
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} autoComplete="name" value={values.guardianName} onChange={set("guardianName")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
          <Field label={a.relation} name="relation" required error={errors.relation}>
            {({ id, describedBy, invalid }) => (
              <SelectInput id={id} value={values.relation} onChange={set("relation")} aria-describedby={describedBy} invalid={invalid}>
                <option value="">{t.form.select}</option>
                <option value="Father">{a.relations[0]}</option>
                <option value="Mother">{a.relations[1]}</option>
                <option value="Legal guardian">{a.relations[2]}</option>
              </SelectInput>
            )}
          </Field>
          <Field label={a.phone} name="phone" required error={errors.phone}>
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" value={values.phone} onChange={set("phone")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
          <Field label={a.email} name="email" error={errors.email}>
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
          <Field label={a.address} name="address" required error={errors.address} className="sm:col-span-2">
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} autoComplete="street-address" value={values.address} onChange={set("address")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className={legend}>{a.additional}</legend>
        <Field label={a.notes} name="notes">
          {({ id, describedBy }) => <TextArea id={id} rows={3} value={values.notes} onChange={set("notes")} aria-describedby={describedBy} />}
        </Field>
      <div className="mt-5">
        <label className={cn("flex items-start gap-3 text-sm", errors.consent ? "text-danger" : "text-ink")}>
          <input
            id="f-consent"
            type="checkbox"
            checked={values.consent}
            onChange={set("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "f-consent-error" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-leaf-600"
          />
          {a.consent}
        </label>
        {errors.consent && (
          <p id="f-consent-error" className="mt-1 pl-8 text-xs font-medium text-danger">
            {errors.consent}
          </p>
        )}
      </div>
      </fieldset>

      {formError && (
        <p role="alert" className="border border-signal-100 bg-signal-50 px-4 py-3 text-sm text-danger">
          {formError}
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">{a.requiredNote}</p>
        <button type="submit" className={buttonClasses("secondary")}>
          {a.review}
        </button>
      </div>
    </form>
  );
}
