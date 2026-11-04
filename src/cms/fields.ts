import { z } from "zod";

/**
 * Field definitions are the single source of truth for a piece of CMS
 * content. The same definition produces the Mongoose schema (server), the
 * Zod validator (server, on every mutation) and the admin form (client).
 * Definitions must stay JSON-serialisable so they can be sent to the client.
 */

export type Option = { value: string; label: string };

type Base = {
  name: string;
  label: string;
  required?: boolean;
  help?: string;
  /** Column span in the admin form grid (1 or 2). Defaults to 2 for long fields. */
  span?: 1 | 2;
  placeholder?: string;
  /** Bangla text, sets lang="bn" on the input. */
  bn?: boolean;
};

export type Field =
  | (Base & { type: "text" | "email" | "phone" | "url" | "slug"; max?: number })
  | (Base & { type: "textarea"; rows?: number; max?: number })
  /** Array of paragraphs edited as text separated by blank lines */
  | (Base & { type: "paragraphs"; rows?: number })
  /** Array of short strings edited one per line */
  | (Base & { type: "lines"; rows?: number })
  | (Base & { type: "number"; min?: number; max?: number; step?: number })
  | (Base & { type: "date" | "datetime" })
  | (Base & { type: "boolean" })
  | (Base & { type: "select"; options?: Option[]; taxonomy?: string; ref?: string })
  | (Base & { type: "image" | "file"; accept?: string })
  | (Base & { type: "color" })
  | (Base & { type: "repeater"; fields: Field[]; itemLabel?: string; min?: number; max?: number });

export type FieldType = Field["type"];

export const isLongField = (f: Field) =>
  ["textarea", "paragraphs", "lines", "repeater"].includes(f.type) || f.span === 2;

/* ------------------------------------------------------------- Zod builder */

const emptyToUndefined = (v: unknown) => (v === "" || v === null ? undefined : v);

function fieldSchema(f: Field): z.ZodType {
  let s: z.ZodType;
  switch (f.type) {
    case "text":
    case "phone":
      s = z.string().trim().max(f.max ?? 300);
      break;
    case "slug":
      s = z
        .string()
        .trim()
        .max(120)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens");
      break;
    case "email":
      s = z.string().trim().toLowerCase().email("Enter a valid email");
      break;
    case "url":
      s = z
        .string()
        .trim()
        .max(500)
        .refine((v) => v.startsWith("/") || v.startsWith("#") || /^https?:\/\//.test(v) || /^(mailto|tel):/.test(v), "Enter a full URL or a path starting with /");
      break;
    case "image":
    case "file":
      s = z
        .string()
        .trim()
        .max(1000)
        .refine((v) => v.startsWith("/") || /^https:\/\//.test(v), "Choose a file from the media library");
      break;
    case "color":
      s = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex colour like #172c4a");
      break;
    case "textarea":
      s = z.string().trim().max(f.max ?? 5000);
      break;
    case "paragraphs":
    case "lines":
      s = z.array(z.string().trim().max(5000)).max(200);
      break;
    case "number":
      s = z.coerce.number().pipe(
        z
          .number()
          .min(f.min ?? -1e9)
          .max(f.max ?? 1e9),
      );
      break;
    case "date":
      s = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date picker");
      break;
    case "datetime":
      s = z.coerce.date();
      break;
    case "boolean":
      s = z.coerce.boolean();
      break;
    case "select":
      s = f.options && !f.taxonomy && !f.ref ? z.enum(f.options.map((o) => o.value) as [string, ...string[]]) : z.string().trim().max(200);
      break;
    case "repeater": {
      const inner = buildSchema(f.fields);
      s = z
        .array(inner)
        .min(f.min ?? 0)
        .max(f.max ?? 200);
      break;
    }
  }
  if (f.type === "boolean") return s.default(false);
  if (f.type === "paragraphs" || f.type === "lines" || f.type === "repeater") return f.required ? s : s.default([]);
  if (!f.required) return z.preprocess(emptyToUndefined, s.optional());
  if (f.type === "text" || f.type === "textarea" || f.type === "slug" || f.type === "phone")
    return (s as z.ZodString).min(1, `${f.label} is required`);
  return z.preprocess(emptyToUndefined, s);
}

export function buildSchema(fields: Field[]) {
  const shape: Record<string, z.ZodType> = {};
  for (const f of fields) shape[f.name] = fieldSchema(f);
  return z.object(shape);
}

/** Flattens Zod issues into { "field.path": "message" } for the form. */
export function issuesToErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    const message = issue.code === "invalid_type" && /undefined/.test(issue.message) ? "This field is required" : issue.message;
    if (!out[key]) out[key] = message;
  }
  return out;
}

/** Empty value for a new form */
export function emptyValues(fields: Field[]): Record<string, unknown> {
  const v: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.type === "boolean") v[f.name] = false;
    else if (f.type === "paragraphs" || f.type === "lines" || f.type === "repeater") v[f.name] = [];
    else v[f.name] = "";
  }
  return v;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
