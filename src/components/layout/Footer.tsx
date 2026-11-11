import Link from "@/components/i18n/Link";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import type { SiteInfo } from "@/content/site-content";
import { getNotices } from "@/content/site-content";
import { importantLinks } from "@/data/links";
import { getI18n } from "@/i18n/server";
import { formatDate, toBnDigits } from "@/lib/utils";

type LinkItem = { label: string; href: string };
export type FooterContent = {
  about: string;
  quickTitle: string;
  quick: LinkItem[];
  institutionTitle: string;
  institution: LinkItem[];
  helpTitle: string;
  help: LinkItem[];
  copyright: string;
};

const copy = {
  en: { contact: "Contact", links: "Important links", quick: "Quick links", map: "View on map", updated: "Last updated", credits: "Photo credits" },
  bn: { contact: "যোগাযোগ", links: "গুরুত্বপূর্ণ লিংক", quick: "দ্রুত লিংক", map: "মানচিত্রে দেখুন", updated: "সর্বশেষ হালনাগাদ", credits: "ছবির কৃতজ্ঞতা" },
};

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="border-b border-white/20 pb-2 text-base font-semibold text-white">{children}</h2>;
}

/** Three columns (contact, important links, quick links) and a one-line bottom bar. */
export async function Footer({ site, footer, year }: { site: SiteInfo; footer: FooterContent; year: number }) {
  const [{ t, lang }, notices] = await Promise.all([getI18n(), getNotices()]);
  const c = copy[lang];
  const n = (v: number) => (lang === "bn" ? toBnDigits(v) : String(v));
  const bn = lang === "bn";
  const name = bn ? site.nameBn : site.name;
  const lastUpdated = notices.map((x) => x.date).sort().at(-1);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${site.address}`)}`;
  const quick = [...footer.quick, ...footer.institution.filter((l) => !footer.quick.some((q) => q.href === l.href))];
  return (
    <footer className="border-t-4 border-leaf-600 bg-navy-950 text-navy-100 print:hidden">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div>
          <Heading>{c.contact}</Heading>
          <p className="mt-3 font-semibold text-white">{name}</p>
          <ul className="mt-2 space-y-2 text-[0.95rem]">
            <li className="flex gap-2.5">
              <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-navy-200" />
              <span>
                {site.address}
                <br />
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 hover:text-white">
                  {c.map}
                  <span className="sr-only"> {t.common.opensNewTab}</span>
                </a>
              </span>
            </li>
            <li className="flex gap-2.5">
              <Phone aria-hidden className="mt-1 size-4 shrink-0 text-navy-200" />
              <a href={site.phoneHref} className="hover:text-white">{site.phone}</a>
            </li>
            <li className="flex gap-2.5">
              <Mail aria-hidden className="mt-1 size-4 shrink-0 text-navy-200" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">{site.email}</a>
            </li>
            <li className="flex gap-2.5">
              <Clock aria-hidden className="mt-1 size-4 shrink-0 text-navy-200" />
              <span>{site.officeHours}</span>
            </li>
          </ul>
        </div>
        <div>
          <Heading>{c.links}</Heading>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            {importantLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 hover:text-white hover:underline underline-offset-4">
                  <ExternalLink aria-hidden className="mt-1 size-3.5 shrink-0 text-navy-200" />
                  <span>
                    {bn ? l.labelBn : l.label}
                    <span className="sr-only"> {t.common.opensNewTab}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Heading>{c.quick}</Heading>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.95rem]">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline underline-offset-4">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-x-6 gap-y-1 py-4 text-[0.82rem] text-navy-200 md:flex-row md:flex-wrap md:items-center md:justify-between" style={{ lineHeight: 1.6 }}>
          <p>© {n(site.established)}–{n(year)} {name}</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {site.eiin && site.eiin !== "000000" && (
              <span>
                {t.common.eiin}: {bn ? toBnDigits(site.eiin) : site.eiin}
              </span>
            )}
            {lastUpdated && (
              <span>
                {c.updated}: {formatDate(lastUpdated, lang)}
              </span>
            )}
            <Link href="/credits" className="underline underline-offset-2 hover:text-white">{c.credits}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
