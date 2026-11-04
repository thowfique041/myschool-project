"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import { dictionaries, type Dictionary } from "./dict";

const Ctx = createContext<{ lang: Locale; t: Dictionary }>({ lang: "en", t: dictionaries.en });

export function I18nProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  return <Ctx.Provider value={{ lang, t: dictionaries[lang] }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
