"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Office is open Saturday–Thursday, 8:00 AM – 3:00 PM, Bangladesh time. */
function isOpen(): boolean {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  if (get("weekday") === "Fri") return false;
  const m = Number(get("hour")) * 60 + Number(get("minute"));
  return m >= 8 * 60 && m < 15 * 60;
}

/** Shows "Open now" / "Closed now" once the visitor's clock is known; nothing before that. */
export function OpenNowBadge({ open, closed }: { open: string; closed: string }) {
  const [state, setState] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setState(isOpen());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (state === null) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        state ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200" : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200",
      )}
    >
      <span aria-hidden className={cn("size-2 rounded-full", state ? "bg-emerald-500" : "bg-slate-400")} />
      {state ? open : closed}
    </span>
  );
}
