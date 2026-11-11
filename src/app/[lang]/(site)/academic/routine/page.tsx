import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { FullWidth } from "@/components/portal/Sidebar";
import { getI18n } from "@/i18n/server";
import { RoutinePart } from "@/components/academic/AcademicParts";

const copy = {
  en: { title: "Class Routine", meta: "Weekly class routine by class, section and shift." },
  bn: { title: "ক্লাস রুটিন", meta: "শ্রেণি, শাখা ও শিফটভিত্তিক সাপ্তাহিক ক্লাস রুটিন।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function RoutinePage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/academic/routine" />
      <FullWidth>
        <RoutinePart />
      </FullWidth>
    </>
  );
}
