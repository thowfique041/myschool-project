import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WithSidebar } from "@/components/portal/Sidebar";
import { getI18n } from "@/i18n/server";
import { CommitteePart } from "@/components/about/AboutParts";

const copy = {
  en: { title: "Governing Body", meta: "Members of the governing body and their roles." },
  bn: { title: "পরিচালনা পর্ষদ", meta: "পরিচালনা পর্ষদের সদস্য ও তাঁদের দায়িত্ব।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function GoverningBodyPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/about/governing-body" />
      <WithSidebar>
      <CommitteePart />
      </WithSidebar>
    </>
  );
}
