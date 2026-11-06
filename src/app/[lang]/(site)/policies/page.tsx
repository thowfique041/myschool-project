import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { getAcademic, getSite } from "@/content/site-content";
import { getI18n } from "@/i18n/server";
import { toBnDigits } from "@/lib/utils";

const copy = {
  en: { title: "School Policies", alt: "নীতিমালা", crumb: "Academic", intro: "Rules and expectations that help the school run fairly for everyone.", meta: "Attendance, uniform, conduct and guardian policies.", nav: "Policies", sample: "These policies are sample content for a fictional institution." },
  bn: { title: "বিদ্যালয়ের নীতিমালা", alt: "School Policies", crumb: "একাডেমিক", intro: "যে নিয়ম ও প্রত্যাশাগুলো বিদ্যালয়কে সবার জন্য ন্যায্যভাবে চলতে সাহায্য করে।", meta: "উপস্থিতি, পোশাক, আচরণ ও অভিভাবক সংক্রান্ত নীতিমালা।", nav: "নীতিমালা", sample: "এই নীতিমালা একটি কাল্পনিক প্রতিষ্ঠানের নমুনা বিষয়বস্তু।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function PoliciesPage() {
  const [{ policies: all }, site, { lang }] = await Promise.all([getAcademic(), getSite(), getI18n()]);
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} titleBn={c.alt} crumbs={[{ label: c.crumb, href: "/academic" }]} description={c.intro} />
      <section className="py-12 sm:py-16">
        <div className="container-page grid max-w-5xl gap-10 lg:grid-cols-[13rem_1fr]">
          <nav aria-label={c.nav} className="lg:sticky lg:top-28 lg:self-start">
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
              <section key={p.id} id={p.id} aria-labelledby={`${p.id}-h`} className="scroll-mt-28 rounded-md border border-line bg-surface p-6">
                <h2 id={`${p.id}-h`} className="font-serif text-2xl leading-tight font-semibold text-heading">
                  {lang === "bn" ? toBnDigits(i + 1) : i + 1}. {p.title}
                </h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 lang-bn-list text-base text-ink marker:text-muted">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ol>
              </section>
            ))}
            <a href="/downloads/code-of-conduct.pdf" download className="inline-block text-sm font-semibold text-accent hover:underline underline-offset-4">
              {lang === "bn" ? "শিক্ষার্থী আচরণবিধি ডাউনলোড করুন (পিডিএফ)" : "Download the student code of conduct (PDF)"}
            </a>
            {site.demoNote && <DemoNote>{c.sample}</DemoNote>}
          </div>
        </div>
      </section>
    </>
  );
}
