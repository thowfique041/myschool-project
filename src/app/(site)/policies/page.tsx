import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { getAcademic, getSite } from "@/content/site-content";

export const metadata: Metadata = {
  title: "School Policies",
  description: "Attendance, uniform, conduct and guardian policies.",
};

export default async function PoliciesPage() {
  const [{ policies: all }, site] = await Promise.all([getAcademic(), getSite()]);
  return (
    <>
      <PageHeader title="School Policies" titleBn="নীতিমালা" crumbs={[{ label: "Academic", href: "/academic" }]} description="Rules and expectations that help the school run fairly for everyone." />
      <section className="py-12 sm:py-16">
        <div className="container-page grid max-w-5xl gap-10 lg:grid-cols-[13rem_1fr]">
          <nav aria-label="Policies" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {all.map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="inline-flex min-h-9 items-center rounded-md px-3 text-sm font-medium text-heading hover:bg-surface">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-6">
            {all.map((p, i) => (
              <section key={p.id} id={p.id} aria-labelledby={`${p.id}-h`} className="scroll-mt-28 rounded-xl border border-line bg-surface p-6">
                <h2 id={`${p.id}-h`} className="font-serif text-xl font-semibold text-heading">
                  {i + 1}. {p.title}
                </h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-[0.97rem] text-ink marker:text-muted">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ol>
              </section>
            ))}
            <a href="/downloads/code-of-conduct.pdf" download className="inline-block text-sm font-semibold text-accent hover:underline underline-offset-4">
              Download the student code of conduct (sample PDF)
            </a>
            {site.demoNote && <DemoNote>These policies are sample content for a fictional institution.</DemoNote>}
          </div>
        </div>
      </section>
    </>
  );
}
