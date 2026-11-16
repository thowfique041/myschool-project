import type { ReactNode } from "react";
import "@/app/globals.css";
import { hind, hindBn } from "@/lib/fonts";
import { themeScript } from "./ThemeToggle";

/** <html>/<body> shell used by the website root layout. */
export function Document({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning className={`${hind.variable} ${hindBn.variable} antialiased`}>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
