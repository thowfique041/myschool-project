"use client";

import { Printer } from "lucide-react";

/** Opens the browser's print dialog; filters and navigation are hidden by the print styles. */
export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 font-bold text-white hover:bg-white/10">
      <Printer aria-hidden className="size-4" />
      {label}
    </button>
  );
}
