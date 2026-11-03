"use client";

import type { ReactNode } from "react";
import { buttonClasses } from "@/components/ui/primitives";

export function PrintButton({ children }: { children: ReactNode }) {
  return (
    <button type="button" onClick={() => window.print()} className={buttonClasses("outline", "sm")}>
      {children}
    </button>
  );
}
