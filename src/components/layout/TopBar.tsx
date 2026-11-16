import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toBnDigits } from "@/lib/utils";
import type { SiteInfo } from "@/content/site-content";
import { getI18n } from "@/i18n/server";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

function SocialIcon({ label }: { label: string }) {
  const l = label.toLowerCase();
  if (l.includes("facebook"))
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="size-3.5 fill-current">
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
      </svg>
    );
  if (l.includes("youtube"))
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
      </svg>
    );
  return <span className="text-xs">{label}</span>;
}

export async function TopBar({ site }: { site: SiteInfo }) {
  const { t, lang } = await getI18n();
  return (
    <div className="on-brand bg-brand-deep text-sm text-forest-100">
      <div className="container-page flex min-h-9 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <li>
            <a href={site.phoneHref} className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone aria-hidden className="size-3.5 text-forest-200" />
              {site.phone}
            </a>
          </li>
          <li className="hidden sm:block">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail aria-hidden className="size-3.5 text-forest-200" />
              {site.email}
            </a>
          </li>
          <li className="hidden md:inline-flex items-center gap-1.5">
            <MapPin aria-hidden className="size-3.5 text-forest-200" />
            {site.area}
          </li>
          <li className="hidden xl:inline-flex items-center gap-1.5">
            <Clock aria-hidden className="size-3.5 text-forest-200" />
            {site.officeHours}
          </li>
        </ul>
        <ul className="flex items-center gap-4">
          {site.eiin && site.eiin !== "000000" && (
            <li className="hidden sm:block">
              <span className="text-forest-300">
                {t.common.eiin} {lang === "bn" ? toBnDigits(site.eiin) : site.eiin}
              </span>
            </li>
          )}
          {site.social.length > 0 && (
            <li className="hidden items-center gap-1 sm:flex">
              {site.social.map((sl) => (
                <a
                  key={sl.href}
                  href={sl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${sl.label} ${t.common.opensNewTab}`}
                  className="flex size-7 items-center justify-center rounded text-forest-200 hover:bg-white/10 hover:text-white"
                >
                  <SocialIcon label={sl.label} />
                </a>
              ))}
            </li>
          )}
          <li>
            <LanguageSwitcher tone="dark" className="h-7 px-2 text-xs" />
          </li>
        </ul>
      </div>
    </div>
  );
}
