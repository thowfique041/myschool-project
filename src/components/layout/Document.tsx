import type { ReactNode } from "react";
import "@/app/globals.css";
import { bangla, banglaSerif, inter, serifEn } from "@/lib/fonts";
import { themeScript } from "./ThemeToggle";

/** <html>/<body> shell shared by the website and the admin panel root layouts. */
export function Document({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning className={`${inter.variable} ${serifEn.variable} ${bangla.variable} ${banglaSerif.variable} antialiased`}>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
