import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { Download, FileText, Printer } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { WithSidebar } from "@/components/portal/Sidebar";
import { PrintButton } from "@/components/shared/PrintButton";
import { getNotice, getNotices, getSite } from "@/content/site-content";
import { formatDate } from "@/lib/utils";
import { getI18n } from "@/i18n/server";

export async function generateStaticParams() {
  const notices = await getNotices();
  return notices.length ? notices.map((n) => ({ slug: n.slug })) : [{ slug: "none" }];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/notices/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const notice = await getNotice(slug);
  if (!notice) return { title: "404" };
  return { title: notice.titleEn ?? notice.title, description: notice.summary };
}

export default async function NoticeDetailPage({ params }: PageProps<"/[lang]/notices/[slug]">) {
  const { slug } = await params;
  const notice = await getNotice(slug);
  if (!notice) notFound();

  const [site, { t, lang }] = await Promise.all([getSite(), getI18n()]);

  return (
    <>
      <PageHeader path="/notices" current={notice.title} title={t.notices.notice} headingAs="p" />
      <WithSidebar notices={false}>
        <article className="border border-line bg-surface p-5 sm:p-8">
          <p className="text-sm text-muted">{notice.categoryLabel ?? notice.category}</p>
          <h1 className="mt-1 font-serif text-2xl font-bold text-heading sm:text-[1.75rem]" style={{ lineHeight: 1.45 }}>
            {notice.title}
          </h1>
          {notice.titleEn && <p className="mt-1 text-muted">{notice.titleEn}</p>}
          <p className="mt-3 border-y border-line py-2 text-sm">
            <span className="text-muted">{t.notices.published} </span>
            <time dateTime={notice.date} className="font-semibold text-heading">{formatDate(notice.date, lang)}</time>
          </p>
          <div className="mt-5 space-y-4 text-base text-ink">
            {notice.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {notice.issuedBy && (
            <p className="mt-8 text-right text-sm text-muted">
              {t.notices.orderBy}
              <br />
              <span className="font-semibold text-heading">{notice.issuedBy}</span>
            </p>
          )}
          {notice.attachment && (
            <a href={notice.attachment.href} target="_blank" rel="noopener" className="mt-6 flex items-center gap-3 border border-line bg-tint p-3 hover:border-line-strong">
              <FileText aria-hidden className="size-6 shrink-0 text-danger" />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-heading">{notice.attachment.label}</span>
                <span className="block text-xs text-muted">{notice.attachment.size}</span>
              </span>
              <Download aria-hidden className="size-5 text-accent" />
            </a>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 print:hidden">
            <Link href="/notices" className="text-sm font-semibold text-accent underline underline-offset-4 hover:text-heading">
              {lang === "bn" ? "সকল নোটিশ" : "All notices"}
            </Link>
            <PrintButton>
              <Printer aria-hidden className="size-4" /> {t.notices.printNotice}
            </PrintButton>
          </div>
        </article>
        {site.demoNote && <DemoNote>{t.notices.sampleNote}</DemoNote>}
      </WithSidebar>
    </>
  );
}
