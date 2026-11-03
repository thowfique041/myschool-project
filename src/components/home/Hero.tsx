import Link from "next/link";
import { ArrowRight, BellRing, BookOpenCheck, CalendarDays, Download, FileSearch, GraduationCap } from "lucide-react";
import { ButtonLink } from "@/components/ui/primitives";
import { HeroIntro, NoticeTicker } from "./motion-bits";
import { Picture } from "@/components/ui/Picture";
import { images } from "@/data/images";
import { sortedNotices } from "@/data/notices";
import { site } from "@/data/site";

const quickLinks = [
  { label: "Admission 2027", labelBn: "ভর্তি", href: "/admission", icon: GraduationCap },
  { label: "Notice Board", labelBn: "নোটিশ", href: "/notices", icon: BellRing },
  { label: "Result Search", labelBn: "ফলাফল", href: "/results", icon: FileSearch },
  { label: "Class Routine", labelBn: "রুটিন", href: "/academic#routine", icon: BookOpenCheck },
  { label: "Calendar", labelBn: "ক্যালেন্ডার", href: "/calendar", icon: CalendarDays },
  { label: "Downloads", labelBn: "ডাউনলোড", href: "/notices#downloads", icon: Download },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-paper">
      <div aria-hidden className="bg-ruled absolute inset-0 opacity-60" />
      <div className="container-page relative grid items-center gap-10 pt-8 pb-10 lg:grid-cols-[1fr_1.08fr] lg:gap-14 lg:pt-14 lg:pb-16">
        <div>
          <HeroIntro>
            <p className="inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-leaf-50 px-3 py-1 text-xs font-semibold text-leaf-700">
              <span className="size-1.5 rounded-full bg-leaf-600" aria-hidden />
              Admission open for 2027 · Play to Class 9
            </p>
          </HeroIntro>
          <HeroIntro delay={0.06}>
            <p lang="bn" className="mt-5 font-serif text-[1.35rem] font-semibold text-leaf-700 sm:text-2xl" style={{ lineHeight: 1.5 }}>
              {site.taglineBn}
            </p>
            <h1 id="hero-title" className="mt-1 font-serif text-[2.2rem] leading-[1.1] font-semibold tracking-tight text-navy-900 sm:text-5xl">
              A school where every child is known by name.
            </h1>
          </HeroIntro>
          <HeroIntro delay={0.12}>
            <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-muted">
              Webnion School &amp; College in Upashahar, Sylhet teaches from Play to Class 12 under the national curriculum — with
              disciplined classrooms, practical science and ICT, and teachers who stay in touch with every family.
            </p>
          </HeroIntro>
          <HeroIntro delay={0.18} className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/admission" variant="secondary">
              Admission 2027
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="/about" variant="outline">
              About the institution
            </ButtonLink>
          </HeroIntro>
          <HeroIntro delay={0.24}>
            <dl className="mt-9 grid max-w-lg grid-cols-[auto_1fr_auto] divide-x divide-line border-y border-line py-4">
              <div className="pr-4">
                <dt className="text-xs text-muted">Classes</dt>
                <dd className="font-serif text-base font-semibold text-navy-900 sm:text-lg">Play – 12</dd>
              </div>
              <div className="px-4">
                <dt className="text-xs text-muted">Shifts</dt>
                <dd className="font-serif text-base font-semibold text-navy-900 sm:text-lg">Morning · Day</dd>
              </div>
              <div className="pl-4">
                <dt className="text-xs text-muted">Since</dt>
                <dd className="font-serif text-base font-semibold text-navy-900 sm:text-lg">{site.established}</dd>
              </div>
            </dl>
          </HeroIntro>
        </div>

        <HeroIntro delay={0.1} className="relative">
          <div className="relative rounded-2xl bg-white p-2 shadow-[var(--shadow-lift)] ring-1 ring-line sm:p-3">
            <Picture image={images.heroCampus} priority ratio="aspect-[571/350]" sizes="(min-width: 1024px) 50vw, 100vw" className="rounded-xl" />
            <p className="px-1 pt-2 text-[0.72rem] leading-snug text-muted">Representative photo — not Webnion&apos;s campus.</p>
          </div>
        </HeroIntro>
      </div>

      <div className="container-page relative pb-8">
        <NoticeTicker notices={sortedNotices} />
        <nav aria-label="Quick access" className="mt-5">
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {quickLinks.map(({ label, labelBn, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full flex-col items-center gap-1.5 rounded-lg border border-line bg-white px-2 py-3.5 text-center transition-colors hover:border-leaf-200 hover:bg-leaf-50"
                >
                  <Icon aria-hidden className="size-5 text-leaf-600" />
                  <span className="text-[0.8rem] leading-tight font-semibold text-navy-900 sm:text-sm">{label}</span>
                  <span lang="bn" className="hidden text-xs text-muted sm:block" style={{ lineHeight: 1.3 }}>
                    {labelBn}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
