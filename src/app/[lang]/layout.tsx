import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { lang as rootLang } from "next/root-params";
import { Document } from "@/components/layout/Document";
import { I18nProvider } from "@/i18n/client";
import { hasLocale, locales } from "@/i18n/config";
import { getSetting, getSite } from "@/content/site-content";

type Seo = { title?: string; description?: string; keywords?: string[]; ogImage?: string; siteUrl?: string };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await rootLang();
  const [seo, site] = await Promise.all([getSetting<Seo>("seo"), getSite()]);
  let base: URL;
  try {
    base = new URL(seo.siteUrl || "https://webnion-school-college.vercel.app");
  } catch {
    base = new URL("https://webnion-school-college.vercel.app");
  }
  return {
    metadataBase: base,
    title: lang === "bn" ? { default: `${site.nameBn} — সিলেট`, template: `%s | ${site.nameBn}` } : { default: seo.title || site.name, template: `%s | ${site.name}` },
    description: seo.description,
    applicationName: lang === "bn" ? site.nameBn : site.name,
    keywords: seo.keywords,
    openGraph: {
      type: "website",
      siteName: lang === "bn" ? site.nameBn : site.name,
      locale: lang === "bn" ? "bn_BD" : "en_BD",
      images: [{ url: seo.ogImage || "/icon.svg", alt: site.name }],
    },
    icons: site.favicon ? { icon: site.favicon } : { icon: "/icon.svg" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#172c4a",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await rootLang();
  if (!hasLocale(lang)) notFound();
  return (
    <Document lang={lang}>
      <I18nProvider lang={lang}>{children}</I18nProvider>
    </Document>
  );
}
