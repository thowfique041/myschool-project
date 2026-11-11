import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WithSidebar } from "@/components/portal/Sidebar";
import { getI18n } from "@/i18n/server";
import { ExamsPart, ResourcesPart } from "@/components/academic/AcademicParts";

const copy = {
  en: { title: "Syllabus", meta: "Syllabus files, examination system and grading scale." },
  bn: { title: "সিলেবাস", meta: "সিলেবাস, পরীক্ষা পদ্ধতি ও গ্রেডিং পদ্ধতি।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function SyllabusPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/academic/syllabus" />
      <WithSidebar>
      <ResourcesPart />
      <ExamsPart />
      </WithSidebar>
    </>
  );
}
