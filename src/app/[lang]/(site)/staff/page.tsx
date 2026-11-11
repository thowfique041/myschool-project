import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PeopleTable } from "@/components/portal/PeopleTable";
import { WithSidebar } from "@/components/portal/Sidebar";
import { getPeople } from "@/content/site-content";
import { getI18n } from "@/i18n/server";
import { StaffIntroPart } from "@/components/about/AboutParts";

const copy = {
  en: { title: "Staff", meta: "Office, library, laboratory and support staff.", soon: "The staff list will be added soon." },
  bn: { title: "কর্মচারীবৃন্দ", meta: "অফিস, পাঠাগার, গবেষণাগার ও সহায়ক কর্মচারীবৃন্দ।", soon: "কর্মচারীদের তালিকা শিগগির যোগ করা হবে।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function StaffPage() {
  const [people, { lang }] = await Promise.all([getPeople(), getI18n()]);
  const c = copy[lang];
  const staff = people.filter((p) => p.kind === "staff");
  return (
    <>
      <PageHeader title={c.title} path="/staff" />
      <WithSidebar>
        <StaffIntroPart />
        {staff.length ? <PeopleTable people={staff} lang={lang} caption={c.title} /> : <p className="border border-line bg-surface px-4 py-6 text-muted">{c.soon}</p>}
      </WithSidebar>
    </>
  );
}
