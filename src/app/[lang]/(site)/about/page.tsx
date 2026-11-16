import { DefaultAvatar } from "@/components/ui/DefaultAvatar";
import type { Metadata } from "next";
import Image from "next/image";
import { CampusCircles } from "@/components/shared/CampusCircles";
import { Compass, Eye } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink, DemoNote, SectionHeading } from "@/components/ui/primitives";
import { getFacilities, getPeople, getSetting, getSite } from "@/content/site-content";
import type { PrincipalContent } from "@/components/home/types";
import { getI18n } from "@/i18n/server";
import { cn, toBnDigits } from "@/lib/utils";

const copy = {
  en: {
    title: "About Us",
    alt: "আমাদের সম্পর্কে",
    meta: "History, mission, vision, values, campus and management of the institution.",
    since: (tagline: string, y: string) => `${tagline}, since ${y}.`,
    overviewK: "Institution overview",
    overview: "Institutional overview",
    established: "Established",
    classes: "Classes",
    classesVal: "Play–12",
    faculty: "Faculty listed",
    photoAlt: (name: string) => `Students at ${name}`,
    missionK: "Mission & vision",
    missionTitle: "Mission, vision and values",
    mission: "Our mission",
    vision: "Our vision",
    missionKicker: "What we stand for",
    missionIntro: "Three ideas guide every classroom, every exam and every conversation with families at Webnion.",
    valuesK: "Our four values",
    historyK: "History",
    campusPhotos: "Around the campus",
    circles: ["Main building", "Science lab", "Library", "Playground"],
    history: "History and milestones",
    historySample: "An illustrative timeline for this demonstration institution.",
    principalK: "Principal's message",
    principal: "Principal's message",
    campusK: "Campus & facilities",
    campus: "Campus and facilities",
    committeeK: "Managing committee",
    committee: "Managing committee",
    committeeSample: "Sample committee list.",
    name: "Name",
    position: "Position",
    staffK: "Teachers & staff",
    staff: "Teachers and staff",
    someTeachers: "Some of our teachers",
    directory: "View faculty directory",
  },
  bn: {
    title: "আমাদের সম্পর্কে",
    alt: "About Us",
    meta: "প্রতিষ্ঠানের ইতিহাস, লক্ষ্য, উদ্দেশ্য, মূল্যবোধ, ক্যাম্পাস ও ব্যবস্থাপনা।",
    since: (tagline: string, y: string) => `${tagline} ${y} সাল থেকে।`,
    overviewK: "প্রতিষ্ঠান পরিচিতি",
    overview: "প্রতিষ্ঠান পরিচিতি",
    established: "প্রতিষ্ঠা",
    classes: "শ্রেণি",
    classesVal: "প্লে–১২",
    faculty: "তালিকাভুক্ত শিক্ষক",
    photoAlt: (name: string) => `${name}-এর শিক্ষার্থীরা`,
    missionK: "লক্ষ্য ও উদ্দেশ্য",
    missionTitle: "লক্ষ্য, উদ্দেশ্য ও মূল্যবোধ",
    mission: "আমাদের লক্ষ্য",
    vision: "আমাদের উদ্দেশ্য",
    missionKicker: "আমরা যা মেনে চলি",
    missionIntro: "এই তিনটি ভাবনা ওয়েবনিয়নের প্রতিটি ক্লাস, প্রতিটি পরীক্ষা এবং অভিভাবকদের সঙ্গে প্রতিটি আলাপে পথ দেখায়।",
    valuesK: "আমাদের চারটি মূল্যবোধ",
    historyK: "ইতিহাস",
    campusPhotos: "ক্যাম্পাসের কিছু ছবি",
    circles: ["মূল ভবন", "বিজ্ঞানাগার", "গ্রন্থাগার", "খেলার মাঠ"],
    history: "ইতিহাস ও মাইলফলক",
    historySample: "এই ডেমো প্রতিষ্ঠানের জন্য একটি প্রতীকী সময়রেখা।",
    principalK: "অধ্যক্ষের বাণী",
    principal: "অধ্যক্ষের বাণী",
    campusK: "ক্যাম্পাস ও সুবিধাসমূহ",
    campus: "ক্যাম্পাস ও সুযোগ-সুবিধা",
    committeeK: "পরিচালনা পর্ষদ",
    committee: "পরিচালনা পর্ষদ",
    committeeSample: "নমুনা পর্ষদ তালিকা।",
    name: "নাম",
    position: "পদ",
    staffK: "শিক্ষক ও কর্মচারী",
    staff: "শিক্ষক ও কর্মচারী",
    someTeachers: "আমাদের কয়েকজন শিক্ষক",
    directory: "শিক্ষক তালিকা দেখুন",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

type About = {
  overview: string[];
  overviewImage: string;
  milestones: { year: string; text: string }[];
  committee: { role: string; name: string; note: string }[];
  staffText: string;
};
/** Splits "Main idea, so that more…" into a lead sentence and a follow-up line. */
function splitLead(text: string, bangla: boolean): [string, string] {
  const m = text.match(/^(.+?),\s+((?:so that|where|যাতে|যেখান).+)$/);
  if (!m) return [text, ""];
  const end = bangla ? "।" : ".";
  const rest = m[2].charAt(0).toUpperCase() + m[2].slice(1);
  return [m[1] + end, rest];
}

type Mission = { mission: string; vision: string; values: { title: string; text: string }[] };

export default async function AboutPage() {
  const [site, about, mission, principal, facilities, teachers] = await Promise.all([
    getSite(),
    getSetting<About>("about"),
    getSetting<Mission>("mission"),
    getSetting<PrincipalContent>("principal"),
    getFacilities(),
    getPeople(),
  ]);
  const { lang } = await getI18n();
  const c = copy[lang];
  const n = (v: string | number) => (lang === "bn" ? toBnDigits(v) : String(v));
  const { milestones, committee } = about;
  const values = mission.values;
  const cap = lang === "bn" ? "" : "uppercase tracking-[0.16em]";
  const staff = teachers.length;
  const departments = [...teachers.reduce((m, t) => m.set(t.department, (m.get(t.department) ?? 0) + 1), new Map<string, number>())];
  return (
    <>
      <PageHeader
        title={c.title}
        titleBn={c.alt}
        description={c.since(site.tagline, n(site.established))}
      />

      {/* Overview: large photograph bleeding to the left edge, text on the page grid, figures on a ruled strip. */}
      <section aria-labelledby="overview" className="border-b border-line">
        <div className="grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div className="relative aspect-[4/3] bg-paper-dark sm:aspect-[16/9] lg:aspect-auto lg:min-h-[32rem]">
            {about.overviewImage && (
              <Image src={about.overviewImage} alt={c.photoAlt(lang === "bn" ? site.nameBn : site.name)} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            )}
          </div>
          <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:py-16 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pl-12">
            <SectionHeading id="overview" title={c.overview} />
            <div className="mt-5 space-y-4 leading-relaxed text-ink">
              {about.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-3 border-t-2 border-forest-800 dark:border-forest-300">
              {[
                [c.established, n(site.established)],
                [c.classes, c.classesVal],
                [c.faculty, n(staff)],
              ].map(([k, v]) => (
                <div key={k} className="pt-4 pr-3 not-first:border-l not-first:border-line not-first:pl-4">
                  <dd className="font-serif text-3xl font-semibold text-heading">{v}</dd>
                  <dt className="mt-1 text-sm text-muted">{k}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section aria-labelledby="mission" className="border-y border-line bg-surface py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-end lg:gap-12">
            <div>
              <p className={`text-xs font-bold text-subheading ${cap}`}>{c.missionKicker}</p>
              <h2 id="mission" className="mt-2 font-serif text-2xl leading-tight font-semibold text-heading">
                {c.missionTitle}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted sm:text-lg">{c.missionIntro}</p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {/* Mission and vision: matching green cards */}
            {[
              { Icon: Compass, label: c.mission, text: mission.mission },
              { Icon: Eye, label: c.vision, text: mission.vision },
            ].map(({ Icon, label, text }) => {
              const [lead, rest] = splitLead(text, lang === "bn");
              return (
                <article key={label} className="lift relative isolate overflow-hidden bg-forest-900 p-6 text-white sm:p-7 dark:bg-forest-950 dark:ring-1 dark:ring-white/10">
                  <Icon aria-hidden strokeWidth={1.25} className="absolute -right-8 -bottom-10 -z-10 size-40 text-white/[0.06]" />
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-on-brand-accent">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h3 className={`text-sm font-bold text-on-brand-accent ${cap}`}>{label}</h3>
                  </div>
                  <p className="mt-4 font-serif text-xl leading-snug font-semibold">{lead}</p>
                  {rest && <p className="mt-3 max-w-lg text-sm leading-relaxed text-forest-100">{rest}</p>}
                </article>
              );
            })}
          </div>

          <h3 className={`mt-14 text-xs font-bold text-subheading ${cap}`}>{c.valuesK}</h3>
          <ul className="mt-5 grid border-t-2 border-b border-t-forest-800 border-b-line sm:grid-cols-2 lg:grid-cols-4 dark:border-t-forest-300">
            {values.map((v, i) => {
              return (
                <li key={v.title} className="lift border-line px-1 py-7 hover:bg-paper sm:px-7 not-first:border-t sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(even)]:border-l lg:not-first:border-t-0 lg:not-first:border-l">
                  <span aria-hidden className="font-serif text-3xl font-semibold text-crimson-600 dark:text-accent">{n(String(i + 1).padStart(2, "0"))}</span>
                  <h4 className="mt-4 font-serif text-xl font-semibold text-heading">{v.title}</h4>
                  <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* History */}
      <section aria-labelledby="history" className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              id="history"
              title={c.history}
              description={site.demoNote ? c.historySample : undefined}
            />
            {/* Four overlapping round photos of the campus */}
            <CampusCircles labels={c.circles} listLabel={c.campusPhotos} className="mt-10" />
          </div>
          {/* Timeline: year in the margin, ruled entries, a burgundy marker on the spine. */}
          <ol className="border-t-2 border-forest-800 dark:border-forest-300">
            {milestones.map((m) => (
              <li key={m.year + m.text} className="grid grid-cols-[5.5rem_1fr] gap-x-6 border-b border-line py-5 sm:grid-cols-[7rem_1fr]">
                <p className="font-serif text-3xl leading-none font-semibold text-crimson-600 tabular-nums sm:text-4xl dark:text-accent">{lang === "bn" ? toBnDigits(m.year) : m.year}</p>
                <p className="self-center leading-relaxed text-ink">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Principal: message on the left, photo on the right */}
      <section id="principal" aria-labelledby="principal-title" className="scroll-mt-24 border-t-4 border-crimson-600 bg-forest-950 py-16 text-white sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <div>
            <SectionHeading id="principal-title" tone="dark" title={c.principal} />
            <div className="mt-6 space-y-4 border-l-2 border-crimson-500 pl-5 leading-relaxed text-forest-100">
              {principal.message.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {lang === "bn" && principal.messageBn && <p>{principal.messageBn}</p>}
            </div>
          </div>
          <div className="order-first flex flex-col items-center gap-4 text-center lg:order-none">
            {principal.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={principal.photo} alt={principal.name} className="size-48 rounded-full border-[6px] border-forest-950 object-cover object-top ring-2 ring-white/80 sm:size-56" />
            ) : (
              <DefaultAvatar gender={principal.gender === "male" ? "male" : "female"} className="size-48 sm:size-56" />
            )}
            <div>
              <p className="font-serif text-2xl font-semibold">{principal.name}</p>
              <p className="eyebrow mt-1 text-on-brand-accent">{principal.title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campus */}
      <section aria-labelledby="campus" className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading id="campus" title={c.campus} />
          {/* Asymmetric grid: the first facility leads at double size; text sits under each photo. */}
          <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((f, i) => (
              <li key={f.title} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : i >= 3 ? "sm:col-span-2" : ""}>
                <div className={cn("relative bg-paper-dark", i === 0 ? "aspect-[4/3] lg:aspect-[5/4]" : i >= 3 ? "aspect-[16/7]" : "aspect-[4/3]")}>
                  {f.image && <Image src={f.image} alt={f.imageAlt} fill sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"} className="object-cover" />}
                </div>
                <div className="mt-4 border-l-2 border-crimson-600 pl-4 dark:border-accent">
                  <h3 className={cn("font-serif font-semibold text-heading", i === 0 ? "text-2xl" : "text-lg")}>{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Committee & staff */}
      <section id="committee" aria-labelledby="committee-title" className="scroll-mt-24 border-t border-line bg-surface py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <SectionHeading id="committee-title" title={c.committee} description={site.demoNote ? c.committeeSample : undefined} />
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[26rem] text-left">
                <thead className="border-y-2 border-forest-800 dark:border-forest-300">
                  <tr>
                    <th scope="col" className="eyebrow py-3 pr-4 text-subheading">{c.name}</th>
                    <th scope="col" className="eyebrow py-3 text-subheading">{c.position}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line border-b border-line">
                  {committee.map((c) => (
                    <tr key={c.name + c.role} className="hover:bg-paper">
                      <td className="py-4 pr-4">
                        <span className="block font-serif text-lg font-semibold text-heading">{c.name}</span>
                        <span className="block text-sm text-muted">{c.note}</span>
                      </td>
                      <td className="py-4 align-top font-medium whitespace-nowrap text-crimson-600 dark:text-accent">{c.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <SectionHeading title={c.staff} />
            <p className="mt-4 leading-relaxed text-muted">{about.staffText}</p>
            {/* Departments with the number of people listed in the directory. */}
            <ul className="mt-6 grid grid-cols-2 border-t-2 border-forest-800 sm:grid-cols-3 dark:border-forest-300">
              {departments.map(([d, count]) => (
                <li key={d} className="flex items-baseline justify-between gap-3 border-b border-line py-3 pr-4">
                  <span className="text-sm text-ink">{d}</span>
                  <span className="font-serif text-lg font-semibold text-heading tabular-nums">{n(count)}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href="/teachers" variant="primary" className="mt-6">
              {c.directory}
            </ButtonLink>
            {site.demoNote && <DemoNote className="mt-6">{site.demoNote}</DemoNote>}
          </div>
        </div>
      </section>
    </>
  );
}
