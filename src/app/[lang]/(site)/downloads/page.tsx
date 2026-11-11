import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WithSidebar } from "@/components/portal/Sidebar";
import { RecordTable, type RecordRow } from "@/components/portal/RecordTable";
import { getDownloads } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

const copy = {
  en: { title: "Downloads", meta: "Admission forms, circulars, routines, the academic calendar and other documents to download." },
  bn: { title: "ডাউনলোড", meta: "ভর্তি ফরম, বিজ্ঞপ্তি, রুটিন, একাডেমিক ক্যালেন্ডার ও অন্যান্য কাগজপত্র ডাউনলোড।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function DownloadsPage() {
  const [downloads, { lang }] = await Promise.all([getDownloads(), getI18n()]);
  const rows: RecordRow[] = [...downloads]
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .map((d) => ({ id: d.id, date: d.updated, title: d.title, href: d.href, external: true, fileHref: d.href, categoryLabel: d.categoryLabel }));
  return (
    <>
      <PageHeader title={copy[lang].title} path="/downloads" />
      <WithSidebar>
        <RecordTable rows={rows} caption={copy[lang].title} />
      </WithSidebar>
    </>
  );
}
