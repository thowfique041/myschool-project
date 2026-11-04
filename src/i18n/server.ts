import { lang as rootLang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import { dictionaries } from "./dict";

/** Current locale from the [lang] root segment (English outside it, e.g. sitemap). */
export async function getLang(): Promise<Locale> {
  try {
    const l = await rootLang();
    return hasLocale(l) ? l : "en";
  } catch {
    return "en";
  }
}

export async function getI18n() {
  const lang = await getLang();
  return { lang, t: dictionaries[lang] };
}
