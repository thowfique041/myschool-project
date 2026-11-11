"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const KEY = "theme";
const listeners = new Set<() => void>();

function isDark() {
  return document.documentElement.classList.contains("dark");
}

function setTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem(KEY, dark ? "dark" : "light");
  } catch {
    /* storage unavailable: the choice lasts for this page only */
  }
  listeners.forEach((l) => l());
}

/** Light / dark switch. The initial theme is set before paint by the script in the root layout. */
export function ThemeToggle({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const dark = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    isDark,
    () => false,
  );
  return (
    <button
      type="button"
      onClick={() => setTheme(!dark)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-lg border transition-colors",
        tone === "dark" ? "border-white/20 text-navy-100 hover:border-white/50 hover:text-white" : "border-line text-heading hover:border-line-strong",
        className,
      )}
    >
      {dark ? <Sun aria-hidden className="size-[1.1rem]" /> : <Moon aria-hidden className="size-[1.1rem]" />}
    </button>
  );
}

/** Runs before first paint: saved choice, otherwise the system setting. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${KEY}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;
