import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileText, Printer } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, DemoNote } from "@/components/ui/primitives";
import { NoticeRow } from "@/components/shared/cards";
import { PrintButton } from "@/components/shared/PrintButton";
import { getNotice, noticeCategories, notices, sortedNotices } from "@/data/notices";
import { formatDateBn, formatDateEn } from "@/lib/utils";

export function generateStaticParams() {
  return notices.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/notices/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const notice = getNotice(slug);
  if (!notice) return { title: "Notice not found" };
  return { title: notice.titleEn ?? notice.title, description: notice.summary };
}

export default async function NoticeDetailPage({ params }: PageProps<"/notices/[slug]">) {
  const { slug } = await params;
  const notice = getNotice(slug);
  if (!notice) notFound();

  const cat = noticeCategories[notice.category];
  const related = sortedNotices.filter((n) => n.slug !== notice.slug && n.category === notice.category).slice(0, 3);
  const fallback = sortedNotices.filter((n) => n.slug !== notice.slug).slice(0, 3);

  return (
    <>
      <PageHeader title="Notice" titleBn="নোটিশ" headingAs="p" crumbs={[{ label: "Notice Board", href: "/notices" }]} />
      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_20rem]">
          <article className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="navy">{cat.label}</Badge>
              <Badge tone="neutral">
                <span lang="bn">{cat.labelBn}</span>
              </Badge>
              {notice.important && <Badge tone="signal">Important</Badge>}
            </div>
            <h1 lang="bn" className="mt-4 font-serif text-2xl font-semibold text-navy-900 sm:text-3xl" style={{ lineHeight: 1.45 }}>
              {notice.title}
            </h1>
            {notice.titleEn && <p className="mt-1 text-muted">{notice.titleEn}</p>}
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-3 text-sm">
              <div>
                <dt className="inline text-muted">Published: </dt>
                <dd className="inline font-semibold text-navy-900">
                  <time dateTime={notice.date}>{formatDateEn(notice.date)}</time>
                  <span lang="bn" className="ml-2 font-normal text-muted">({formatDateBn(notice.date)})</span>
                </dd>
              </div>
            </dl>
            <div lang="bn" className="mt-6 space-y-4 text-[1.02rem] text-ink">
              {notice.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p lang="bn" className="mt-10 text-right text-sm text-muted">
              আদেশক্রমে
              <br />
              <span className="font-semibold text-navy-900">{notice.issuedBy}</span>
            </p>

            {notice.attachment && (
              <a
                href={notice.attachment.href}
                download
                className="mt-8 flex items-center gap-4 rounded-xl border border-line bg-paper p-4 transition-colors hover:border-leaf-200"
              >
                <FileText aria-hidden className="size-8 shrink-0 text-signal-600" />
                <span className="min-w-0 flex-1">
                  <span lang="bn" className="block font-semibold text-navy-900">{notice.attachment.label}</span>
                  <span className="block text-xs text-muted">{notice.attachment.size}</span>
                </span>
                <Download aria-hidden className="size-5 text-leaf-700" />
              </a>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
              <Link href="/notices" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-leaf-700">
                <ArrowLeft aria-hidden className="size-4" /> Back to notice board
              </Link>
              <PrintButton>
                <Printer aria-hidden className="size-4" /> Print notice
              </PrintButton>
            </div>
          </article>

          <aside aria-labelledby="related-notices" className="space-y-6">
            <div className="rounded-xl border border-line bg-white px-5">
              <h2 id="related-notices" className="pt-5 font-semibold text-navy-900">
                {related.length ? `More ${cat.label.toLowerCase()} notices` : "Recent notices"}
              </h2>
              <div className="divide-y divide-line">
                {(related.length ? related : fallback).map((n) => (
                  <NoticeRow key={n.slug} notice={n} compact />
                ))}
              </div>
            </div>
            <DemoNote>This notice is sample content for a fictional institution.</DemoNote>
          </aside>
        </div>
      </section>
    </>
  );
}
