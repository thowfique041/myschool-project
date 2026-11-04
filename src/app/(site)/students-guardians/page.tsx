import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CalendarDays, ClipboardCheck, FileDown, HeartPulse, MessageSquare, Shirt, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, SectionHeading } from "@/components/ui/primitives";
import { getSite } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Students & Guardians",
  description: "Practical information for students and guardians: school timings, uniform, leave, progress reports and contacts.",
};

const links = [
  { title: "Class routine", text: "Period timings and the sample weekly routine.", href: "/academic#routine", icon: CalendarDays },
  { title: "Exam schedule", text: "Annual examination dates and subjects.", href: "/results#schedule", icon: ClipboardCheck },
  { title: "Forms & downloads", text: "Leave application, TC request and more.", href: "/notices#downloads", icon: FileDown },
  { title: "School policies", text: "Attendance, uniform, conduct and safety.", href: "/policies", icon: BookOpen },
];

const info = [
  { icon: Shirt, title: "Uniform", text: "White shirt or kameez with the school badge, navy trousers or cross-belt, and black shoes. Navy sweater in winter." },
  { icon: Users, title: "Guardian meetings", text: "Held once each term per class. Dates are announced on the notice board two weeks in advance." },
  { icon: MessageSquare, title: "Talking to teachers", text: "Class teachers are available after the last period on Thursdays, or by appointment through the office." },
  { icon: HeartPulse, title: "Health & absence", text: "Send a signed leave application for any absence. For illness during school, the office will call the guardian." },
];

const timings = [
  { label: "Morning shift (Play – Class 10)", value: "7:30 AM – 12:15 PM" },
  { label: "Day shift (Class 6 – 10)", value: "12:30 PM – 5:00 PM" },
  { label: "Higher secondary (Class 11 – 12)", value: "9:00 AM – 2:30 PM" },
  { label: "Office", value: "8:00 AM – 3:00 PM" },
  { label: "Weekly holiday", value: "Friday" },
];

export default async function StudentsGuardiansPage() {
  const site = await getSite();
  return (
    <>
      <PageHeader title="Students & Guardians" titleBn="শিক্ষার্থী ও অভিভাবক" crumbs={[{ label: "Campus Life" }]} description="Everything a family needs to know for a smooth school year." />
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {links.map(({ title, text, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className="group block h-full rounded-xl border border-line bg-surface p-5 transition-colors hover:border-leaf-200 hover:bg-leaf-50">
                  <Icon aria-hidden className="size-6 text-accent" />
                  <p className="mt-3 font-semibold text-heading group-hover:text-accent">{title}</p>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <SectionHeading kicker="প্রয়োজনীয় তথ্য" title="Good to know" />
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {info.map(({ icon: Icon, title, text }) => (
                  <li key={title}>
                    <Card className="h-full p-5">
                      <Icon aria-hidden className="size-5 text-accent" />
                      <h3 className="mt-3 font-semibold text-heading">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading kicker="সময়সূচি" title="School timings" />
              <dl className="mt-6 divide-y divide-line rounded-xl border border-line bg-surface">
                {timings.map((t) => (
                  <div key={t.label} className="flex flex-col gap-0.5 px-5 py-3.5 sm:flex-row sm:justify-between">
                    <dt className="text-sm text-muted">{t.label}</dt>
                    <dd className="font-semibold text-heading">{t.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-muted">
                Questions? Call <a href={site.phoneHref} className="font-semibold text-heading hover:underline">{site.phone}</a> during office hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
