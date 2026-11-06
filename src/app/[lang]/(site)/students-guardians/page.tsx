import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/i18n/Link";
import { ArrowRight, BookOpen, CalendarDays, ClipboardCheck, FileDown, HeartPulse, MessageSquare, Shirt, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/primitives";
import { getSite } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

const linkIcons = [CalendarDays, ClipboardCheck, FileDown, BookOpen];
const infoIcons = [Shirt, Users, MessageSquare, HeartPulse];
const hrefs = ["/academic#routine", "/results#schedule", "/notices#downloads", "/policies"];

type Info = { title: string; text?: string; points?: string[] };
type TimingGroup = { group: string; rows: { label: string; value: string }[] };

const copy = {
  en: {
    title: "Students & Guardians",
    crumb: "Campus Life",
    intro: "School timings, uniform, leave and other practical information.",
    meta: "Practical information for students and guardians: school timings, uniform, leave, progress reports and contacts.",
    facts: [
      { label: "Guardian meetings", value: "Once every term" },
      { label: "Weekly holiday", value: "Friday" },
    ],
    links: [
      { title: "Class routine", text: "Period timings and the weekly class routine." },
      { title: "Exam schedule", text: "Annual examination dates and subjects." },
      { title: "Forms & downloads", text: "Leave application, TC request and more." },
      { title: "School policies", text: "Attendance, uniform, conduct and safety." },
    ],
    good: "Good to know",
    info: [
      { title: "Uniform", points: ["White shirt or kameez with the school badge", "Navy trousers or cross-belt", "Black shoes", "Navy sweater in winter"] },
      { title: "Guardian meetings", text: "Held once each term for every class. Dates go up on the notice board two weeks in advance." },
      { title: "Talking to teachers", text: "Class teachers are free after the last period on **Thursdays**, or by appointment through the office." },
      { title: "Health & absence", text: "Send a signed leave application for any absence. If a student falls ill during school, the office will call the guardian." },
    ] as Info[],
    times: "School timings",
    timings: [
      { group: "Play – Class 5", rows: [{ label: "Morning shift", value: "7:30 AM – 12:15 PM" }] },
      { group: "Class 6 – 10 · choose one shift", rows: [{ label: "Morning shift", value: "7:30 AM – 12:15 PM" }, { label: "Day shift", value: "12:30 PM – 5:00 PM" }] },
      { group: "Class 11 – 12", rows: [{ label: "Higher secondary", value: "9:00 AM – 2:30 PM" }] },
      { group: "Office", rows: [{ label: "Saturday – Thursday", value: "8:00 AM – 3:00 PM" }, { label: "Weekly holiday", value: "Friday" }] },
    ] as TimingGroup[],
    questions: "Questions? Call",
    during: "during office hours.",
  },
  bn: {
    title: "শিক্ষার্থী ও অভিভাবক",
    crumb: "ক্যাম্পাস জীবন",
    intro: "বিদ্যালয়ের সময়সূচি, পোশাক, ছুটি ও অন্যান্য দরকারি তথ্য।",
    meta: "শিক্ষার্থী ও অভিভাবকদের জন্য প্রয়োজনীয় তথ্য: বিদ্যালয়ের সময়, পোশাক, ছুটি, অগ্রগতি প্রতিবেদন ও যোগাযোগ।",
    facts: [
      { label: "অভিভাবক সভা", value: "প্রতি টার্মে একবার" },
      { label: "সাপ্তাহিক ছুটি", value: "শুক্রবার" },
    ],
    links: [
      { title: "ক্লাস রুটিন", text: "পিরিয়ডের সময় ও সাপ্তাহিক ক্লাস রুটিন।" },
      { title: "পরীক্ষার সময়সূচি", text: "বার্ষিক পরীক্ষার তারিখ ও বিষয়।" },
      { title: "ফরম ও ডাউনলোড", text: "ছুটির আবেদন, ছাড়পত্রের আবেদন ও আরও।" },
      { title: "বিদ্যালয়ের নীতিমালা", text: "উপস্থিতি, পোশাক, আচরণ ও নিরাপত্তা।" },
    ],
    good: "জেনে রাখুন",
    info: [
      { title: "পোশাক", points: ["বিদ্যালয়ের ব্যাজসহ সাদা শার্ট বা কামিজ", "নেভি প্যান্ট বা ক্রস-বেল্ট", "কালো জুতা", "শীতে নেভি সোয়েটার"] },
      { title: "অভিভাবক সভা", text: "প্রতি টার্মে প্রতিটি শ্রেণির জন্য একবার। দুই সপ্তাহ আগে নোটিশ বোর্ডে তারিখ জানানো হয়।" },
      { title: "শিক্ষকের সঙ্গে কথা", text: "**বৃহস্পতিবার** শেষ পিরিয়ডের পর শ্রেণি শিক্ষকের সঙ্গে দেখা করা যায়, অথবা অফিসের মাধ্যমে সময় নিয়ে।" },
      { title: "স্বাস্থ্য ও অনুপস্থিতি", text: "যেকোনো অনুপস্থিতির জন্য স্বাক্ষরিত ছুটির আবেদন পাঠান। ক্লাস চলাকালে অসুস্থ হলে অফিস অভিভাবককে ফোন করবে।" },
    ] as Info[],
    times: "বিদ্যালয়ের সময়সূচি",
    timings: [
      { group: "প্লে – পঞ্চম শ্রেণি", rows: [{ label: "প্রভাতি শিফট", value: "সকাল ৭:৩০ – দুপুর ১২:১৫" }] },
      { group: "ষষ্ঠ – দশম শ্রেণি · যেকোনো এক শিফট", rows: [{ label: "প্রভাতি শিফট", value: "সকাল ৭:৩০ – দুপুর ১২:১৫" }, { label: "দিবা শিফট", value: "দুপুর ১২:৩০ – বিকাল ৫:০০" }] },
      { group: "একাদশ – দ্বাদশ শ্রেণি", rows: [{ label: "উচ্চ মাধ্যমিক", value: "সকাল ৯:০০ – দুপুর ২:৩০" }] },
      { group: "অফিস", rows: [{ label: "শনিবার – বৃহস্পতিবার", value: "সকাল ৮:০০ – বিকাল ৩:০০" }, { label: "সাপ্তাহিক ছুটি", value: "শুক্রবার" }] },
    ] as TimingGroup[],
    questions: "কোনো প্রশ্ন? অফিস সময়ে",
    during: "নম্বরে ফোন করুন।",
  },
};

/** Renders **bold** segments in a short sentence. */
function withBold(text: string): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i} className="font-semibold text-heading">{part}</strong> : part));
}

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function StudentsGuardiansPage() {
  const [site, { lang }] = await Promise.all([getSite(), getI18n()]);
  const c = copy[lang];
  const factIcons = [Users, CalendarDays];

  return (
    <>
      <PageHeader
        title={c.title}
        crumbs={[{ label: c.crumb }]}
        description={c.intro}
        overlap
        aside={c.facts.map((f, i) => {
          const Icon = factIcons[i];
          return (
            <div key={f.label} className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3.5">
              <Icon aria-hidden className="size-6 shrink-0 text-navy-200" />
              <div>
                <p className="text-sm text-navy-200">{f.label}</p>
                <p className="font-semibold text-white">{f.value}</p>
              </div>
            </div>
          );
        })}
      />

      <section className="pb-14 sm:pb-16">
        <div className="container-page">
          {/* Quick links overlap the title band */}
          <ul className="relative z-10 -mt-16 grid gap-4 sm:-mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {c.links.map(({ title, text }, i) => {
              const Icon = linkIcons[i];
              return (
                <li key={hrefs[i]}>
                  <Link
                    href={hrefs[i]}
                    className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-[0_6px_24px_-10px_rgb(15_31_54/0.25)] transition-transform hover:-translate-y-0.5"
                  >
                    <span className="flex items-start justify-between">
                      <span className="flex size-12 items-center justify-center rounded-lg bg-tint text-heading">
                        <Icon aria-hidden className="size-6" />
                      </span>
                      <span className="flex size-9 items-center justify-center rounded-full bg-paper text-heading transition-colors group-hover:bg-navy-800 group-hover:text-white">
                        <ArrowRight aria-hidden className="size-4" />
                      </span>
                    </span>
                    <span className="mt-5 text-xl font-bold text-heading">{title}</span>
                    <span className="mt-1.5 leading-relaxed text-muted">{text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-12">
            <div>
              <SectionHeading title={c.good} />
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {c.info.map((item, i) => {
                  const Icon = infoIcons[i];
                  return (
                    <li key={item.title} className="rounded-lg border border-line bg-surface p-6">
                      <span className="flex size-12 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-300/15 dark:text-amber-200">
                        <Icon aria-hidden className="size-6" />
                      </span>
                      <h3 className="mt-5 text-xl font-bold text-heading">{item.title}</h3>
                      {item.points ? (
                        <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-ink marker:text-muted">
                          {item.points.map((pt) => (
                            <li key={pt}>{pt}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 leading-relaxed text-ink">{withBold(item.text ?? "")}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <SectionHeading title={c.times} />
              <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface">
                {c.timings.map((g) => (
                  <div key={g.group}>
                    <p className="border-y border-line bg-paper px-5 py-2.5 text-xs font-bold tracking-wider text-subheading uppercase first:border-t-0">{g.group}</p>
                    <dl className="divide-y divide-line">
                      {g.rows.map((r) => (
                        <div key={r.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                          <dt className="text-ink">{r.label}</dt>
                          <dd className="text-right font-bold whitespace-nowrap text-heading tabular-nums">{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">
                {c.questions}{" "}
                <a href={site.phoneHref} className="font-semibold text-heading hover:underline">
                  {site.phone}
                </a>{" "}
                {c.during}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
