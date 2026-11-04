"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Field, SelectInput, TextArea, TextInput, isBdPhone, isEmail } from "@/components/ui/fields";
import { buttonClasses } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Values = { name: string; phone: string; email: string; topic: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: "", phone: "", email: "", topic: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 3) e.name = "Please enter your full name.";
  if (!isBdPhone(v.phone)) e.phone = "Enter a valid Bangladeshi mobile number, e.g. 01712345678.";
  if (v.email && !isEmail(v.email)) e.email = "Enter a valid email address or leave it empty.";
  if (!v.topic) e.topic = "Please choose a topic.";
  if (v.message.trim().length < 15) e.message = "Please write at least 15 characters.";
  return e;
}

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState("");

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
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
    setStatus("sending");
    setFormError("");
    // Frontend-only: nothing is sent to a server.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="rounded-[var(--radius-card)] border border-leaf-200 bg-leaf-50 p-6"
        >
          <CheckCircle2 aria-hidden className="size-8 text-leaf-600" />
          <h3 className="mt-3 text-lg font-semibold text-navy-900">Thank you, {values.name.split(" ")[0]}.</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Your message has been recorded in this demonstration. On a live site the office would reply within two working days.
            <strong className="block pt-2 text-ink">No data was sent anywhere — this form is frontend-only.</strong>
          </p>
          <button
            type="button"
            className={cn(buttonClasses("outline", "sm"), "mt-4")}
            onClick={() => {
              setValues(empty);
              setStatus("idle");
            }}
          >
            Send another message
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4" aria-describedby="contact-form-note">
      {Object.keys(errors).some((k) => errors[k as keyof Values]) && (
        <p role="alert" className="rounded-lg border border-signal-100 bg-signal-50 px-4 py-2.5 text-sm text-signal-700">
          Please correct the highlighted fields.
        </p>
      )}
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field label="Full name" name="name" required error={errors.name}>
          {({ id, describedBy, invalid }) => (
            <TextInput id={id} name="name" autoComplete="name" value={values.name} onChange={set("name")} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
        <Field label="Mobile number" name="phone" required error={errors.phone}>
          {({ id, describedBy, invalid }) => (
            <TextInput id={id} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" value={values.phone} onChange={set("phone")} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
        <Field label="Email (optional)" name="email" error={errors.email}>
          {({ id, describedBy, invalid }) => (
            <TextInput id={id} name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
        <Field label="Topic" name="topic" required error={errors.topic}>
          {({ id, describedBy, invalid }) => (
            <SelectInput id={id} name="topic" value={values.topic} onChange={set("topic")} aria-describedby={describedBy} invalid={invalid}>
              <option value="">Select a topic</option>
              <option>Admission</option>
              <option>Academic / Results</option>
              <option>Fees & payments</option>
              <option>Certificates & documents</option>
              <option>Other</option>
            </SelectInput>
          )}
        </Field>
      </div>
      <Field label="Message" name="message" required error={errors.message}>
        {({ id, describedBy, invalid }) => (
          <TextArea id={id} name="message" rows={compact ? 4 : 5} value={values.message} onChange={set("message")} aria-describedby={describedBy} invalid={invalid} />
        )}
      </Field>
      {formError && (
        <p role="alert" className="rounded-lg border border-signal-100 bg-signal-50 px-4 py-3 text-sm text-signal-700">
          {formError}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="text-xs text-muted">
          Demonstration form — submissions are not sent to any server.
        </p>
        <button type="submit" disabled={status === "sending"} className={buttonClasses("primary")}>
          {status === "sending" ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Send aria-hidden className="size-4" />}
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
