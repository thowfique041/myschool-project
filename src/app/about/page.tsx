import { PhotoCredit } from "@/components/ui/PhotoCredit";
import type { Metadata } from "next";
import { Compass, Eye, HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink, Card, DemoNote, SectionHeading } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { TeacherAvatar } from "@/components/shared/cards";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { teachers } from "@/data/teachers";

export const metadata: Metadata = {
  title: "About Us",
  description: "History, mission, vision, values, campus and management of Webnion School & College, Sylhet.",
};

const milestones = [
  { year: "1998", text: "Founded as a primary school in Upashahar with four classrooms and 120 students." },
  { year: "2003", text: "Secondary section opened; first Class 6 batch admitted." },
  { year: "2008", text: "First SSC batch sat the public examination." },
  { year: "2012", text: "Higher secondary section (Class 11–12) added with Science, Business Studies and Humanities." },
  { year: "2017", text: "New four-storey academic building and separate science laboratories completed." },
  { year: "2021", text: "Day shift introduced for Class 6–10 to reduce section sizes." },
  { year: "2026", text: "ICT lab upgraded with 30 student workstations." },
];

const values = [
  { title: "Honesty", text: "In examinations, in work and in how we speak to one another." },
  { title: "Respect", text: "For teachers, families, classmates of every background, and our language and heritage." },
  { title: "Diligence", text: "Steady daily effort matters more than last-minute pressure." },
  { title: "Service", text: "Scouting, community clean-ups and helping younger students are part of school life." },
];

const committee = [
  { role: "Chairman", name: "Alhaj Md. Shamsul Haque", note: "Guardian representative" },
  { role: "Member Secretary", name: "Dr. Nasrin Akhter", note: "Principal" },
  { role: "Guardian member", name: "Shirin Sultana", note: "Elected guardian representative" },
  { role: "Guardian member", name: "Abdul Matin Chowdhury", note: "Elected guardian representative" },
  { role: "Teacher member", name: "Md. Abdul Kader", note: "Teachers' representative" },
  { role: "Teacher member", name: "Sabina Yasmin", note: "Teachers' representative (primary)" },
];

const facilities = [
  { title: "Classrooms", text: "36 classrooms with fans and natural light along covered verandas.", image: images.classroom },
  { title: "Science laboratories", text: "Physics, chemistry and biology labs equipped for SSC and HSC practical syllabi.", image: images.scienceLab },
  { title: "ICT lab", text: "30 workstations, a projector and supervised practical periods.", image: images.computerLab },
  { title: "Library", text: "Around 8,000 books in Bangla and English, newspapers and a reading hall.", image: images.library },
  { title: "Playground", text: "Open field for cricket, football, athletics and the annual sports day.", image: images.football },
  { title: "Auditorium & stage", text: "Used for assemblies in the rain, cultural programmes and debates.", image: images.speaker },
];

