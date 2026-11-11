import type { Metadata } from "next";
import { DateBlock } from "@/components/shared/cards";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { CheckCircle2, Download, FileText } from "lucide-react";
import { ButtonLink, buttonClasses, DemoNote, SectionHeading } from "@/components/ui/primitives";
import { SampleTag } from "@/components/ui/SampleTag";
import { Accordion } from "@/components/ui/Accordion";
import { AdmissionForm } from "@/components/forms/AdmissionForm";
import { formatDate, toBnDigits } from "@/lib/utils";
import { getI18n } from "@/i18n/server";
import { getFaqs, getNavigation, getSetting, getSite, getToday } from "@/content/site-content";
import type { AdmissionContent } from "@/components/home/types";

export async function generateMetadata(): Promise<Metadata> {
  const [a, site, { lang }] = await Promise.all([getSetting<AdmissionContent>("admission"), getSite(), getI18n()]);
  return lang === "bn"
    ? { title: `ভর্তি ${toBnDigits(a.year)}`, description: `${site.nameBn}-এ ভর্তি ${toBnDigits(a.year)}: যোগ্যতা, গুরুত্বপূর্ণ তারিখ, প্রয়োজনীয় কাগজপত্র, ফি ও অনলাইন আবেদন ফরম।` }
    : { title: `Admission ${a.year}`, description: `Admission ${a.year} at ${site.name}: eligibility, important dates, required documents, fees and the online application form.` };
}

const copy = {
  en: {
    title: (y: string) => `Admission ${y}`,
    alt: (y: string) => `ভর্তি ${toBnDigits(y)}`,
    apply: "Apply online",
    form: "Download printable form",
    notice: "Notice",
    office: "Admission office:",
    photoAlt: "Students at the school",
    datesK: "Important dates",
    dates: "Important dates",
    eligK: "Eligibility",
    elig: "Eligibility and class-wise requirements",
    eligSample: "Seat numbers are indicative for this demonstration.",
    eligLabel: "Eligibility table",
    cls: "Class",
    req: "Requirement",
    sel: "Selection",
    seats: "Seats",
    procK: "Admission procedure",
    proc: "Admission procedure",
    docsK: "Required documents",
    docs: "Required documents",
    circular: (y: string) => `Admission circular ${y} (PDF)`,
    feesK: "Fee structure",
    fees: "Fee information",
    feesText: "Amounts in Bangladeshi Taka (BDT).",
    feeLabel: "Fee table",
    feeCaption: (y: string) => `Fee structure for ${y} in BDT`,
    item: "Item",
    primary: "Primary",
    secondary: "Secondary",
    higher: "Higher Secondary",
    applyK: "Online application",
    applyTitle: "Admission inquiry / application form",
    applyText: "Fill in the form, then print the summary and submit it at the school office with the required documents.",
    faqK: "Admission FAQ",
    faq: "Admission FAQ",
    deadline: "Last date of form submission",
    circularBtn: "Download admission circular",
    open: "Admission open",
    closed: "Admission closed",
    next: "Next",
    done: "Completed",
    forStudent: "For the student",
    forGuardian: "From the guardian",
    perYear: "BDT",
  },
  bn: {
    title: (y: string) => `ভর্তি ${toBnDigits(y)}`,
    alt: (y: string) => `Admission ${y}`,
    apply: "অনলাইনে আবেদন",
    form: "প্রিন্টযোগ্য ফরম ডাউনলোড",
    notice: "নোটিশ",
    office: "ভর্তি অফিস:",
    photoAlt: "বিদ্যালয়ের শিক্ষার্থীরা",
    datesK: "গুরুত্বপূর্ণ তারিখ",
    dates: "গুরুত্বপূর্ণ তারিখ",
    eligK: "যোগ্যতা",
    elig: "যোগ্যতা ও শ্রেণিভিত্তিক শর্ত",
    eligSample: "আসনসংখ্যা এই ডেমোর জন্য আনুমানিক।",
    eligLabel: "যোগ্যতার সারণি",
    cls: "শ্রেণি",
    req: "শর্ত",
    sel: "বাছাই",
    seats: "আসন",
    procK: "ভর্তি প্রক্রিয়া",
    proc: "ভর্তি প্রক্রিয়া",
    docsK: "প্রয়োজনীয় কাগজপত্র",
    docs: "প্রয়োজনীয় কাগজপত্র",
    circular: (y: string) => `ভর্তি বিজ্ঞপ্তি ${toBnDigits(y)} (পিডিএফ)`,
    feesK: "ফি কাঠামো",
    fees: "ফি সংক্রান্ত তথ্য",
    feesText: "টাকার অঙ্ক বাংলাদেশি টাকায় (৳)।",
    feeLabel: "ফি-তালিকা",
    feeCaption: (y: string) => `${toBnDigits(y)} সালের ফি কাঠামো (টাকা)`,
    item: "খাত",
    primary: "প্রাথমিক",
    secondary: "মাধ্যমিক",
    higher: "উচ্চ মাধ্যমিক",
    applyK: "অনলাইন আবেদন",
    applyTitle: "ভর্তি জিজ্ঞাসা / আবেদন ফরম",
    applyText: "ফর্মটি পূরণ করে সারাংশ প্রিন্ট করুন, তারপর প্রয়োজনীয় কাগজপত্রসহ বিদ্যালয়ের অফিসে জমা দিন।",
    faqK: "ভর্তি সংক্রান্ত প্রশ্ন",
    faq: "ভর্তি সংক্রান্ত প্রশ্নোত্তর",
    deadline: "ফরম জমার শেষ তারিখ",
    circularBtn: "ভর্তি বিজ্ঞপ্তি ডাউনলোড",
    open: "ভর্তি চলছে",
    closed: "ভর্তি বন্ধ",
    next: "পরবর্তী",
    done: "সম্পন্ন",
    forStudent: "শিক্ষার্থীর জন্য",
    forGuardian: "অভিভাবকের কাছ থেকে",
    perYear: "টাকা",
  },
};

