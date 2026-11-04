"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ Toasts */

type Toast = { id: number; tone: "success" | "error"; text: string };
const ToastCtx = createContext<(tone: Toast["tone"], text: string) => void>(() => undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((tone: Toast["tone"], text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, tone, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), tone === "error" ? 8000 : 4500);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed right-4 bottom-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.tone === "error" ? "alert" : "status"}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg",
              t.tone === "success" ? "border-leaf-200 bg-surface text-heading" : "border-signal-100 bg-signal-50 text-danger",
            )}
          >
            {t.tone === "success" ? <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" /> : <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" />}
            <p className="flex-1">{t.text}</p>
            <button type="button" aria-label="Dismiss" onClick={() => setToasts((all) => all.filter((x) => x.id !== t.id))} className="text-muted hover:text-ink">
              <X aria-hidden className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);

/* ------------------------------------------------------------------ Dialog */

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "m-auto max-h-[90dvh] w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-line bg-surface p-0 shadow-2xl backdrop:bg-navy-950/50",
        wide ? "max-w-5xl" : "max-w-lg",
      )}
    >
      {open && (
        <div className="flex max-h-[90dvh] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
            <h2 id={titleId} className="font-semibold text-heading">
              {title}
            </h2>
            <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1 text-muted hover:bg-paper hover:text-ink">
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <div className="overflow-y-auto p-5">{children}</div>
        </div>
      )}
    </dialog>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  tone = "danger",
  busy,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  tone?: "danger" | "primary";
  busy?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="text-sm leading-relaxed text-ink">{message}</div>
      <div className="mt-6 flex justify-end gap-2">
        <AdminButton variant="ghost" onClick={onClose} disabled={busy}>
          Cancel
        </AdminButton>
        <AdminButton variant={tone === "danger" ? "danger" : "primary"} onClick={onConfirm} busy={busy}>
          {confirmLabel}
        </AdminButton>
      </div>
    </Modal>
  );
}

/* ----------------------------------------------------------------- Buttons */

type BtnVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
export const adminBtn = (variant: BtnVariant = "primary", size: "sm" | "md" = "md") =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap",
    size === "sm" ? "min-h-8 px-3 text-xs" : "min-h-10 px-4 text-sm",
    variant === "primary" && "bg-brand hover:bg-brand-hover text-white",
    variant === "secondary" && "bg-leaf-600 text-white hover:bg-leaf-700",
    variant === "danger" && "bg-signal-600 text-white hover:bg-signal-700",
    variant === "outline" && "border border-line bg-surface text-heading hover:border-line-strong",
    variant === "ghost" && "text-heading hover:bg-paper",
  );

export function AdminButton({
  variant = "primary",
  size = "md",
  busy,
  className,
  children,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: "sm" | "md"; busy?: boolean }) {
  return (
    <button type={type} {...props} disabled={busy || props.disabled} className={cn(adminBtn(variant, size), className)}>
      {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ Inputs */

export const inputCls = (invalid?: boolean) =>
  cn(
    "w-full rounded-lg border bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-leaf-500/40",
    invalid ? "border-signal-600" : "border-line focus:border-leaf-500",
  );

export function FormRow({
  label,
  htmlFor,
  required,
  help,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  help?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-heading">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      {children}
      {help && !error && <p className="mt-1 text-xs text-muted">{help}</p>}
      {error && (
        <p id={htmlFor ? `${htmlFor}-error` : undefined} className="mt-1 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function StatusBadge({ value, label }: { value: string; label?: string }) {
  const tone =
    {
      published: "bg-leaf-50 text-accent ring-leaf-200",
      approved: "bg-leaf-50 text-accent ring-leaf-200",
      active: "bg-leaf-50 text-accent ring-leaf-200",
      replied: "bg-leaf-50 text-accent ring-leaf-200",
      draft: "bg-paper text-subheading ring-line",
      scheduled: "bg-amber-50 text-amber-800 ring-amber-200",
      pending: "bg-amber-50 text-amber-800 ring-amber-200",
      new: "bg-amber-50 text-amber-800 ring-amber-200",
      under_review: "bg-tint text-subheading ring-line-strong",
      read: "bg-tint text-subheading ring-line-strong",
      rejected: "bg-signal-50 text-danger ring-signal-100",
      inactive: "bg-signal-50 text-danger ring-signal-100",
    }[value] ?? "bg-paper text-subheading ring-line";
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ring-1", tone)}>{label ?? value.replace(/_/g, " ")}</span>;
}

export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
