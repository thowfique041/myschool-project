import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { TeacherDirectory } from "@/components/explorers/TeacherDirectory";
import { getCategories, getPeople, getSite } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Teachers & Staff",
    alt: "শিক্ষক ও কর্মচারী",
    crumb: "About",
    intro: "Find teachers by department, section, name or subject.",
    meta: "Faculty directory of Webnion School & College by department and section.",
    sample: "All faculty names and qualifications are sample entries. Until real photos are added, each profile shows a plain placeholder picture, so no real person is presented as a member of this fictional institution.",
  },
  bn: {
    title: "শিক্ষক ও কর্মচারী",
    alt: "Teachers & Staff",
    crumb: "আমাদের সম্পর্কে",
    intro: "বিভাগ, শাখা, নাম বা বিষয় দিয়ে শিক্ষক খুঁজুন।",
    meta: "বিভাগ ও শাখা অনুযায়ী ওয়েবনিয়ন স্কুল এন্ড কলেজের শিক্ষক তালিকা।",
    sample: "সব শিক্ষকের নাম ও যোগ্যতা নমুনা। আসল ছবি যোগ না হওয়া পর্যন্ত প্রতিটি প্রোফাইলে একটি সাধারণ ডামি ছবি দেখানো হয়েছে, যাতে কোনো আসল মানুষকে এই কাল্পনিক প্রতিষ্ঠানের সদস্য হিসেবে দেখানো না হয়।",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function TeachersPage() {
  const [teachers, deptMap, site, { lang }] = await Promise.all([getPeople(), getCategories("department"), getSite(), getI18n()]);
  const c = copy[lang];
  const used = new Set(teachers.map((t) => t.department));
  const departments = [...Object.values(deptMap).map((d) => d.label).filter((d) => used.has(d)), ...[...used].filter((d) => !Object.values(deptMap).some((x) => x.label === d))];
  return (
    <>
      <PageHeader
        title={c.title}
        titleBn={c.alt}
        crumbs={[{ label: c.crumb, href: "/about" }]}
        description={c.intro}
      />
      <section className="py-12 sm:py-16">
        <div className="container-page">
          {site.demoNote && (
            <DemoNote className="mb-8">
              {c.sample}
            </DemoNote>
          )}
          <TeacherDirectory teachers={teachers} departments={departments} />
        </div>
      </section>
    </>
  );
}
