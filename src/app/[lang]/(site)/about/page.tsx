import { DefaultAvatar } from "@/components/ui/DefaultAvatar";
import type { Metadata } from "next";
import { Compass, Eye, HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink, Card, DemoNote, SectionHeading } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { TeacherAvatar } from "@/components/shared/cards";
import { getFacilities, getPeople, getSetting, getSite } from "@/content/site-content";
import type { PrincipalContent } from "@/components/home/types";
import { getI18n } from "@/i18n/server";
import { toBnDigits } from "@/lib/utils";

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
    mission: "Mission",
    vision: "Vision",
    historyK: "History",
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
    mission: "লক্ষ্য",
    vision: "উদ্দেশ্য",
    historyK: "ইতিহাস",
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
  const staff = teachers.length;
  return (
    <>
      <PageHeader
        title={c.title}
        titleBn={c.alt}
        description={c.since(site.tagline, n(site.established))}
      />

      {/* Overview */}
      <section aria-labelledby="overview" className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="overview" title={c.overview} />
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
              {about.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <dt className="text-xs text-muted">{c.established}</dt>
                <dd className="font-serif text-2xl font-semibold text-heading">{n(site.established)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{c.classes}</dt>
                <dd className="font-serif text-2xl font-semibold text-heading">{c.classesVal}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{c.faculty}</dt>
                <dd className="font-serif text-2xl font-semibold text-heading">{n(staff)}</dd>
              </div>
            </dl>
          </div>
          <div>
            {about.overviewImage && (
              <Picture image={{ src: about.overviewImage, alt: c.photoAlt(lang === "bn" ? site.nameBn : site.name), width: 1600, height: 1000 }} className="rounded-lg" sizes="(min-width: 1024px) 50vw, 100vw" />
            )}
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section aria-labelledby="mission" className="border-y border-line bg-surface py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading id="mission" title={c.missionTitle} align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <Card className="h-full p-7">
                <Compass aria-hidden className="size-7 text-accent" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-heading">{c.mission}</h3>
                <p className="mt-2 leading-relaxed text-muted">{mission.mission}</p>
              </Card>
            </div>
            <div>
              <Card className="h-full p-7">
                <Eye aria-hidden className="size-7 text-accent" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-heading">{c.vision}</h3>
                <p className="mt-2 leading-relaxed text-muted">{mission.vision}</p>
              </Card>
            </div>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="rounded-md border border-line bg-paper p-5">
                <HeartHandshake aria-hidden className="size-5 text-accent" />
                <h3 className="mt-3 font-semibold text-heading">{v.title}</h3>
                <p className="mt-1 text-sm text-muted">{v.text}</p>
              </li>
            ))}
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
          </div>
          <ol className="relative border-l-2 border-line-strong pl-6">
            {milestones.map((m) => (
              <li key={m.year + m.text} className="relative pb-7 last:pb-0">
                <span aria-hidden className="absolute top-1.5 -left-[1.95rem] size-3.5 rounded-full border-2 border-white bg-leaf-600 ring-2 ring-line" />
                <p className="font-serif text-lg font-semibold text-heading">{m.year}</p>
                <p className="mt-0.5 text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Principal */}
      <section id="principal" aria-labelledby="principal-title" className="scroll-mt-24 bg-navy-950 py-16 text-white sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
          <div className="flex flex-col items-start gap-4">
            {principal.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={principal.photo} alt={principal.name} className="size-28 rounded-full object-cover" />
            ) : (
              <DefaultAvatar gender={principal.gender === "male" ? "male" : "female"} className="size-28" />
            )}
            <div>
              <p className="text-lg font-semibold">{principal.name}</p>
              <p className="text-sm text-navy-200">{principal.title}</p>
            </div>
          </div>
          <div>
            <SectionHeading id="principal-title" tone="dark" title={c.principal} />
            <div className="mt-6 space-y-4 leading-relaxed text-navy-100">
              {principal.message.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {lang === "bn" && principal.messageBn && <p>{principal.messageBn}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Campus */}
      <section aria-labelledby="campus" className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading id="campus" title={c.campus} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <li key={f.title}>
                <Card className="h-full overflow-hidden">
                  {f.image && <Picture image={{ src: f.image, alt: f.imageAlt, width: 1600, height: 1000 }} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />}
                  <div className="p-5">
                    <h3 className="font-semibold text-heading">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.text}</p>
                  </div>
                </Card>
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
            <div className="mt-6 overflow-x-auto rounded-md border border-line">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="bg-paper text-xs text-muted uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">{c.name}</th>
                    <th scope="col" className="px-4 py-3 font-semibold">{c.position}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {committee.map((c) => (
                    <tr key={c.name + c.role}>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-heading">{c.name}</span>
                        <span className="block text-xs text-muted">{c.note}</span>
                      </td>
                      <td className="px-4 py-3 text-ink">{c.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <SectionHeading title={c.staff} />
            <p className="mt-4 leading-relaxed text-muted">{about.staffText}</p>
            <ul className="mt-6 flex -space-x-3" aria-label={c.someTeachers}>
              {teachers.slice(0, 5).map((t) => (
                <li key={t.id} title={t.name}>
                  <TeacherAvatar teacher={t} />
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
