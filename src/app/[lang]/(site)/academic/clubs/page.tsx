import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WithSidebar } from "@/components/portal/Sidebar";
import { getI18n } from "@/i18n/server";

const copy = {
  en: { title: "Clubs & Co-curricular", meta: "Clubs, scouts, sports and co-curricular activities." },
  bn: { title: "ক্লাব ও সহশিক্ষা", meta: "ক্লাব, স্কাউট, খেলাধুলা ও সহশিক্ষা কার্যক্রম।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function ClubsPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/academic/clubs" />
      <WithSidebar>
      <p className="border border-line bg-surface px-4 py-6 text-muted">{lang === "bn" ? "এই পাতার তথ্য শিগগির যোগ করা হবে।" : "Information for this page will be added soon."}</p>
      </WithSidebar>
    </>
  );
}
