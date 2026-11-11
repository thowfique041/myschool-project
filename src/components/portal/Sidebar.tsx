import Link from "@/components/i18n/Link";
import { ExternalLink, FileText } from "lucide-react";
import { DefaultAvatar } from "@/components/ui/DefaultAvatar";
import { getNotices, getSetting, getToday } from "@/content/site-content";
import type { PrincipalContent } from "@/components/home/types";
import { importantLinks } from "@/data/links";
import { getI18n } from "@/i18n/server";
import { Box } from "./Box";
import { SmallDate } from "./SmallDate";
import { NoticeLink } from "./NoticeLink";
import { NewBadge, isNew } from "./NewBadge";

const copy = {
  en: {
    notices: "Notice board",
    all: "All notices",
    pdf: "PDF",
    principal: "Principal’s message",
    chairman: "Chairman’s message",
    chairmanSoon: "The chairman’s message will be added soon.",
    more: "Read more",
    links: "Important links",
  },
  bn: {
    notices: "নোটিশ বোর্ড",
    all: "সকল নোটিশ",
    pdf: "পিডিএফ",
    principal: "অধ্যক্ষের বাণী",
    chairman: "সভাপতির বাণী",
    chairmanSoon: "সভাপতির বাণী শিগগির যোগ করা হবে।",
    more: "বিস্তারিত",
    links: "গুরুত্বপূর্ণ লিংক",
  },
};

/** Right-hand column shared by the homepage and the text, table and list pages. */
export async function Sidebar({ notices: showNotices = true }: { notices?: boolean } = {}) {
  const [notices, principal, today, { lang }] = await Promise.all([getNotices(), getSetting<PrincipalContent>("principal"), getToday(), getI18n()]);
  const c = copy[lang];
  const latest = [...notices].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7);
  const excerpt = principal.message?.[0] ?? "";
  return (
    <aside className="space-y-5 print:hidden" aria-label={lang === "bn" ? "পার্শ্ব তথ্য" : "Sidebar"}>
      {showNotices && (
      <Box id="sb-notices" title={c.notices} href="/notices" linkLabel={c.all} bodyClassName="p-0">
        <ul className="divide-y divide-line">
          {latest.map((n) => (
            <li key={n.slug} className="relative flex gap-3 px-3 py-2.5 hover:bg-tint">
              <SmallDate iso={n.date} lang={lang} />
              <p className="min-w-0 flex-1 text-[0.92rem] leading-snug text-ink">
                <NoticeLink notice={n} className="hover:text-accent hover:underline after:absolute after:inset-0" />
                {isNew(n.date, today) && (
                  <>
                    {" "}
                    <NewBadge lang={lang} />
                  </>
                )}
              </p>
              {n.attachment && (
                <span className="self-center text-danger" title={c.pdf}>
                  <FileText aria-hidden className="size-4" />
                  <span className="sr-only">{c.pdf}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </Box>
      )}

      <Box id="sb-principal" title={c.principal}>
        <div className="flex gap-3">
          {principal.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={principal.photo} alt={principal.name} className="h-24 w-20 shrink-0 border border-line object-cover object-top" />
          ) : (
            <DefaultAvatar gender={principal.gender === "male" ? "male" : "female"} className="h-24 w-20 shrink-0 rounded-none" />
          )}
          <div className="min-w-0">
            <p className="font-semibold text-heading">{principal.name}</p>
            <p className="text-xs text-muted">{principal.title}</p>
          </div>
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink">{excerpt}</p>
        <Link href="/about/principal" className="mt-2 inline-block text-sm font-semibold text-accent underline underline-offset-4 hover:text-heading">
          {c.more}
        </Link>
      </Box>

      <Box id="sb-chairman" title={c.chairman}>
        <div className="flex gap-3">
          <DefaultAvatar gender="male" className="h-24 w-20 shrink-0 rounded-none" />
          <p className="text-sm leading-relaxed text-muted">{c.chairmanSoon}</p>
        </div>
        <Link href="/about/chairman" className="mt-2 inline-block text-sm font-semibold text-accent underline underline-offset-4 hover:text-heading">
          {c.more}
        </Link>
      </Box>

      <Box id="sb-links" title={c.links} bodyClassName="p-0">
        <ul className="divide-y divide-line">
          {importantLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 px-4 py-2.5 text-sm text-ink hover:bg-tint hover:text-accent">
                <ExternalLink aria-hidden className="mt-1 size-3.5 shrink-0 text-muted" />
                <span>
                  {lang === "bn" ? l.labelBn : l.label}
                  <span className="sr-only"> {lang === "bn" ? "(নতুন ট্যাবে খুলবে)" : "(opens in a new tab)"}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Box>
    </aside>
  );
}

/** Page body with the sidebar on the right (stacked below on small screens). */
export function WithSidebar({ children, notices = true }: { children: React.ReactNode; notices?: boolean }) {
  return (
    <div className="container-page grid gap-6 py-6 sm:py-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-6">{children}</div>
      <Sidebar notices={notices} />
    </div>
  );
}

/** Page body without the sidebar (album and form pages). */
export function FullWidth({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return <div className={`container-page space-y-6 py-6 sm:py-8 ${narrow ? "max-w-4xl" : ""}`}>{children}</div>;
}
