"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, FileText, ImagePlus, Plus, Trash2, X } from "lucide-react";
import type { Field, Option } from "@/cms/fields";
import { FormRow, inputCls } from "./ui";
import { MediaPicker } from "./media";
import { cn } from "@/lib/utils";

type Values = Record<string, unknown>;
export type OptionsMap = Record<string, Option[]>;

/* --------------------------------------------- value conversion for forms */

const pad = (n: number) => String(n).padStart(2, "0");
function toLocalInput(v: unknown): string {
  if (!v) return "";
  const d = new Date(String(v));
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Converts stored values into the shapes the inputs edit. */
export function toFormValues(fields: Field[], data: Values): Values {
  const out: Values = {};
  for (const f of fields) {
    const v = data[f.name];
    switch (f.type) {
      case "paragraphs":
        out[f.name] = Array.isArray(v) ? v.join("\n\n") : String(v ?? "");
        break;
      case "lines":
        out[f.name] = Array.isArray(v) ? v.join("\n") : String(v ?? "");
        break;
      case "repeater":
        out[f.name] = Array.isArray(v) ? v.map((row) => toFormValues(f.fields, (row ?? {}) as Values)) : [];
        break;
      case "boolean":
        out[f.name] = Boolean(v);
        break;
      case "datetime":
        out[f.name] = toLocalInput(v);
        break;
      case "number":
        out[f.name] = v === undefined || v === null ? "" : String(v);
        break;
      case "color":
        out[f.name] = typeof v === "string" && v ? v : "#000000";
        break;
      default:
        out[f.name] = v === undefined || v === null ? "" : String(v);
    }
  }
  return out;
}

/** Converts form values back for the server (which validates again). */
export function fromFormValues(fields: Field[], values: Values): Values {
  const out: Values = {};
  for (const f of fields) {
    const v = values[f.name];
    if (f.type === "repeater") out[f.name] = Array.isArray(v) ? v.map((row) => fromFormValues(f.fields, row as Values)) : [];
    else if (f.type === "datetime") out[f.name] = v ? new Date(String(v)).toISOString() : "";
    else out[f.name] = v;
  }
  return out;
}

/* -------------------------------------------------------------- the input */

export function FieldInput({
  field: f,
  value,
  onChange,
  error,
  errors,
  path,
  options,
  disabled,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
  error?: string;
  errors: Record<string, string>;
  path: string;
  options: OptionsMap;
  disabled?: boolean;
}) {
  const id = `f-${path.replace(/\./g, "-")}`;
  const describedBy = error ? `${id}-error` : undefined;
  const common = { id, disabled, "aria-invalid": Boolean(error) || undefined, "aria-describedby": describedBy, lang: "bn" in f && f.bn ? "bn" : undefined };
  const str = typeof value === "string" ? value : value == null ? "" : String(value);

  if (f.type === "boolean") {
    return (
      <div className={cn(f.span !== 1 && "sm:col-span-2")}>
        <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-white px-3 py-2.5">
          <input id={id} type="checkbox" disabled={disabled} checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 size-4 accent-leaf-600" />
          <span>
            <span className="block text-sm font-semibold text-navy-900">{f.label}</span>
            {f.help && <span className="block text-xs text-muted">{f.help}</span>}
          </span>
        </label>
        {error && <p className="mt-1 text-xs text-signal-700">{error}</p>}
      </div>
    );
  }

  if (f.type === "repeater") {
    return <Repeater field={f} value={Array.isArray(value) ? (value as Values[]) : []} onChange={onChange} errors={errors} path={path} options={options} disabled={disabled} error={error} />;
  }

  let input: React.ReactNode;
  switch (f.type) {
    case "textarea":
    case "paragraphs":
    case "lines":
      input = (
        <textarea
          {...common}
          rows={"rows" in f && f.rows ? f.rows : f.type === "paragraphs" ? 6 : 4}
          className={inputCls(Boolean(error))}
          value={str}
          placeholder={f.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      );
      break;
    case "select": {
      const opts = f.options && !f.taxonomy && !f.ref ? f.options : (options[f.name] ?? []);
      input = (
        <select {...common} className={inputCls(Boolean(error))} value={str} onChange={(e) => onChange(e.target.value)}>
          <option value="">{f.required ? "Select…" : "— None —"}</option>
          {opts.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
          {str && !opts.some((o) => o.value === str) && <option value={str}>{str}</option>}
        </select>
      );
      break;
    }
    case "image":
    case "file":
      input = <MediaField id={id} kind={f.type === "image" ? "image" : undefined} value={str} onChange={onChange} invalid={Boolean(error)} disabled={disabled} />;
      break;
    case "color":
      input = (
        <div className="flex items-center gap-2">
          <input type="color" aria-label={`${f.label} picker`} disabled={disabled} value={/^#[0-9a-f]{6}$/i.test(str) ? str : "#000000"} onChange={(e) => onChange(e.target.value)} className="h-10 w-14 cursor-pointer rounded-lg border border-line bg-white p-1" />
          <input {...common} className={cn(inputCls(Boolean(error)), "font-mono")} value={str} onChange={(e) => onChange(e.target.value)} maxLength={7} />
        </div>
      );
      break;
    default: {
      const type =
        f.type === "number"
          ? "number"
          : f.type === "email"
            ? "email"
            : f.type === "date"
              ? "date"
              : f.type === "datetime"
                ? "datetime-local"
                : f.type === "phone"
                  ? "tel"
                  : f.type === "url"
                    ? "text"
                    : "text";
      input = (
        <input
          {...common}
          type={type}
          className={inputCls(Boolean(error))}
          value={str}
          placeholder={f.placeholder ?? (f.type === "url" ? "/page or https://…" : f.type === "slug" ? "leave empty to generate" : undefined)}
          onChange={(e) => onChange(e.target.value)}
          {...(f.type === "number" ? { min: f.min, max: f.max, step: f.step ?? "any" } : {})}
          {...(("max" in f && f.max && f.type !== "number") ? { maxLength: f.max } : {})}
        />
      );
    }
  }

  const help =
    f.help ??
    (f.type === "paragraphs" ? "Separate paragraphs with a blank line." : f.type === "lines" ? "One item per line." : undefined);

  return (
    <FormRow label={f.label} htmlFor={id} required={f.required} help={help} error={error} className={cn((f.span === 2 || (f.span !== 1 && ["textarea", "paragraphs", "lines"].includes(f.type))) && "sm:col-span-2")}>
      {input}
    </FormRow>
  );
}

function MediaField({ id, kind, value, onChange, invalid, disabled }: { id: string; kind?: "image"; value: string; onChange: (v: unknown) => void; invalid: boolean; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const isImg = /\.(jpe?g|png|webp|gif|svg)(\?|$)/i.test(value) || value.includes("images.unsplash.com");
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-paper">
        {value && isImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="size-full object-cover" />
        ) : value ? (
          <FileText aria-hidden className="size-6 text-navy-400" />
        ) : (
          <ImagePlus aria-hidden className="size-6 text-navy-200" />
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <input id={id} className={inputCls(invalid)} value={value} disabled={disabled} placeholder="Choose from the library or paste a link" onChange={(e) => onChange(e.target.value)} />
        <div className="flex gap-2">
          <button type="button" disabled={disabled} onClick={() => setOpen(true)} className="inline-flex min-h-8 items-center rounded-lg border border-line bg-white px-3 text-xs font-semibold text-navy-800 hover:border-navy-300">
            {kind === "image" ? "Choose image" : "Choose file"}
          </button>
          {value && (
            <button type="button" disabled={disabled} onClick={() => onChange("")} className="inline-flex min-h-8 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-muted hover:text-signal-700">
              <X aria-hidden className="size-3.5" /> Remove
            </button>
          )}
        </div>
      </div>
      <MediaPicker open={open} onClose={() => setOpen(false)} kind={kind} onPick={(url) => onChange(url)} />
    </div>
  );
}

function Repeater({
  field: f,
  value,
  onChange,
  errors,
  path,
  options,
  disabled,
  error,
}: {
  field: Extract<Field, { type: "repeater" }>;
  value: Values[];
  onChange: (v: unknown) => void;
  errors: Record<string, string>;
  path: string;
  options: OptionsMap;
  disabled?: boolean;
  error?: string;
}) {
  const blank = () => toFormValues(f.fields, {});
  const set = (i: number, row: Values) => onChange(value.map((r, j) => (j === i ? row : r)));
  const move = (i: number, d: -1 | 1) => {
    const next = [...value];
    const [x] = next.splice(i, 1);
    next.splice(i + d, 0, x);
    onChange(next);
  };
  const canAdd = !f.max || value.length < f.max;
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-1.5 text-sm font-semibold text-navy-900">
        {f.label} <span className="font-normal text-muted">({value.length})</span>
      </legend>
      {f.help && <p className="mb-2 text-xs text-muted">{f.help}</p>}
      <ol className="space-y-3">
        {value.map((row, i) => (
          <li key={i} className="rounded-xl border border-line bg-paper/60 p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold tracking-wide text-muted uppercase">
                {f.itemLabel ?? "Item"} {i + 1}
              </span>
              <span className="flex gap-1">
                <button type="button" disabled={disabled || i === 0} onClick={() => move(i, -1)} aria-label={`Move ${f.itemLabel ?? "item"} ${i + 1} up`} className="rounded p-1.5 text-muted hover:bg-white disabled:opacity-30">
                  <ArrowUp aria-hidden className="size-4" />
                </button>
                <button type="button" disabled={disabled || i === value.length - 1} onClick={() => move(i, 1)} aria-label={`Move ${f.itemLabel ?? "item"} ${i + 1} down`} className="rounded p-1.5 text-muted hover:bg-white disabled:opacity-30">
                  <ArrowDown aria-hidden className="size-4" />
                </button>
                <button type="button" disabled={disabled} onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label={`Remove ${f.itemLabel ?? "item"} ${i + 1}`} className="rounded p-1.5 text-signal-700 hover:bg-white">
                  <Trash2 aria-hidden className="size-4" />
                </button>
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {f.fields.map((sub) => (
                <FieldInput
                  key={sub.name}
                  field={sub}
                  value={row[sub.name]}
                  onChange={(v) => set(i, { ...row, [sub.name]: v })}
                  error={errors[`${path}.${i}.${sub.name}`]}
                  errors={errors}
                  path={`${path}.${i}.${sub.name}`}
                  options={options}
                  disabled={disabled}
                />
              ))}
            </div>
          </li>
        ))}
      </ol>
      {canAdd && (
        <button type="button" disabled={disabled} onClick={() => onChange([...value, blank()])} className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-dashed border-navy-300 bg-white px-3 text-sm font-semibold text-navy-800 hover:border-navy-500">
          <Plus aria-hidden className="size-4" /> Add {(f.itemLabel ?? "item").toLowerCase()}
        </button>
      )}
      {error && <p className="mt-1 text-xs text-signal-700">{error}</p>}
    </fieldset>
  );
}
