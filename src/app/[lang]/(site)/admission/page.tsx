import type { Metadata } from "next";
import { CalendarClock, CheckCircle2, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, ButtonLink, buttonClasses, Card, DemoNote, SectionHeading } from "@/components/ui/primitives";
import { SampleTag } from "@/components/ui/SampleTag";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { AdmissionForm } from "@/components/forms/AdmissionForm";
import { formatDate, toBnDigits } from "@/lib/utils";
import { getI18n } from "@/i18n/server";
import { getFaqs, getSetting, getSite } from "@/content/site-content";
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
  },
};

export default async function AdmissionPage() {
  const [a, faqs, site, { lang }] = await Promise.all([getSetting<AdmissionContent>("admission"), getFaqs(), getSite(), getI18n()]);
  const admissionYear = String(a.year);
  const c = copy[lang];
  const n = (v: string | number) => (lang === "bn" ? toBnDigits(v) : String(v));
  return (
    <>
      <PageHeader
        title={c.title(admissionYear)}
        titleBn={c.alt(admissionYear)}
        description={a.intro || undefined}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          {a.open && (
            <ButtonLink href="#apply" variant="secondary">
              {c.apply}
            </ButtonLink>
          )}
          {a.formFile && (
            <a href={a.formFile} target="_blank" rel="noopener" className={buttonClasses("light")}>
              {c.form}
            </a>
          )}
        </div>
      </PageHeader>

      {/* Announcement */}
      <section aria-labelledby="announce" className="py-16">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            {a.noticeDate && (
              <Badge tone="signal">
                {c.notice} · {formatDate(a.noticeDate, lang)}
              </Badge>
            )}
            {(lang === "bn" ? a.noticeTitleBn : a.noticeTitle) && (
              <h2 id="announce" className="mt-3 font-serif text-2xl font-semibold text-heading sm:text-3xl" style={{ lineHeight: 1.45 }}>
                {lang === "bn" ? a.noticeTitleBn : a.noticeTitle}
              </h2>
            )}
            {lang === "bn" && a.noticeBodyBn && <p className="mt-4 text-muted">{a.noticeBodyBn}</p>}
            {a.noticeBody && (
              <p className="mt-4 text-muted">
                {a.noticeBody} {c.office} {site.officePhone || site.phone}.
              </p>
            )}
          </Reveal>
          <Reveal delay={0.06}>
            {a.image && <Picture image={{ src: a.image, alt: c.photoAlt, width: 1600, height: 1000 }} className="rounded-2xl" sizes="(min-width: 1024px) 45vw, 100vw" />}
          </Reveal>
        </div>
      </section>

      {/* Dates */}
      <section aria-labelledby="dates" className="border-y border-line bg-surface py-16">
        <div className="container-page">
          <SectionHeading id="dates" kicker={c.datesK} title={c.dates} />
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {a.dates.map((d, i) => (
              <Reveal as="li" key={d.label} delay={i * 0.03} className="flex gap-3 rounded-xl border border-line bg-paper p-4">
                <CalendarClock aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-heading">{formatDate(d.date, lang)}</p>
                  <p className="text-sm text-muted">{d.label}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Eligibility */}
      <section id="eligibility" aria-labelledby="elig" className="scroll-mt-24 py-16">
        <div className="container-page">
          <SectionHeading id="elig" kicker={c.eligK} title={c.elig} description={site.demoNote ? c.eligSample : undefined} />
          <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-surface" tabIndex={0} aria-label={c.eligLabel}>
            <table className="w-full min-w-[44rem] text-left text-sm">
              <thead className="bg-brand text-xs text-white uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">{c.cls}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{c.req}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{c.sel}</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">{c.seats}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {a.eligibility.map((e) => (
                  <tr key={e.cls}>
                    <th scope="row" className="px-4 py-3 font-semibold whitespace-nowrap text-heading">
                      {e.cls}
                    </th>
                    <td className="px-4 py-3 text-ink">{e.requirement}</td>
                    <td className="px-4 py-3 text-muted">{e.selection}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{n(e.seats)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Procedure + documents */}
      <section aria-labelledby="proc" className="border-y border-line bg-surface py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading id="proc" kicker={c.procK} title={c.proc} />
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {a.steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.03} className="rounded-xl border border-line p-5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">{n(i + 1)}</span>
                  <h3 className="mt-3 font-semibold text-heading">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading kicker={c.docsK} title={c.docs} />
            <Card className="mt-8 p-6">
              <ul className="space-y-3">
                {a.documents.map((d) => (
                  <li key={d} className="flex gap-3 text-[0.95rem] text-ink">
                    <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
                    {d}
                  </li>
                ))}
              </ul>
              {a.circularFile && <a
                href={a.circularFile}
                target="_blank"
                rel="noopener"
                className="mt-6 flex items-center gap-3 rounded-lg border border-line bg-paper p-3 text-sm font-semibold text-heading hover:border-leaf-200"
              >
                <FileText aria-hidden className="size-5 text-danger" />
                {c.circular(admissionYear)}
              </a>}
            </Card>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" aria-labelledby="fees-h" className="scroll-mt-24 py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="fees-h" kicker={c.feesK} title={c.fees} description={c.feesText} />
            {site.demoNote && <SampleTag />}
          </div>
          <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-surface" tabIndex={0} aria-label={c.feeLabel}>
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">{c.feeCaption(admissionYear)}</caption>
              <thead className="border-b border-line bg-paper text-xs text-muted uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">{c.item}</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">{c.primary}</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">{c.secondary}</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">{c.higher}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {a.fees.map((f) => (
                  <tr key={f.item}>
                    <th scope="row" className="px-4 py-3 font-medium text-heading">
                      {f.item}
                    </th>
                    <td className="px-4 py-3 text-right tabular-nums">{n(f.primary)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{n(f.secondary)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{n(f.higher)}</td>
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
              kicker={c.applyK}
              title={c.applyTitle}
              description={c.applyText}
            />
            <div className="mt-8 rounded-2xl border border-line bg-paper p-5 sm:p-8">
              <AdmissionForm classOptions={a.classOptions} open={a.open} />
            </div>
          </div>
          <div>
            <SectionHeading kicker={c.faqK} title={c.faq} />
            <Accordion className="mt-8" items={faqs.filter((f) => f.topic === "admission" || f.topic === "fees")} />
          </div>
        </div>
      </section>
    </>
  );
}
