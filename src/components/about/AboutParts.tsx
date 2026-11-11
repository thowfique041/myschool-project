import { DefaultAvatar } from "@/components/ui/DefaultAvatar";
import Image from "next/image";
import { Box } from "@/components/portal/Box";
import { table, tableWrap, td, th } from "@/components/portal/table";
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
// Sections of the former single About page, each now on its own route.
type About = {
  overview: string[];
  overviewImage: string;
  milestones: { year: string; text: string }[];
  committee: { role: string; name: string; note: string }[];
  staffText: string;
};
type Mission = { mission: string; vision: string; values: { title: string; text: string }[] };

async function ctx() {
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
  return { site, about, mission, principal, facilities, teachers, lang, c, n, milestones, committee, values, staff };
}

export async function OverviewPart() {
  const { site, about, lang, c } = await ctx();
  return (
    <Box id="overview" title={c.overview}>
      {about.overviewImage && (
        <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden bg-paper-dark sm:float-right sm:mb-2 sm:ml-5 sm:w-72">
          <Image src={about.overviewImage} alt={c.photoAlt(lang === "bn" ? site.nameBn : site.name)} fill sizes="18rem" className="object-cover" />
        </div>
      )}
      <div className="space-y-3 leading-relaxed text-ink">
        {about.overview.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="clear-both" />
    </Box>
  );
}

export async function MissionPart() {
  const { mission, c, values } = await ctx();
  return (
    <Box id="mission" title={c.missionTitle}>
      <p className="leading-relaxed text-muted">{c.missionIntro}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { label: c.mission, text: mission.mission },
          { label: c.vision, text: mission.vision },
        ].map(({ label, text }) => (
          <div key={label} className="border-l-4 border-navy-700 bg-tint px-4 py-3 dark:border-navy-300">
            <h3 className="font-semibold text-heading">{label}</h3>
            <p className="mt-1 leading-relaxed text-ink">{text}</p>
          </div>
        ))}
      </div>
      <h3 className="mt-6 font-semibold text-heading">{c.valuesK}</h3>
      <dl className="mt-2 divide-y divide-line border-y border-line">
        {values.map((v) => (
          <div key={v.title} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="font-semibold text-heading">{v.title}</dt>
            <dd className="leading-relaxed text-ink">{v.text}</dd>
          </div>
        ))}
      </dl>
    </Box>
  );
}

export async function HistoryPart() {
  const { site, lang, c, milestones } = await ctx();
  const sorted = [...milestones].sort((a, b) => Number(a.year) - Number(b.year));
  return (
    <Box id="history" title={c.history}>
      {site.demoNote && <p className="mb-4 text-sm text-muted">{c.historySample}</p>}
      {/* 1998 → present: a vertical line with the year on the left of each event. */}
      <ol className="relative ml-1 border-l-2 border-navy-700 dark:border-navy-300">
        {sorted.map((m) => (
          <li key={m.year + m.text} className="relative pb-6 pl-6 last:pb-0">
            <span aria-hidden className="timeline-dot absolute top-1.5 -left-[7px] size-3 bg-accent" />
            <p className="font-serif text-xl leading-none font-bold text-heading">{lang === "bn" ? toBnDigits(m.year) : m.year}</p>
            <p className="mt-1.5 leading-relaxed text-ink">{m.text}</p>
          </li>
        ))}
      </ol>
    </Box>
  );
}

export async function PrincipalPart() {
  const { principal, lang, c } = await ctx();
  return (
    <article aria-labelledby="principal-name" className="border border-line bg-surface p-5 sm:p-6">
      <figure className="mb-4 sm:float-right sm:mb-2 sm:ml-6">
        {principal.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={principal.photo} alt={principal.name} className="h-60 w-48 border border-line object-cover object-top" />
        ) : (
          <DefaultAvatar gender={principal.gender === "male" ? "male" : "female"} className="h-60 w-48 rounded-none" />
        )}
      </figure>
      <div className="space-y-4 leading-relaxed text-ink">
        {principal.message.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {lang === "bn" && principal.messageBn && <p>{principal.messageBn}</p>}
      </div>
      <p className="clear-both mt-6 border-t border-line pt-4">
        <span id="principal-name" className="block font-serif text-lg font-bold text-heading">{principal.name}</span>
        <span className="block text-sm text-muted">{principal.title}</span>
      </p>
      <span className="sr-only">{c.principal}</span>
    </article>
  );
}

export async function CampusPart() {
  const { facilities, c } = await ctx();
  return (
    <Box id="campus" title={c.campus} bodyClassName="p-0">
      <ul className="divide-y divide-line">
        {facilities.map((f) => (
          <li key={f.title} className="flex flex-col gap-4 p-4 sm:flex-row">
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-paper-dark sm:w-48">
              {f.image && <Image src={f.image} alt={f.imageAlt} fill sizes="(min-width: 640px) 12rem, 100vw" className="object-cover" />}
            </div>
            <div>
              <h3 className="font-semibold text-heading">{f.title}</h3>
              <p className="mt-1 leading-relaxed text-ink">{f.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export async function CommitteePart() {
  const { site, c, committee, lang } = await ctx();
  return (
    <>
      {site.demoNote && <p className="text-sm text-muted">{c.committeeSample}</p>}
      <div className={tableWrap}>
        <table className={`${table} min-w-[30rem]`}>
          <caption className="sr-only">{c.committee}</caption>
          <thead>
            <tr>
              <th scope="col" className={`${th} w-14`}>{lang === "bn" ? "ক্রম" : "No."}</th>
              <th scope="col" className={th}>{c.name}</th>
              <th scope="col" className={th}>{c.position}</th>
              <th scope="col" className={th}>{lang === "bn" ? "পরিচিতি" : "Note"}</th>
            </tr>
          </thead>
          <tbody>
            {committee.map((m, i) => (
              <tr key={m.name + m.role} className="hover:bg-tint">
                <td className={td}>{lang === "bn" ? toBnDigits(i + 1) : i + 1}</td>
                <th scope="row" className={`${td} font-semibold text-heading`}>{m.name}</th>
                <td className={`${td} whitespace-nowrap`}>{m.role}</td>
                <td className={`${td} text-muted`}>{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export async function StaffIntroPart() {
  const { about } = await ctx();
  return <p className="leading-relaxed text-ink">{about.staffText}</p>;
}
