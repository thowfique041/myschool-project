import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { TeacherDirectory } from "@/components/explorers/TeacherDirectory";
import { departments, teachers } from "@/data/teachers";

export const metadata: Metadata = {
  title: "Teachers & Staff",
  description: "Faculty directory of Webnion School & College by department and section.",
};

export default function TeachersPage() {
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
          <DemoNote className="mb-8">
            All faculty names and qualifications are sample entries. We show initials instead of photographs so that no real
            person is presented as a member of this fictional institution.
          </DemoNote>
          <TeacherDirectory teachers={teachers} departments={departments} />
        </div>
      </section>
    </>
  );
}
