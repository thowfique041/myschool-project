import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WithSidebar } from "@/components/portal/Sidebar";
import { getI18n } from "@/i18n/server";
import { CurriculumPart, LevelsPart } from "@/components/academic/AcademicParts";

const copy = {
  en: { title: "Classes & Sections", meta: "Primary, secondary and higher secondary levels, classes and subjects." },
  bn: { title: "শ্রেণি ও শাখা", meta: "প্রাথমিক, মাধ্যমিক ও উচ্চ মাধ্যমিক স্তর, শ্রেণি ও বিষয়।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function ClassesPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/academic/classes" />
      <WithSidebar>
      <LevelsPart />
      <CurriculumPart />
      </WithSidebar>
    </>
  );
}
