import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { PeopleTable } from "@/components/portal/PeopleTable";
import { WithSidebar } from "@/components/portal/Sidebar";
import { getPeople, getSite } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Teachers",
    meta: "Teachers of Webnion School & College with designation, subject and qualification.",
    sample: "All faculty names and qualifications are sample entries. Until real photos are added, each profile shows a plain placeholder picture, so no real person is presented as a member of this fictional institution.",
  },
  bn: {
    title: "শিক্ষকবৃন্দ",
    meta: "পদবি, বিষয় ও শিক্ষাগত যোগ্যতাসহ ওয়েবনিয়ন স্কুল এন্ড কলেজের শিক্ষক তালিকা।",
    sample: "সব শিক্ষকের নাম ও যোগ্যতা নমুনা। আসল ছবি যোগ না হওয়া পর্যন্ত প্রতিটি প্রোফাইলে একটি সাধারণ ডামি ছবি দেখানো হয়েছে, যাতে কোনো আসল মানুষকে এই কাল্পনিক প্রতিষ্ঠানের সদস্য হিসেবে দেখানো না হয়।",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function TeachersPage() {
  const [people, site, { lang }] = await Promise.all([getPeople(), getSite(), getI18n()]);
  const c = copy[lang];
  const teachers = people.filter((p) => p.kind !== "staff");
  return (
    <>
      <PageHeader path="/teachers" title={c.title} />
      <WithSidebar>
        {site.demoNote && <DemoNote>{c.sample}</DemoNote>}
        <PeopleTable people={teachers} lang={lang} caption={c.title} />
      </WithSidebar>
    </>
  );
}
