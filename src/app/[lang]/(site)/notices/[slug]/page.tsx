import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileText, Printer } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, DemoNote } from "@/components/ui/primitives";
import { NoticeRow } from "@/components/shared/cards";
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

  const [sortedNotices, site, { t, lang }] = await Promise.all([getNotices(), getSite(), getI18n()]);
  const cat = { label: notice.categoryLabel ?? notice.category, labelBn: notice.categoryLabelBn };
  const related = sortedNotices.filter((n) => n.slug !== notice.slug && n.category === notice.category).slice(0, 3);
  const fallback = sortedNotices.filter((n) => n.slug !== notice.slug).slice(0, 3);

  return (
    <>
      <PageHeader title={t.notices.notice} headingAs="p" crumbs={[{ label: lang === "bn" ? "নোটিশ বোর্ড" : "Notice Board", href: "/notices" }]} />
      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_20rem]">
          <article className="rounded-lg border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="navy">{cat.label}</Badge>
              {notice.important && <Badge tone="signal">{t.common.important}</Badge>}
            </div>
            <h1 className="mt-4 font-serif text-2xl font-semibold text-heading sm:text-3xl" style={{ lineHeight: 1.45 }}>
              {notice.title}
            </h1>
            {notice.titleEn && <p className="mt-1 text-muted">{notice.titleEn}</p>}
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-3 text-sm">
              <div>
                <dt className="inline text-muted">{t.notices.published} </dt>
                <dd className="inline font-semibold text-heading">
                  <time dateTime={notice.date}>{formatDate(notice.date, lang)}</time>
                </dd>
              </div>
            </dl>
            <div className="mt-6 space-y-4 text-base text-ink">
              {notice.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {notice.issuedBy && <p className="mt-10 text-right text-sm text-muted">
              {t.notices.orderBy}
              <br />
              <span className="font-semibold text-heading">{notice.issuedBy}</span>
            </p>}

            {notice.attachment && (
              <a
                href={notice.attachment.href}
                target="_blank"
                rel="noopener"
                className="mt-8 flex items-center gap-4 rounded-md border border-line bg-paper p-4 transition-colors hover:border-line-strong"
              >
                <FileText aria-hidden className="size-8 shrink-0 text-danger" />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-heading">{notice.attachment.label}</span>
                  <span className="block text-xs text-muted">{notice.attachment.size}</span>
                </span>
                <Download aria-hidden className="size-5 text-accent" />
              </a>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
              <Link href="/notices" className="inline-flex items-center gap-1.5 text-sm font-semibold text-heading hover:text-accent">
                <ArrowLeft aria-hidden className="size-4" /> {t.notices.back}
              </Link>
              <PrintButton>
                <Printer aria-hidden className="size-4" /> {t.notices.printNotice}
              </PrintButton>
            </div>
          </article>

          <aside aria-labelledby="related-notices" className="space-y-6">
            <div className="rounded-md border border-line bg-surface px-5">
              <h2 id="related-notices" className="pt-5 font-semibold text-heading">
                {related.length ? t.notices.more(cat.label) : t.notices.recent}
              </h2>
              <div className="divide-y divide-line">
                {(related.length ? related : fallback).map((n) => (
                  <NoticeRow key={n.slug} notice={n} compact />
                ))}
              </div>
            </div>
            {site.demoNote && <DemoNote>{t.notices.sampleNote}</DemoNote>}
          </aside>
        </div>
      </section>
    </>
  );
}
