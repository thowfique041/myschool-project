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
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
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
    setStatus("submitting");
    setFormError("");
    // Frontend-only: nothing is sent to a server.
    await new Promise((r) => setTimeout(r, 900));
    setReference(`WSC-27-${Math.floor(100000 + Math.random() * 900000)}`);
    setStatus("done");
  }

  if (status === "done") {
    return (
      <motion.div
        role="status"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-md border border-leaf-200 bg-surface p-6 sm:p-8"
      >
        <CheckCircle2 aria-hidden className="size-10 text-accent" />
        <h3 className="mt-4 font-serif text-2xl font-semibold text-heading">{a.doneTitle}</h3>
        <p className="mt-2 text-muted">
          {a.doneText}
        </p>
        <dl className="mt-6 grid gap-x-8 gap-y-3 rounded-md bg-paper p-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">{a.reference}</dt>
            <dd className="font-mono font-semibold text-heading">{reference}</dd>
          </div>
          <div>
            <dt className="text-muted">{a.studentLabel}</dt>
            <dd className="font-semibold text-heading">{values.studentName}</dd>
          </div>
          <div>
            <dt className="text-muted">{a.classLabel}</dt>
            <dd className="font-semibold text-heading">
              {T(values.classApplied)} · {a.shifts[["Morning", "Day", "No preference"].indexOf(values.shift)] ?? values.shift}
            </dd>
          </div>
          <div>
            <dt className="text-muted">{a.guardianContact}</dt>
            <dd className="font-semibold text-heading">{values.phone}</dd>
          </div>
        </dl>
        <p className="mt-5 text-sm text-muted">
          {a.nextStep}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => window.print()} className={buttonClasses("outline")}>
            <Printer aria-hidden className="size-4" /> {a.printSummary}
          </button>
          <button
            type="button"
            onClick={() => {
              setValues(empty);
              setStatus("idle");
            }}
            className={buttonClasses("ghost")}
          >
            <RotateCcw aria-hidden className="size-4" /> {a.newApplication}
          </button>
        </div>
      </motion.div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    !open ? (
      <div className="rounded-md border border-line bg-surface p-6 text-muted">
        {a.closed}
      </div>
    ) : <form noValidate onSubmit={onSubmit} className="space-y-8">
      {errorCount > 0 && (
        <p role="alert" className="rounded-lg border border-signal-100 bg-signal-50 px-4 py-3 text-sm text-danger">
          {t.form.fixFields}
        </p>
      )}

      <fieldset>
        <legend className="mb-4 font-serif text-lg font-semibold text-heading">{a.student}</legend>
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
        <legend className="mb-4 font-serif text-lg font-semibold text-heading">{a.guardian}</legend>
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
          <Field label={a.notes} name="notes" className="sm:col-span-2">
            {({ id, describedBy }) => <TextArea id={id} rows={3} value={values.notes} onChange={set("notes")} aria-describedby={describedBy} />}
          </Field>
        </div>
      </fieldset>

      <div>
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

      {formError && (
        <p role="alert" className="rounded-lg border border-signal-100 bg-signal-50 px-4 py-3 text-sm text-danger">
          {formError}
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">{a.requiredNote}</p>
        <button type="submit" disabled={status === "submitting"} className={buttonClasses("secondary")}>
          {status === "submitting" && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {status === "submitting" ? t.form.submitting : a.submit}
        </button>
      </div>
    </form>
  );
}
