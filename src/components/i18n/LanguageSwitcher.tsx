"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { localizePath } from "@/i18n/config";
import { cn } from "@/lib/utils";

/** Links to the same page in the other language. */
export function LanguageSwitcher({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const { lang } = useI18n();
  const pathname = usePathname() || "/";
  const other = lang === "bn" ? "en" : "bn";
  return (
    <NextLink
      href={localizePath(pathname, other)}
      hrefLang={other}
      lang={other}
      aria-label={other === "bn" ? "বাংলায় দেখুন (Switch to Bangla)" : "View in English (ইংরেজিতে দেখুন)"}
      className={cn(
        "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-sm font-semibold transition-colors",
        tone === "dark" ? "border-white/20 text-forest-100 hover:border-white/50 hover:text-white" : "border-line text-heading hover:border-line-strong",
        className,
      )}
    >
      <Languages aria-hidden className="size-4" />
      {other === "bn" ? "বাংলা" : "English"}
    </NextLink>
  );
}
