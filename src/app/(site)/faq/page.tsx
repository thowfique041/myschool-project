import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/primitives";
import { getFaqs } from "@/content/site-content";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about admission, academics, fees, results and general matters at Webnion School & College.",
};

const topics: { id: FaqItem["topic"]; label: string }[] = [
  { id: "admission", label: "Admission" },
  { id: "academic", label: "Academic" },
  { id: "fees", label: "Fees" },
  { id: "results", label: "Results" },
  { id: "general", label: "General" },
];

export default async function FaqPage() {
  const faqs = await getFaqs();
  const shown = topics.filter((t) => faqs.some((f) => f.topic === t.id));
  return (
    <>
      <PageHeader title="Frequently Asked Questions" titleBn="সাধারণ জিজ্ঞাসা" description="Quick answers for guardians and students." />
      <section className="py-12 sm:py-16">
        <div className="container-page grid max-w-5xl gap-10 lg:grid-cols-[12rem_1fr]">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {shown.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="inline-flex min-h-9 items-center rounded-md px-3 text-sm font-medium text-heading hover:bg-surface">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-10">
            {shown.map((t) => (
              <section key={t.id} id={t.id} aria-labelledby={`${t.id}-h`} className="scroll-mt-28">
                <h2 id={`${t.id}-h`} className="font-serif text-xl font-semibold text-heading">
                  {t.label}
                </h2>
                <Accordion className="mt-4" items={faqs.filter((f) => f.topic === t.id)} />
              </section>
            ))}
            <div className="rounded-xl border border-line bg-surface p-6">
              <p className="font-semibold text-heading">Still have a question?</p>
              <p className="mt-1 text-sm text-muted">Write to the office and we will get back to you during office hours.</p>
              <ButtonLink href="/contact" className="mt-4" variant="primary">
                Contact the office
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
