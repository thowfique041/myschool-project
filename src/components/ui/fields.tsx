import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const control =
  "block w-full rounded-sm border bg-surface px-3.5 py-2.5 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-leaf-600 focus:outline-2 focus:outline-offset-0 focus:outline-leaf-600/25 min-h-11";

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
};

export function Field({ label, name, error, hint, required, className, children }: FieldProps) {
  const id = `f-${name}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-heading">
        {label}
        {required && (
          <span className="text-danger" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && !error && (
        <p id={hintId} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ invalid, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return <input aria-invalid={invalid || undefined} className={cn(control, invalid ? "border-signal-600" : "border-line", className)} {...props} />;
}

export function SelectInput({ invalid, className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select aria-invalid={invalid || undefined} className={cn(control, "appearance-auto pr-8", invalid ? "border-signal-600" : "border-line", className)} {...props}>
      {children}
    </select>
  );
}

export function TextArea({ invalid, className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return <textarea aria-invalid={invalid || undefined} className={cn(control, "min-h-32", invalid ? "border-signal-600" : "border-line", className)} {...props} />;
}

/** Bangladeshi mobile numbers: 01XXXXXXXXX, optionally with +88 / 88 prefix. */
export function isBdPhone(value: string): boolean {
  return /^(?:\+?88)?01[3-9]\d{8}$/.test(value.replace(/[\s-]/g, ""));
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
