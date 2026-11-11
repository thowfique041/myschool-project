"use client";

import { Printer } from "lucide-react";

/** Opens the browser's print dialog; filters and navigation are hidden by the print styles. */
export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="inline-flex min-h-9 items-center gap-2 border border-line-strong bg-surface px-3 text-sm font-semibold text-heading hover:bg-tint">
      <Printer aria-hidden className="size-4" />
      {label}
    </button>
  );
}
