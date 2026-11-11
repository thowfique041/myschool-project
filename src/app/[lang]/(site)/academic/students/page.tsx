import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WithSidebar } from "@/components/portal/Sidebar";
import { getI18n } from "@/i18n/server";

const copy = {
  en: { title: "Student Numbers", meta: "Number of students by class and section." },
  bn: { title: "শিক্ষার্থী সংখ্যা", meta: "শ্রেণি ও শাখাভিত্তিক শিক্ষার্থী সংখ্যা।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function StudentsPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/academic/students" />
      <WithSidebar>
      <p className="border border-line bg-surface px-4 py-6 text-muted">{lang === "bn" ? "এই পাতার তথ্য শিগগির যোগ করা হবে।" : "Information for this page will be added soon."}</p>
      </WithSidebar>
    </>
  );
}
