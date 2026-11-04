type ClassValue = string | false | null | undefined;

/** Joins truthy class names. Small on purpose — no extra dependency needed. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Converts Western digits in a string or number to Bangla digits. */
export function toBnDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => bnDigits[Number(d)]);
}

const bnMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

/** Parses an ISO date (YYYY-MM-DD) without timezone drift. */
function parseIsoDate(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

/** "১২ নভেম্বর ২০২৬" */
export function formatDateBn(iso: string): string {
  const { y, m, d } = parseIsoDate(iso);
  return `${toBnDigits(d)} ${bnMonths[m - 1]} ${toBnDigits(y)}`;
}

const enMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "12 Nov 2026" */
export function formatDateEn(iso: string): string {
  const { y, m, d } = parseIsoDate(iso);
  return `${d} ${enMonths[m - 1]} ${y}`;
}

/** Day and short month for date badges. */
export function dateParts(iso: string): { day: string; month: string; year: string } {
  const { y, m, d } = parseIsoDate(iso);
  return { day: String(d).padStart(2, "0"), month: enMonths[m - 1], year: String(y) };
}

/** Lower-cased, accent-insensitive text used for client-side search. */
export function normalize(text: string): string {
  return text.toLowerCase().normalize("NFKC").trim();
}

const bnShortMonths = ["জানু", "ফেব্রু", "মার্চ", "এপ্রি", "মে", "জুন", "জুলাই", "আগ", "সেপ্টে", "অক্টো", "নভে", "ডিসে"];

/** Date in the visitor's language. */
export function formatDate(iso: string, lang: "en" | "bn"): string {
  return lang === "bn" ? formatDateBn(iso) : formatDateEn(iso);
}

/** Day / month / year parts for date badges, localised. */
export function datePartsL(iso: string, lang: "en" | "bn") {
  const p = dateParts(iso);
  if (lang === "en") return p;
  const m = Number(iso.split("-")[1]);
  return { day: toBnDigits(p.day), month: bnShortMonths[m - 1], year: toBnDigits(p.year) };
}

/** Number in the visitor's language. */
export const num = (v: string | number, lang: "en" | "bn") => (lang === "bn" ? toBnDigits(v) : String(v));
