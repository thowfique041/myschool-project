import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { WithSidebar } from "@/components/portal/Sidebar";
import { RecordTable, type RecordRow } from "@/components/portal/RecordTable";
import { isNew } from "@/components/portal/NewBadge";
import { getNotices, getSite, getToday } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

const copy = {
  en: { title: "Notice Board", meta: "Notices from Webnion School & College.", sample: "Notices on this site are sample content for a fictional institution." },
  bn: { title: "নোটিশ বোর্ড", meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের নোটিশ।", sample: "এই সাইটের নোটিশগুলো একটি কাল্পনিক প্রতিষ্ঠানের নমুনা বিষয়বস্তু।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function NoticesPage() {
  const [notices, site, today, { lang }] = await Promise.all([getNotices(), getSite(), getToday(), getI18n()]);
  const c = copy[lang];
  const sorted = [...notices].sort((a, b) => b.date.localeCompare(a.date));
  // Record shape: id, date, title, category, file, isNew. The title opens the PDF when there is one.
  const rows: RecordRow[] = sorted.map((n) => ({
    id: n.slug,
    date: n.date,
    title: n.title,
    href: n.attachment?.href ?? `/notices/${n.slug}`,
    external: Boolean(n.attachment?.href),
    category: n.category,
    categoryLabel: n.categoryLabel ?? n.category,
    isNew: isNew(n.date, today),
    fileHref: n.attachment?.href,
    searchText: `${n.titleEn ?? ""} ${n.summary}`,
  }));
  const categories = [...new Map(sorted.map((n) => [n.category, { value: n.category, label: n.categoryLabel ?? n.category }])).values()];
  return (
    <>
      <PageHeader path="/notices" title={c.title} />
      <WithSidebar notices={false}>
        <RecordTable rows={rows} caption={c.title} search categories={categories} />
        {site.demoNote && <DemoNote>{c.sample}</DemoNote>}
      </WithSidebar>
    </>
  );
}
