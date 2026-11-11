import { datePartsL } from "@/lib/utils";

/** Day and month stacked in a small block. Used only in the sidebar notice box. */
export function SmallDate({ iso, lang }: { iso: string; lang: "en" | "bn" }) {
  const { day, month } = datePartsL(iso, lang);
  return (
    <time dateTime={iso} className="date-block flex w-12 shrink-0 flex-col items-center justify-center border border-line bg-tint py-1 text-center leading-tight">
      <span className="text-lg font-bold text-heading">{day}</span>
      <span className="text-[0.7rem] text-muted">{month}</span>
    </time>
  );
}
