import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { BookOpen, CalendarDays, ClipboardCheck, FileDown } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/primitives";
import { getSite } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

const icons = { links: [CalendarDays, ClipboardCheck, FileDown, BookOpen] };
const hrefs = ["/academic#routine", "/results#schedule", "/notices#downloads", "/policies"];

const copy = {
  en: {
    title: "Students & Guardians",
    alt: "শিক্ষার্থী ও অভিভাবক",
    crumb: "Campus Life",
    intro: "Everything a family needs to know for a smooth school year.",
    meta: "Practical information for students and guardians: school timings, uniform, leave, progress reports and contacts.",
    links: [
      { title: "Class routine", text: "Period timings and the weekly class routine." },
      { title: "Exam schedule", text: "Annual examination dates and subjects." },
      { title: "Forms & downloads", text: "Leave application, TC request and more." },
      { title: "School policies", text: "Attendance, uniform, conduct and safety." },
    ],
    goodK: "Good to know",
    good: "Good to know",
    info: [
      { title: "Uniform", text: "White shirt or kameez with the school badge, navy trousers or cross-belt, and black shoes. Navy sweater in winter." },
      { title: "Guardian meetings", text: "Held once each term per class. Dates are announced on the notice board two weeks in advance." },
      { title: "Talking to teachers", text: "Class teachers are available after the last period on Thursdays, or by appointment through the office." },
      { title: "Health & absence", text: "Send a signed leave application for any absence. For illness during school, the office will call the guardian." },
    ],
    timesK: "School timings",
    times: "School timings",
    timings: [
      { label: "Morning shift (Play – Class 10)", value: "7:30 AM – 12:15 PM" },
      { label: "Day shift (Class 6 – 10)", value: "12:30 PM – 5:00 PM" },
      { label: "Higher secondary (Class 11 – 12)", value: "9:00 AM – 2:30 PM" },
      { label: "Office", value: "8:00 AM – 3:00 PM" },
      { label: "Weekly holiday", value: "Friday" },
    ],
    questions: "Questions? Call",
    during: "during office hours.",
  },
  bn: {
    title: "শিক্ষার্থী ও অভিভাবক",
    alt: "Students & Guardians",
    crumb: "ক্যাম্পাস জীবন",
    intro: "একটি নির্বিঘ্ন শিক্ষাবর্ষের জন্য পরিবারের যা কিছু জানা দরকার।",
    meta: "শিক্ষার্থী ও অভিভাবকদের জন্য প্রয়োজনীয় তথ্য: বিদ্যালয়ের সময়, পোশাক, ছুটি, অগ্রগতি প্রতিবেদন ও যোগাযোগ।",
    links: [
      { title: "ক্লাস রুটিন", text: "পিরিয়ডের সময় ও সাপ্তাহিক ক্লাস রুটিন।" },
      { title: "পরীক্ষার সময়সূচি", text: "বার্ষিক পরীক্ষার তারিখ ও বিষয়।" },
      { title: "ফরম ও ডাউনলোড", text: "ছুটির আবেদন, ছাড়পত্রের আবেদন ও আরও।" },
      { title: "বিদ্যালয়ের নীতিমালা", text: "উপস্থিতি, পোশাক, আচরণ ও নিরাপত্তা।" },
    ],
    goodK: "প্রয়োজনীয় তথ্য",
    good: "জেনে রাখুন",
    info: [
      { title: "পোশাক", text: "বিদ্যালয়ের ব্যাজসহ সাদা শার্ট বা কামিজ, নেভি প্যান্ট বা ক্রস-বেল্ট এবং কালো জুতা। শীতে নেভি সোয়েটার।" },
      { title: "অভিভাবক সভা", text: "প্রতি টার্মে প্রতিটি শ্রেণির জন্য একবার। দুই সপ্তাহ আগে নোটিশ বোর্ডে তারিখ জানানো হয়।" },
      { title: "শিক্ষকের সঙ্গে কথা", text: "বৃহস্পতিবার শেষ পিরিয়ডের পর শ্রেণি শিক্ষকের সঙ্গে দেখা করা যায়, অথবা অফিসের মাধ্যমে সময় নিয়ে।" },
      { title: "স্বাস্থ্য ও অনুপস্থিতি", text: "যেকোনো অনুপস্থিতির জন্য স্বাক্ষরিত ছুটির আবেদন পাঠান। ক্লাস চলাকালে অসুস্থ হলে অফিস অভিভাবককে ফোন করবে।" },
    ],
    timesK: "সময়সূচি",
    times: "বিদ্যালয়ের সময়সূচি",
    timings: [
      { label: "প্রভাতি শিফট (প্লে – দশম শ্রেণি)", value: "সকাল ৭:৩০ – দুপুর ১২:১৫" },
      { label: "দিবা শিফট (ষষ্ঠ – দশম শ্রেণি)", value: "দুপুর ১২:৩০ – বিকাল ৫:০০" },
      { label: "উচ্চ মাধ্যমিক (একাদশ – দ্বাদশ শ্রেণি)", value: "সকাল ৯:০০ – দুপুর ২:৩০" },
      { label: "অফিস", value: "সকাল ৮:০০ – বিকাল ৩:০০" },
      { label: "সাপ্তাহিক ছুটি", value: "শুক্রবার" },
    ],
    questions: "কোনো প্রশ্ন? অফিস সময়ে",
    during: "নম্বরে ফোন করুন।",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function StudentsGuardiansPage() {
  const [site, { lang }] = await Promise.all([getSite(), getI18n()]);
  const c = copy[lang];
  const links = c.links.map((l, i) => ({ ...l, href: hrefs[i], icon: icons.links[i] }));
  const info = c.info;
  const timings = c.timings;
  return (
    <>
      <PageHeader title={c.title} titleBn={c.alt} crumbs={[{ label: c.crumb }]} description={c.intro} />
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {links.map(({ title, text, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className="group block h-full rounded-md border border-line bg-surface p-5 transition-colors hover:border-leaf-200 hover:bg-leaf-50">
                  <Icon aria-hidden className="size-6 text-accent" />
                  <p className="mt-3 font-semibold text-heading group-hover:text-accent">{title}</p>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <SectionHeading kicker={c.goodK} title={c.good} />
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {info.map(({ title, text }) => (
                  <div key={title} className="py-3">
                    <dt className="font-semibold text-heading">{title}</dt>
                    <dd className="text-[0.95rem] leading-relaxed text-muted">{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <SectionHeading kicker={c.timesK} title={c.times} />
              <dl className="mt-6 divide-y divide-line rounded-md border border-line bg-surface">
                {timings.map((t) => (
                  <div key={t.label} className="flex flex-col gap-0.5 px-5 py-3.5 sm:flex-row sm:justify-between">
                    <dt className="text-sm text-muted">{t.label}</dt>
                    <dd className="font-semibold text-heading">{t.value}</dd>
                  </div>
                ))}
              </dl>
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
