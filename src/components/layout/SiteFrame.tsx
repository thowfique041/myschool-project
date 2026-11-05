import type { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { SiteHeader } from "./SiteHeader";
import { Footer, type FooterContent } from "./Footer";
import { BackToTop } from "./BackToTop";
import { TextReveal } from "./TextReveal";
import { ScrollTopOnNav } from "./ScrollTopOnNav";
import { LogoMark } from "@/components/brand/Logo";
import { getCurrentYear, getFooter, getNavigation, getSetting, getSite } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

function shade(hex: string, defaultHex: string): Record<string, string> | null {
  if (!/^#[0-9a-f]{6}$/i.test(hex) || hex.toLowerCase() === defaultHex) return null;
  return {
    base: hex,
    dark: `color-mix(in oklab, ${hex} 70%, black)`,
    darker: `color-mix(in oklab, ${hex} 45%, black)`,
    light: `color-mix(in oklab, ${hex} 85%, white)`,
  };
}

/** Brand colour overrides from Settings → Branding, as CSS custom properties. */
function brandingCss(primary: string, accent: string): string {
  const p = shade(primary, "#172c4a");
  const a = shade(accent, "#0c7351");
  const rules: string[] = [];
  if (p) rules.push(`--color-navy-700:${p.light};--color-navy-800:${p.base};--color-navy-900:${p.dark};--color-navy-950:${p.darker};`);
  if (a) rules.push(`--color-leaf-500:${a.light};--color-leaf-600:${a.base};--color-leaf-700:${a.dark};--color-leaf-800:${a.darker};`);
  return rules.length ? `:root{${rules.join("")}}` : "";
}

/** Public website chrome: top bar, header, footer, branding and maintenance mode. */
export async function SiteFrame({ children }: { children: ReactNode }) {
  const [site, nav, footer, maintenance, year, { t }] = await Promise.all([
    getSite(),
    getNavigation(),
    getFooter<FooterContent>(),
    getSetting<{ enabled?: boolean; title?: string; message?: string }>("maintenance"),
    getCurrentYear(),
    getI18n(),
  ]);
  const css = brandingCss(site.primary, site.accent);
  const { lang } = await getI18n();
  const brandName = lang === "bn" ? site.nameBn : site.name;
  const brandSub = lang === "bn" ? `স্থাপিত ${String(site.established).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)])}` : `Established ${site.established}`;

  if (maintenance.enabled) {
    return (
      <>
        {css && <style>{css}</style>}
        <main id="main" className="flex flex-1 items-center bg-paper py-20">
          <div className="container-page max-w-xl text-center">
            <LogoMark className="mx-auto h-16 w-auto" />
            <h1 className="mt-6 font-serif text-3xl font-semibold text-heading">{maintenance.title}</h1>
            <p className="mt-3 text-muted">{maintenance.message}</p>
            <p className="mt-6 text-sm text-subheading">
              {brandName} · <a className="underline" href={site.phoneHref}>{site.phone}</a> ·{" "}
              <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      {css && <style>{css}</style>}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:font-semibold focus:text-heading focus:shadow"
      >
        {t.common.skip}
      </a>
      <TopBar site={site} />
      <SiteHeader items={nav.items} ctaLabel={nav.ctaLabel} ctaHref={nav.ctaHref} brand={{ name: brandName, nameBn: brandSub, logo: site.logo || undefined }} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <TextReveal />
      <ScrollTopOnNav />
      <Footer site={site} footer={footer} year={year} />
      <BackToTop />
    </>
  );
}
