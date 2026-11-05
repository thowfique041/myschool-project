import Link from "@/components/i18n/Link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import type { SiteInfo } from "@/content/site-content";
import { getI18n } from "@/i18n/server";
import { toBnDigits } from "@/lib/utils";

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

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-wide text-white uppercase">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-base text-navy-200 hover:text-white hover:underline underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3Z" />
    </svg>
  );
}

export async function Footer({ site, footer, year }: { site: SiteInfo; footer: FooterContent; year: number }) {
  const { t, lang } = await getI18n();
  const n = (v: number) => (lang === "bn" ? toBnDigits(v) : String(v));
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="dark" name={lang === "bn" ? site.nameBn : site.name} nameBn={lang === "bn" ? `স্থাপিত ${String(site.established).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)])}` : `Established ${site.established}`} src={site.logo} />
          <p className="mt-5 max-w-sm text-base leading-relaxed text-navy-200">
            {footer.about}
          </p>
          <ul className="mt-6 space-y-3 text-base">
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-navy-200" />
              <span>{site.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-navy-200" />
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-navy-200" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-navy-200" />
              <span>{site.officeHours}</span>
            </li>
          </ul>
          <ul className="mt-6 flex gap-2" aria-label={t.common.socialMedia}>
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} ${t.common.opensNewTab}`}
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-white/15 text-navy-100 hover:border-white/40 hover:text-white"
                >
                  <SocialIcon label={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <FooterColumn title={footer.quickTitle} links={footer.quick} />
        <FooterColumn title={footer.institutionTitle} links={footer.institution} />
        <FooterColumn title={footer.helpTitle} links={footer.help} />
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-navy-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {n(site.established)}–{n(year)} {lang === "bn" ? site.nameBn : site.name}. {footer.copyright}
          </p>
          <p style={{ lineHeight: 1.5 }}>{lang === "bn" ? site.taglineBn : site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
