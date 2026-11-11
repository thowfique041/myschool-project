export const locales = ["en", "bn"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bn";

export const hasLocale = (v: string | undefined | null): v is Locale => v === "en" || v === "bn";

/** Bangla lives at the site root, English under /en. */
export function localizePath(path: string, lang: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (/^\/(api|_next|images|uploads)(\/|$)/.test(path) || /\.[a-z0-9]{2,5}($|[?#])/i.test(path.split("#")[0].split("?")[0])) return path;
  const clean = stripLocale(path);
  if (lang === defaultLocale) return clean;
  return clean === "/" ? `/${lang}` : clean.startsWith("/#") || clean.startsWith("/?") ? `/${lang}${clean.slice(1)}` : `/${lang}${clean}`;
}

/** Removes a leading /bn or /en segment. */
export function stripLocale(path: string): string {
  const m = path.match(/^\/(bn|en)(?=\/|$|[?#])(.*)$/);
  if (!m) return path;
  return m[2] ? (m[2].startsWith("/") ? m[2] : `/${m[2]}`) : "/";
}
