import { lang as rootLang } from "next/root-params";
import { defaultLocale, hasLocale, type Locale } from "./config";
import { dictionaries } from "./dict";

/** Current locale from the [lang] root segment (the default, Bangla, outside it, e.g. sitemap). */
export async function getLang(): Promise<Locale> {
  try {
    const l = await rootLang();
    return hasLocale(l) ? l : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

export async function getI18n() {
  const lang = await getLang();
  return { lang, t: dictionaries[lang] };
}
