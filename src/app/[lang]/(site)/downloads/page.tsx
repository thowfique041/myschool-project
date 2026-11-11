import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DownloadList } from "@/components/shared/DownloadList";
import { getDownloads } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

const copy = {
  en: { title: "Downloads", meta: "Admission forms, circulars, routines, the academic calendar and other documents." },
  bn: { title: "ডাউনলোড", meta: "ভর্তি ফরম, বিজ্ঞপ্তি, রুটিন, একাডেমিক ক্যালেন্ডার ও অন্যান্য কাগজপত্র।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function DownloadsPage() {
  const [downloads, { lang }] = await Promise.all([getDownloads(), getI18n()]);
  return (
    <>
      <PageHeader title={copy[lang].title} path="/downloads" />
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <DownloadList downloads={downloads} />
        </div>
      </section>
    </>
  );
}
