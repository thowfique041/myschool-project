import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WithSidebar } from "@/components/portal/Sidebar";
import { getI18n } from "@/i18n/server";

const copy = {
  en: { title: "Chairman’s Message", meta: "A message from the chairman of the governing body." },
  bn: { title: "সভাপতির বাণী", meta: "পরিচালনা পর্ষদের সভাপতির বাণী।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function ChairmanPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/about/chairman" />
      <WithSidebar>
      <p className="border border-line bg-surface px-4 py-6 text-muted">{lang === "bn" ? "এই পাতার তথ্য শিগগির যোগ করা হবে।" : "Information for this page will be added soon."}</p>
      </WithSidebar>
    </>
  );
}