export default function AboutPage() {
  const staff = teachers.length;
  return (
    <>
      <PageHeader
        title="About Us"
        titleBn="আমাদের সম্পর্কে"
        description="A Sylhet school and college built on discipline, care and steady academic work since 1998."
      />

      {/* Overview */}
      <section aria-labelledby="overview" className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading id="overview" kicker="প্রতিষ্ঠান পরিচিতি" title="Institutional overview" />
            <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-muted">
              <p>
                {site.name} is a non-government school and college in Upashahar, Sylhet, teaching from Play to Class 12. The
                primary section runs in the morning shift; the secondary section has morning and day shifts; and the higher
                secondary section offers Science, Business Studies and Humanities.
              </p>
              <p>
                The institution follows the national curriculum and textbooks of the National Curriculum and Textbook Board
                (NCTB). Students sit the SSC and HSC public examinations under the education board.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <dt className="text-xs text-muted">Established</dt>
                <dd className="font-serif text-2xl font-semibold text-navy-900">{site.established}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Classes</dt>
                <dd className="font-serif text-2xl font-semibold text-navy-900">Play–12</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Faculty listed</dt>
                <dd className="font-serif text-2xl font-semibold text-navy-900">{staff}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.06}>
            <Picture image={images.students} className="rounded-2xl" sizes="(min-width: 1024px) 50vw, 100vw" />
            <PhotoCredit image={images.students} className="mt-2" />
          </Reveal>
        </div>
      </section>

      {/* Mission & vision */}
      <section aria-labelledby="mission" className="border-y border-line bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading id="mission" kicker="লক্ষ্য ও উদ্দেশ্য" title="Mission, vision and values" align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <Card className="h-full p-7">
                <Compass aria-hidden className="size-7 text-leaf-600" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-navy-900">Mission</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  To provide disciplined, affordable and well-supervised education under the national curriculum, so that every
                  student builds strong foundations in language, mathematics and science, and grows in character.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.06}>
              <Card className="h-full p-7">
                <Eye aria-hidden className="size-7 text-leaf-600" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-navy-900">Vision</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  To be the school Sylhet families trust for steady teaching and honest guidance — where students leave
                  confident, curious and ready to serve their community and country.
                </p>
              </Card>
            </Reveal>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.04} className="rounded-xl border border-line bg-paper p-5">
                <HeartHandshake aria-hidden className="size-5 text-leaf-600" />
                <h3 className="mt-3 font-semibold text-navy-900">{v.title}</h3>
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
              description="An illustrative timeline for this demonstration institution."
            />
          </div>
          <ol className="relative border-l-2 border-leaf-200 pl-6">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 0.03} className="relative pb-7 last:pb-0">
                <span aria-hidden className="absolute top-1.5 -left-[1.95rem] size-3.5 rounded-full border-2 border-white bg-leaf-600 ring-2 ring-leaf-200" />
                <p className="font-serif text-lg font-semibold text-navy-900">{m.year}</p>
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
            <span aria-hidden className="flex size-28 items-center justify-center rounded-full bg-white/10 font-serif text-3xl font-semibold">
              NA
            </span>
            <div>
              <p className="text-lg font-semibold">Dr. Nasrin Akhter</p>
              <p className="text-sm text-navy-200">Principal · sample profile</p>
            </div>
          </div>
          <div>
            <SectionHeading id="principal-title" tone="dark" kicker="অধ্যক্ষের বাণী" title="Principal's message" />
            <div className="mt-6 space-y-4 leading-relaxed text-navy-100">
              <p>
                Dear students and guardians, welcome. A school is judged by its results, and we take results seriously — but I
                believe the more important measure is the kind of person a student becomes during the years they spend with us.
              </p>
              <p>
                Our teachers know that children learn best when they feel safe, are expected to work hard, and are noticed when
                they struggle. That is why every section has a class teacher responsible for following up with families, and why
                we hold guardian meetings every term.
              </p>
              <p lang="bn">
                আমরা চাই আমাদের শিক্ষার্থীরা সৎ, পরিশ্রমী ও দায়িত্বশীল মানুষ হয়ে গড়ে উঠুক — নিজের ভাষা ও সংস্কৃতিকে ভালোবেসে বিশ্বের সাথে তাল মিলিয়ে চলুক।
              </p>
              <p>
                My office door is open to every guardian during office hours. Please come and talk to us — we would much rather
                hear about a concern early than late.
              </p>
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
                  <Picture image={f.image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  <div className="p-5">
                    <h3 className="font-semibold text-navy-900">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.text}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Committee & staff */}
      <section id="committee" aria-labelledby="committee-title" className="scroll-mt-24 border-t border-line bg-white py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <SectionHeading id="committee-title" kicker="পরিচালনা পর্ষদ" title="Managing committee" description="Sample committee list." />
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
                    <tr key={c.name}>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-navy-900">{c.name}</span>
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
            <p className="mt-4 leading-relaxed text-muted">
              Teaching is organised in departments — Bangla, English, Mathematics, Science, ICT, Business Studies, Humanities,
              Religion &amp; Moral Education, the Primary section and Physical Education. Office, library, laboratory and support
              staff work across both shifts.
            </p>
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
            <DemoNote className="mt-6">{site.demoNote}</DemoNote>
          </div>
        </div>
      </section>
    </>
  );
}
