import type { Metadata } from "next";
import { Compass, Eye, HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink, Card, DemoNote, SectionHeading } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { TeacherAvatar } from "@/components/shared/cards";
import { getFacilities, getPeople, getSetting, getSite } from "@/content/site-content";
import type { PrincipalContent } from "@/components/home/types";

export const metadata: Metadata = {
  title: "About Us",
  description: "History, mission, vision, values, campus and management of the institution.",
};

type About = {
  overview: string[];
  overviewImage: string;
  milestones: { year: string; text: string }[];
  committee: { role: string; name: string; note: string }[];
  staffText: string;
};
type Mission = { mission: string; vision: string; values: { title: string; text: string }[] };

const initials = (name: string) =>
  name
    .replace(/^(Dr|Md|Mr|Mrs|Ms|Alhaj)\.?\s+/gi, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default async function AboutPage() {
  const [site, about, mission, principal, facilities, teachers] = await Promise.all([
    getSite(),
    getSetting<About>("about"),
    getSetting<Mission>("mission"),
    getSetting<PrincipalContent>("principal"),
    getFacilities(),
    getPeople(),
  ]);
  const { milestones, committee } = about;
  const values = mission.values;
  const staff = teachers.length;
  return (
    <>
      <PageHeader
        title="About Us"
        titleBn="আমাদের সম্পর্কে"
        description={`${site.tagline} — since ${site.established}.`}
      />

      {/* Overview */}
      <section aria-labelledby="overview" className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading id="overview" kicker="প্রতিষ্ঠান পরিচিতি" title="Institutional overview" />
            <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-muted">
              {about.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <dt className="text-xs text-muted">Established</dt>
                <dd className="font-serif text-2xl font-semibold text-heading">{site.established}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Classes</dt>
                <dd className="font-serif text-2xl font-semibold text-heading">Play–12</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Faculty listed</dt>
                <dd className="font-serif text-2xl font-semibold text-heading">{staff}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.06}>
            {about.overviewImage && (
              <Picture image={{ src: about.overviewImage, alt: `Students at ${site.name}`, width: 1600, height: 1000 }} className="rounded-2xl" sizes="(min-width: 1024px) 50vw, 100vw" />
            )}
          </Reveal>
        </div>
      </section>

      {/* Mission & vision */}
      <section aria-labelledby="mission" className="border-y border-line bg-surface py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading id="mission" kicker="লক্ষ্য ও উদ্দেশ্য" title="Mission, vision and values" align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <Card className="h-full p-7">
                <Compass aria-hidden className="size-7 text-accent" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-heading">Mission</h3>
                <p className="mt-2 leading-relaxed text-muted">{mission.mission}</p>
              </Card>
            </Reveal>
            <Reveal delay={0.06}>
              <Card className="h-full p-7">
                <Eye aria-hidden className="size-7 text-accent" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-heading">Vision</h3>
                <p className="mt-2 leading-relaxed text-muted">{mission.vision}</p>
              </Card>
            </Reveal>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.04} className="rounded-xl border border-line bg-paper p-5">
                <HeartHandshake aria-hidden className="size-5 text-accent" />
                <h3 className="mt-3 font-semibold text-heading">{v.title}</h3>
                <p className="mt-1 text-sm text-muted">{v.text}</p>
              </Reveal>
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
              kicker="ইতিহাস"
              title="History and milestones"
              description={site.demoNote ? "An illustrative timeline for this demonstration institution." : undefined}
            />
          </div>
          <ol className="relative border-l-2 border-leaf-200 pl-6">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year + m.text} delay={i * 0.03} className="relative pb-7 last:pb-0">
                <span aria-hidden className="absolute top-1.5 -left-[1.95rem] size-3.5 rounded-full border-2 border-white bg-leaf-600 ring-2 ring-leaf-200" />
                <p className="font-serif text-lg font-semibold text-heading">{m.year}</p>
                <p className="mt-0.5 text-muted">{m.text}</p>
              </Reveal>
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
              <span aria-hidden className="flex size-28 items-center justify-center rounded-full bg-white/10 font-serif text-3xl font-semibold">
                {initials(principal.name)}
              </span>
            )}
            <div>
              <p className="text-lg font-semibold">{principal.name}</p>
              <p className="text-sm text-navy-200">{principal.title}</p>
            </div>
          </div>
          <div>
            <SectionHeading id="principal-title" tone="dark" kicker="অধ্যক্ষের বাণী" title="Principal's message" />
            <div className="mt-6 space-y-4 leading-relaxed text-navy-100">
              {principal.message.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {principal.messageBn && <p lang="bn">{principal.messageBn}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Campus */}
      <section aria-labelledby="campus" className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading id="campus" kicker="ক্যাম্পাস ও সুবিধাসমূহ" title="Campus and facilities" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f, i) => (
              <Reveal as="li" key={f.title} delay={(i % 3) * 0.05}>
                <Card className="h-full overflow-hidden">
                  {f.image && <Picture image={{ src: f.image, alt: f.imageAlt, width: 1600, height: 1000 }} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />}
                  <div className="p-5">
                    <h3 className="font-semibold text-heading">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.text}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Committee & staff */}
      <section id="committee" aria-labelledby="committee-title" className="scroll-mt-24 border-t border-line bg-surface py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <SectionHeading id="committee-title" kicker="পরিচালনা পর্ষদ" title="Managing committee" description={site.demoNote ? "Sample committee list." : undefined} />
            <div className="mt-6 overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="bg-paper text-xs text-muted uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Position</th>
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
            <SectionHeading kicker="শিক্ষক ও কর্মচারী" title="Teachers and staff" />
            <p className="mt-4 leading-relaxed text-muted">{about.staffText}</p>
            <ul className="mt-6 flex -space-x-3" aria-label="Some of our teachers">
              {teachers.slice(0, 5).map((t) => (
                <li key={t.id} title={t.name}>
                  <TeacherAvatar teacher={t} />
                </li>
              ))}
            </ul>
            <ButtonLink href="/teachers" variant="primary" className="mt-6">
              View faculty directory
            </ButtonLink>
            {site.demoNote && <DemoNote className="mt-6">{site.demoNote}</DemoNote>}
          </div>
        </div>
      </section>
    </>
  );
}