export default async function AdmissionPage() {
  const [a, faqs, site, today, nav, { lang }] = await Promise.all([getSetting<AdmissionContent>("admission"), getFaqs(), getSite(), getToday(), getNavigation(), getI18n()]);
  const admissionYear = String(a.year);
  const c = copy[lang];
  const n = (v: string | number) => (lang === "bn" ? toBnDigits(v) : String(v));
  const dates = [...a.dates].sort((x, y) => x.date.localeCompare(y.date));
  const nextDate = dates.find((d) => d.date >= today);
  // The submission deadline is the date entry whose label says so; nothing is assumed if none does.
  const deadline = dates.find((d) => /last date|শেষ তারিখ/i.test(d.label));
  const isGuardianDoc = (d: string) => /guardian|father|mother|অভিভাবক|পিতা|মাতা|বাবা|মা[য়েরর]/i.test(d);
  const docGroups: [string, string[]][] = [
    [c.forStudent, a.documents.filter((d) => !isGuardianDoc(d))],
    [c.forGuardian, a.documents.filter(isGuardianDoc)],
  ];
  // BDT with the taka sign when the value is a number ("5,000" → "৳ 5,000"); text such as "N/A" is shown as is.
  const taka = (v: string | number) => (/^[\d,.\s]+$/.test(String(v)) ? `৳ ${n(v)}` : n(v));
  return (
    <>
      {/* Hero in the homepage manner: full-width photograph with a navy text panel. */}
      <section aria-labelledby="adm-title" className="relative isolate overflow-hidden bg-navy-950 text-white">
        {a.image && <Image src={a.image} alt={c.photoAlt} fill priority sizes="100vw" className="-z-20 object-cover object-[70%_center]" />}
        <div className="container-page flex min-h-[30rem] flex-col justify-center py-10 sm:min-h-[34rem]">
          <div className="max-w-2xl rounded-md border-l-4 border-[#e8b84a] bg-navy-950/80 p-6 sm:p-8">
            <nav aria-label={lang === "bn" ? "ব্রেডক্রাম্ব" : "Breadcrumb"}>
              <ol className="flex items-center gap-1 text-sm text-navy-200">
                <li>
                  <Link href="/" className="hover:text-white hover:underline underline-offset-4">{nav.items.find((i) => i.href === "/")?.label}</Link>
                </li>
                <li aria-hidden>›</li>
                <li aria-current="page" className="text-white">{nav.items.find((i) => i.href === "/admission")?.label}</li>
              </ol>
            </nav>
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#e8b84a]">
              <span aria-hidden className={a.open ? "size-2 rounded-full bg-[#e8b84a]" : "size-2 rounded-full bg-navy-300"} />
              {a.open ? c.open : c.closed}
            </p>
            <h1 id="adm-title" className="mt-1 font-serif text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
              {lang === "bn" ? c.alt(admissionYear) : c.title(admissionYear)}
            </h1>
            {a.intro && <p className="mt-3 text-lg text-white">{a.intro}</p>}
            {deadline && (
              <p className="mt-4 text-base font-semibold text-[#f3cc6e] sm:text-lg">
                {c.deadline}: <time dateTime={deadline.date}>{formatDate(deadline.date, lang)}</time>
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {a.open && (
                <ButtonLink href="#apply" variant="secondary">
                  {c.apply}
                </ButtonLink>
              )}
              {a.circularFile && (
                <a href={a.circularFile} target="_blank" rel="noopener" download className={buttonClasses("light")}>
                  <Download aria-hidden className="size-4" />
                  {c.circularBtn}
                </a>
              )}
              {a.formFile && (
                <a href={a.formFile} target="_blank" rel="noopener" download className="text-sm font-semibold underline underline-offset-4 hover:text-navy-100">
                  {c.form}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Announcement: the official notice text */}
      {(lang === "bn" ? a.noticeTitleBn : a.noticeTitle) && (
        <section aria-labelledby="announce" className="border-b border-line py-12">
          <div className="container-page grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
            <div>
              {a.noticeDate && (
                <p className="eyebrow text-leaf-600 dark:text-accent">
                  {c.notice} · <time dateTime={a.noticeDate}>{formatDate(a.noticeDate, lang)}</time>
                </p>
              )}
              <h2 id="announce" className="mt-2 font-serif text-2xl leading-snug font-semibold text-heading">
                {lang === "bn" ? a.noticeTitleBn : a.noticeTitle}
              </h2>
            </div>
            <div className="space-y-3 border-l-2 border-leaf-600 pl-5 leading-relaxed text-ink dark:border-accent">
              {lang === "bn" && a.noticeBodyBn && <p>{a.noticeBodyBn}</p>}
              {a.noticeBody && (
                <p>
                  {a.noticeBody} {c.office} {site.officePhone || site.phone}.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Dates */}
      <section aria-labelledby="dates" className="border-y border-line bg-surface py-16">
        <div className="container-page">
          <SectionHeading id="dates" title={c.dates} />
          {/* Chronological timeline: completed dates muted, the next one highlighted. */}
          <ol className="mt-8 grid border-t-2 border-navy-800 sm:grid-cols-2 lg:grid-cols-4 dark:border-navy-300">
            {dates.map((d) => {
              const past = d.date < today;
              const isNext = d === nextDate;
              return (
                <li key={d.label} className={`lift flex gap-4 border-b border-line py-4 hover:bg-paper sm:pr-4 ${isNext ? "border-b-2 border-b-leaf-600 dark:border-b-accent" : ""}`}>
                  <DateBlock iso={d.date} className={past ? "opacity-70" : undefined} />
                  <div className="self-center">
                    <p className={`text-sm font-medium ${past ? "text-muted" : "text-heading"}`}>{d.label}</p>
                    {(isNext || past) && <p className={`eyebrow mt-1 ${isNext ? "text-leaf-600 dark:text-accent" : "text-muted"}`}>{isNext ? c.next : c.done}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Eligibility */}
      <section id="eligibility" aria-labelledby="elig" className="scroll-mt-24 py-16">
        <div className="container-page">
          <SectionHeading id="elig" title={c.elig} description={site.demoNote ? c.eligSample : undefined} />
          {/* Table on wider screens; one ruled entry per class on phones. */}
          <div className="mt-8 hidden md:block">
            <table className="w-full text-left">
              <caption className="sr-only">{c.eligLabel}</caption>
              <thead className="border-y-2 border-navy-800 dark:border-navy-300">
                <tr>
                  <th scope="col" className="eyebrow py-3 pr-4 text-subheading">{c.cls}</th>
                  <th scope="col" className="eyebrow py-3 pr-4 text-subheading">{c.req}</th>
                  <th scope="col" className="eyebrow py-3 pr-4 text-subheading">{c.sel}</th>
                  <th scope="col" className="eyebrow py-3 text-right text-subheading">{c.seats}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line border-b border-line">
                {a.eligibility.map((e) => (
                  <tr key={e.cls} className="hover:bg-surface">
                    <th scope="row" className="py-4 pr-4 font-serif text-lg font-semibold whitespace-nowrap text-heading">{e.cls}</th>
                    <td className="py-4 pr-4 text-ink">{e.requirement}</td>
                    <td className="py-4 pr-4 text-muted">{e.selection}</td>
                    <td className="py-4 text-right font-serif text-xl font-semibold text-leaf-600 tabular-nums dark:text-accent">{n(e.seats)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-8 border-t-2 border-navy-800 md:hidden dark:border-navy-300">
            {a.eligibility.map((e) => (
              <li key={e.cls} className="border-b border-line py-4">
                <p className="flex items-baseline justify-between gap-4">
                  <span className="font-serif text-lg font-semibold text-heading">{e.cls}</span>
                  <span className="text-sm text-muted">
                    {c.seats}: <span className="font-serif text-lg font-semibold text-leaf-600 dark:text-accent">{n(e.seats)}</span>
                  </span>
                </p>
                <p className="mt-1 text-ink">{e.requirement}</p>
                <p className="mt-1 text-sm text-muted">{c.sel}: {e.selection}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Procedure + documents */}
      <section aria-labelledby="proc" className="border-y border-line bg-surface py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading id="proc" title={c.proc} />
            <ol className="mt-8 grid border-t-2 border-navy-800 sm:grid-cols-2 dark:border-navy-300">
              {a.steps.map((s, i) => (
                <li key={s.title} className="lift border-b border-line py-5 hover:bg-paper sm:odd:pr-6 sm:even:pl-6">
                  <span aria-hidden className="font-serif text-sm font-semibold text-leaf-600 tabular-nums dark:text-accent">{n(String(i + 1).padStart(2, "0"))}</span>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-heading">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading title={c.docs} />
            <div className="mt-8 space-y-6">
              {docGroups.filter(([, list]) => list.length > 0).map(([label, list]) => (
                <div key={label}>
                  <h3 className="eyebrow text-subheading">{label}</h3>
                  <ul className="mt-2 border-t-2 border-navy-800 dark:border-navy-300">
                    {list.map((d) => (
                      <li key={d} className="flex gap-3 border-b border-line py-3 text-ink">
                        <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-leaf-600 dark:text-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {a.circularFile && (
                <a href={a.circularFile} target="_blank" rel="noopener" download className={buttonClasses("outline", "sm")}>
                  <FileText aria-hidden className="size-4" />
                  {c.circular(admissionYear)}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" aria-labelledby="fees-h" className="scroll-mt-24 py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="fees-h" title={c.fees} description={c.feesText} />
            {site.demoNote && <SampleTag />}
          </div>
          <div className="mt-8 overflow-x-auto" tabIndex={0} aria-label={c.feeLabel}>
            <table className="w-full min-w-[36rem] text-left">
              <caption className="sr-only">{c.feeCaption(admissionYear)}</caption>
              <thead className="border-y-2 border-navy-800 dark:border-navy-300">
                <tr>
                  <th scope="col" className="eyebrow py-3 pr-4 text-subheading">{c.item}</th>
                  {[c.primary, c.secondary, c.higher].map((h) => (
                    <th key={h} scope="col" className="w-[18%] py-3 pr-4 text-right font-serif text-lg font-semibold text-heading last:pr-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line border-b border-line tabular-nums">
                {a.fees.map((f) => (
                  <tr key={f.item} className="hover:bg-surface">
                    <th scope="row" className="py-3.5 pr-4 font-medium text-heading">{f.item}</th>
                    <td className="py-3.5 pr-4 text-right text-ink">{taka(f.primary)}</td>
                    <td className="bg-tint/40 py-3.5 pr-4 text-right text-ink">{taka(f.secondary)}</td>
                    <td className="py-3.5 text-right text-ink">{taka(f.higher)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {a.feeNote && <DemoNote className="mt-4">{a.feeNote}</DemoNote>}
        </div>
      </section>

      {/* Form + FAQ */}
      <section id="apply" aria-labelledby="apply-h" className="scroll-mt-24 border-t border-line bg-surface py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <SectionHeading
              id="apply-h"
              title={c.applyTitle}
              description={c.applyText}
            />
            <div className="mt-8 border-t-4 border-leaf-600 bg-paper p-5 sm:p-8 dark:border-accent">
              <AdmissionForm classOptions={a.classOptions} open={a.open} />
            </div>
          </div>
          <div>
            <SectionHeading title={c.faq} />
            <Accordion className="mt-8" items={faqs.filter((f) => f.topic === "admission" || f.topic === "fees")} />
          </div>
        </div>
      </section>
    </>
  );
}
