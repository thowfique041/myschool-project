/** Small "new" mark for notices from the last seven days. */
export function NewBadge({ lang }: { lang: "en" | "bn" }) {
  return <span className="new-badge inline-block bg-signal-600 px-1.5 text-[0.7rem] leading-5 font-semibold text-white">{lang === "bn" ? "নতুন" : "New"}</span>;
}

/** True when the notice date is within seven days before `today` (both YYYY-MM-DD). */
export function isNew(date: string, today: string): boolean {
  const d = (Date.parse(today) - Date.parse(date)) / 86_400_000;
  return d >= 0 && d < 7;
}
