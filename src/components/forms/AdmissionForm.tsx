"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, Loader2, Printer, RotateCcw } from "lucide-react";
import { Field, SelectInput, TextArea, TextInput, isBdPhone, isEmail } from "@/components/ui/fields";
import { buttonClasses } from "@/components/ui/primitives";
import { classOptions } from "@/data/admission";
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

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.studentName.trim().length < 3) e.studentName = "Enter the student's full name.";
  if (!v.dob) e.dob = "Enter the date of birth.";
  else {
    const year = Number(v.dob.slice(0, 4));
    if (year < 2004 || year > 2023) e.dob = "Please check the year of birth.";
  }
  if (!v.gender) e.gender = "Select one.";
  if (!v.classApplied) e.classApplied = "Select the class you are applying for.";
  if (!v.shift) e.shift = "Select a preferred shift.";
  if (needsPreviousSchool(v.classApplied) && v.previousSchool.trim().length < 3)
    e.previousSchool = "Previous school is required for Class 2 and above.";
  if (v.guardianName.trim().length < 3) e.guardianName = "Enter the guardian's name.";
  if (!v.relation) e.relation = "Select the relationship.";
  if (!isBdPhone(v.phone)) e.phone = "Enter a valid Bangladeshi mobile number, e.g. 01712345678.";
  if (v.email && !isEmail(v.email)) e.email = "Enter a valid email or leave it empty.";
  if (v.address.trim().length < 8) e.address = "Enter the present address.";
  if (!v.consent) e.consent = "Please confirm before submitting.";
  return e;
}

export function AdmissionForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [reference, setReference] = useState("");
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
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
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
        className="rounded-2xl border border-leaf-200 bg-white p-6 sm:p-8"
      >
        <CheckCircle2 aria-hidden className="size-10 text-leaf-600" />
        <h3 className="mt-4 font-serif text-2xl font-semibold text-navy-900">Application recorded (demo)</h3>
        <p className="mt-2 text-muted">
          This is a frontend demonstration. Nothing has been sent to the school, and no data has been stored.
        </p>
        <dl className="mt-6 grid gap-x-8 gap-y-3 rounded-xl bg-paper p-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Demo reference</dt>
            <dd className="font-mono font-semibold text-navy-900">{reference}</dd>
          </div>
          <div>
            <dt className="text-muted">Student</dt>
            <dd className="font-semibold text-navy-900">{values.studentName}</dd>
          </div>
          <div>
            <dt className="text-muted">Class applied</dt>
            <dd className="font-semibold text-navy-900">
              {values.classApplied} · {values.shift}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Guardian contact</dt>
            <dd className="font-semibold text-navy-900">{values.phone}</dd>
          </div>
        </dl>
        <p className="mt-5 text-sm text-muted">
          On a live website, the next step would be to submit the printed form with the required documents at the school office
          before the deadline.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => window.print()} className={buttonClasses("outline")}>
            <Printer aria-hidden className="size-4" /> Print summary
          </button>
          <button
            type="button"
            onClick={() => {
              setValues(empty);
              setStatus("idle");
            }}
            className={buttonClasses("ghost")}
          >
            <RotateCcw aria-hidden className="size-4" /> Start a new application
          </button>
        </div>
      </motion.div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-8">
      {errorCount > 0 && (
        <p role="alert" className="rounded-lg border border-signal-100 bg-signal-50 px-4 py-3 text-sm text-signal-700">
          {errorCount === 1 ? "1 field needs" : `${errorCount} fields need`} your attention.
        </p>
      )}

      <fieldset>
        <legend className="mb-4 font-serif text-lg font-semibold text-navy-900">Student information</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Student's full name" name="studentName" required error={errors.studentName} className="sm:col-span-2">
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} value={values.studentName} onChange={set("studentName")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
          <Field label="Date of birth" name="dob" required error={errors.dob} hint="As written on the birth registration certificate.">
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} type="date" value={values.dob} onChange={set("dob")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
          <Field label="Gender" name="gender" required error={errors.gender}>
            {({ id, describedBy, invalid }) => (
              <SelectInput id={id} value={values.gender} onChange={set("gender")} aria-describedby={describedBy} invalid={invalid}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </SelectInput>
            )}
          </Field>
          <Field label="Class applying for" name="classApplied" required error={errors.classApplied}>
            {({ id, describedBy, invalid }) => (
              <SelectInput id={id} value={values.classApplied} onChange={set("classApplied")} aria-describedby={describedBy} invalid={invalid}>
                <option value="">Select class</option>
                {classOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </SelectInput>
            )}
          </Field>
          <Field label="Preferred shift" name="shift" required error={errors.shift}>
            {({ id, describedBy, invalid }) => (
              <SelectInput id={id} value={values.shift} onChange={set("shift")} aria-describedby={describedBy} invalid={invalid}>
                <option value="">Select shift</option>
                <option>Morning</option>
                <option>Day</option>
                <option>No preference</option>
              </SelectInput>
            )}
          </Field>
          <Field
            label="Previous school"
            name="previousSchool"
            required={needsPreviousSchool(values.classApplied)}
            error={errors.previousSchool}
            className="sm:col-span-2"
            hint="Required for Class 2 and above."
          >
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} value={values.previousSchool} onChange={set("previousSchool")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-4 font-serif text-lg font-semibold text-navy-900">Guardian information</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Guardian's name" name="guardianName" required error={errors.guardianName}>
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} autoComplete="name" value={values.guardianName} onChange={set("guardianName")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
          <Field label="Relationship" name="relation" required error={errors.relation}>
            {({ id, describedBy, invalid }) => (
              <SelectInput id={id} value={values.relation} onChange={set("relation")} aria-describedby={describedBy} invalid={invalid}>
                <option value="">Select</option>
                <option>Father</option>
                <option>Mother</option>
                <option>Legal guardian</option>
              </SelectInput>
            )}
          </Field>
          <Field label="Mobile number" name="phone" required error={errors.phone}>
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" value={values.phone} onChange={set("phone")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
          <Field label="Email (optional)" name="email" error={errors.email}>
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
          <Field label="Present address" name="address" required error={errors.address} className="sm:col-span-2">
            {({ id, describedBy, invalid }) => (
              <TextInput id={id} autoComplete="street-address" value={values.address} onChange={set("address")} aria-describedby={describedBy} invalid={invalid} />
            )}
          </Field>
          <Field label="Anything we should know? (optional)" name="notes" className="sm:col-span-2">
            {({ id, describedBy }) => <TextArea id={id} rows={3} value={values.notes} onChange={set("notes")} aria-describedby={describedBy} />}
          </Field>
        </div>
      </fieldset>

      <div>
        <label className={cn("flex items-start gap-3 text-sm", errors.consent ? "text-signal-700" : "text-ink")}>
          <input
            id="f-consent"
            type="checkbox"
            checked={values.consent}
            onChange={set("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "f-consent-error" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-leaf-600"
          />
          I confirm the information is correct and understand this is a demonstration form that does not submit to the school.
        </label>
        {errors.consent && (
          <p id="f-consent-error" className="mt-1 pl-8 text-xs font-medium text-signal-700">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">Fields marked * are required.</p>
        <button type="submit" disabled={status === "submitting"} className={buttonClasses("secondary")}>
          {status === "submitting" && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {status === "submitting" ? "Submitting…" : "Submit application"}
        </button>
      </div>
    </form>
  );
}
