"use client";

import { useI18n } from "@/i18n/client";
import type { Dictionary } from "@/i18n/dict";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Field, SelectInput, TextArea, TextInput, isBdPhone, isEmail } from "@/components/ui/fields";
import { buttonClasses } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Values = { name: string; phone: string; email: string; topic: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: "", phone: "", email: "", topic: "", message: "" };

function validate(v: Values, t: Dictionary): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 3) e.name = t.contactForm.nameError;
  if (!isBdPhone(v.phone)) e.phone = t.form.phoneInvalid;
  if (v.email && !isEmail(v.email)) e.email = t.form.emailInvalid;
  if (!v.topic) e.topic = t.contactForm.topicError;
  if (v.message.trim().length < 15) e.message = t.contactForm.messageError;
  return e;
}

export function ContactForm({ compact = false, to = "" }: { compact?: boolean; to?: string }) {
  const { t } = useI18n();
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
    const found = validate(values, t);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setFormError("");
    // No backend: hand the message to the visitor's own email app, addressed to the office.
    const subject = `${values.topic} - ${values.name}`;
    const body = [values.message, "", values.name, values.phone, values.email].filter((l, i) => i < 3 || l).join("\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    await new Promise((r) => setTimeout(r, 400));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="rounded-[var(--radius-card)] border border-line-strong bg-leaf-50 p-6"
        >
          <CheckCircle2 aria-hidden className="size-8 text-accent" />
          <h3 className="mt-3 text-lg font-semibold text-heading">{t.contactForm.thanks(values.name.split(" ")[0])}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {t.contactForm.sentText}
            <strong className="block pt-2 text-ink">{t.contactForm.noData}</strong>
          </p>
          <button
            type="button"
            className={cn(buttonClasses("outline", "sm"), "mt-4")}
            onClick={() => {
              setValues(empty);
              setStatus("idle");
            }}
          >
            {t.contactForm.another}
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4" aria-describedby="contact-form-note">
      {Object.keys(errors).some((k) => errors[k as keyof Values]) && (
        <p role="alert" className="rounded-lg border border-signal-100 bg-signal-50 px-4 py-2.5 text-sm text-danger">
          {t.form.fixFields}
        </p>
      )}
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field label={t.contactForm.name} name="name" required error={errors.name}>
          {({ id, describedBy, invalid }) => (
            <TextInput id={id} name="name" autoComplete="name" value={values.name} onChange={set("name")} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
        <Field label={t.contactForm.phone} name="phone" required error={errors.phone}>
          {({ id, describedBy, invalid }) => (
            <TextInput id={id} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" value={values.phone} onChange={set("phone")} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
        <Field label={t.contactForm.email} name="email" error={errors.email}>
          {({ id, describedBy, invalid }) => (
            <TextInput id={id} name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-describedby={describedBy} invalid={invalid} />
          )}
        </Field>
        <Field label={t.contactForm.topic} name="topic" required error={errors.topic}>
          {({ id, describedBy, invalid }) => (
            <SelectInput id={id} name="topic" value={values.topic} onChange={set("topic")} aria-describedby={describedBy} invalid={invalid}>
              <option value="">{t.contactForm.selectTopic}</option>
              {t.contactForm.topics.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </SelectInput>
          )}
        </Field>
      </div>
      <Field label={t.contactForm.message} name="message" required error={errors.message}>
        {({ id, describedBy, invalid }) => (
          <TextArea id={id} name="message" rows={compact ? 4 : 5} value={values.message} onChange={set("message")} aria-describedby={describedBy} invalid={invalid} />
        )}
      </Field>
      {formError && (
        <p role="alert" className="rounded-lg border border-signal-100 bg-signal-50 px-4 py-3 text-sm text-danger">
          {formError}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="text-xs text-muted">
          {t.contactForm.note}
        </p>
        <button type="submit" disabled={status === "sending"} className={buttonClasses("primary")}>
          {status === "sending" ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Send aria-hidden className="size-4" />}
          {status === "sending" ? t.form.sending : t.contactForm.send}
        </button>
      </div>
    </form>
  );
}
