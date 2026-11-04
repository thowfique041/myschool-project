import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { TeacherDirectory } from "@/components/explorers/TeacherDirectory";
import { getCategories, getPeople, getSite } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Teachers & Staff",
  description: "Faculty directory of Webnion School & College by department and section.",
};

export default async function TeachersPage() {
  const [teachers, deptMap, site] = await Promise.all([getPeople(), getCategories("department"), getSite()]);
  const used = new Set(teachers.map((t) => t.department));
  const departments = [...Object.values(deptMap).map((d) => d.label).filter((d) => used.has(d)), ...[...used].filter((d) => !Object.values(deptMap).some((x) => x.label === d))];
  return (
    <>
      <PageHeader
        title="Teachers & Staff"
        titleBn="শিক্ষক ও কর্মচারী"
        crumbs={[{ label: "About", href: "/about" }]}
        description="Find teachers by department, section, name or subject."
      />
      <section className="py-12 sm:py-16">
        <div className="container-page">
          {site.demoNote && (
            <DemoNote className="mb-8">
              All faculty names and qualifications are sample entries. We show initials instead of photographs so that no real
              person is presented as a member of this fictional institution.
            </DemoNote>
          )}
          <TeacherDirectory teachers={teachers} departments={departments} />
        </div>
      </section>
    </>
  );
}
