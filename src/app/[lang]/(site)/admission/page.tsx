import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { ButtonLink, DemoNote } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { Box } from "@/components/portal/Box";
import { WithSidebar } from "@/components/portal/Sidebar";
import { table, td, th } from "@/components/portal/table";
import { formatDate, toBnDigits } from "@/lib/utils";
import { getI18n } from "@/i18n/server";
import { getSetting, getSite } from "@/content/site-content";
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
    apply: "Apply online",
    form: "Download printable form",
    notice: "Notice",
    office: "Admission office:",
    photoAlt: "Students at the school",
    datesK: "Important dates",
    dates: "Important dates",
    date: "Date",
    event: "Event",
    formDl: "Admission form",
    formText: "Download the printable form, or fill in the application online.",
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
    apply: "অনলাইনে আবেদন",
    form: "প্রিন্টযোগ্য ফরম ডাউনলোড",
    notice: "নোটিশ",
    office: "ভর্তি অফিস:",
    photoAlt: "বিদ্যালয়ের শিক্ষার্থীরা",
    datesK: "গুরুত্বপূর্ণ তারিখ",
    dates: "গুরুত্বপূর্ণ তারিখ",
    date: "তারিখ",
    event: "বিষয়",
    formDl: "ভর্তি ফরম",
    formText: "প্রিন্টযোগ্য ফরম ডাউনলোড করুন, অথবা অনলাইনে আবেদন করুন।",
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
  const [a, site, { lang }] = await Promise.all([getSetting<AdmissionContent>("admission"), getSite(), getI18n()]);
  const admissionYear = String(a.year);
  const c = copy[lang];
  const n = (v: string | number) => (lang === "bn" ? toBnDigits(v) : String(v));
  const dates = [...a.dates].sort((x, y) => x.date.localeCompare(y.date));
  const isGuardianDoc = (d: string) => /guardian|father|mother|অভিভাবক|পিতা|মাতা|বাবা|মা[য়েরর]/i.test(d);
  const docGroups: [string, string[]][] = [
    [c.forStudent, a.documents.filter((d) => !isGuardianDoc(d))],
    [c.forGuardian, a.documents.filter(isGuardianDoc)],
  ];
  // BDT with the taka sign when the value is a number ("5,000" → "৳ 5,000"); text such as "N/A" is shown as is.
  const taka = (v: string | number) => (/^[\d,.\s]+$/.test(String(v)) ? `৳ ${n(v)}` : n(v));
  const noticeTitle = lang === "bn" ? a.noticeTitleBn : a.noticeTitle;
  const fileLink = "inline-flex items-center gap-2 text-sm font-semibold text-accent underline underline-offset-4 hover:text-heading";
  return (
    <>
      <PageHeader path="/admission" title={c.title(admissionYear)} />
      <WithSidebar>
        <Box id="announce" title={c.notice}>
          <p className="text-sm text-muted">
            {a.open ? c.open : c.closed}
            {a.noticeDate && (
              <>
                {" · "}
                <time dateTime={a.noticeDate}>{formatDate(a.noticeDate, lang)}</time>
              </>
            )}
          </p>
          {noticeTitle && <h3 className="mt-1 text-lg font-semibold text-heading">{noticeTitle}</h3>}
          <div className="mt-2 space-y-3 leading-relaxed text-ink">
            {a.intro && <p>{a.intro}</p>}
            {lang === "bn" && a.noticeBodyBn && <p>{a.noticeBodyBn}</p>}
            {a.noticeBody && (
              <p>
                {a.noticeBody} {c.office} {site.officePhone || site.phone}.
              </p>
            )}
          </div>
          {a.circularFile && (
            <a href={a.circularFile} target="_blank" rel="noopener" download className={`${fileLink} mt-3`}>
              <FileText aria-hidden className="size-4" />
              {c.circular(admissionYear)}
            </a>
          )}
        </Box>

        <Box id="dates" title={c.dates} bodyClassName="p-0">
          <table className={table}>
            <caption className="sr-only">{c.dates}</caption>
            <thead>
              <tr>
                <th scope="col" className={`${th} w-40`}>{c.date}</th>
                <th scope="col" className={th}>{c.event}</th>
              </tr>
            </thead>
            <tbody>
              {dates.map((d) => (
                <tr key={d.label}>
                  <td className={`${td} whitespace-nowrap`}>
                    <time dateTime={d.date}>{formatDate(d.date, lang)}</time>
                  </td>
                  <td className={td}>{d.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        <Box id="elig" title={c.elig} bodyClassName="p-0">
          {site.demoNote && <p className="px-4 pt-3 text-sm text-muted">{c.eligSample}</p>}
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={c.eligLabel}>
            <table className={`${table} min-w-[36rem]`}>
              <caption className="sr-only">{c.eligLabel}</caption>
              <thead>
                <tr>
                  <th scope="col" className={th}>{c.cls}</th>
                  <th scope="col" className={th}>{c.req}</th>
                  <th scope="col" className={th}>{c.sel}</th>
                  <th scope="col" className={`${th} text-right`}>{c.seats}</th>
                </tr>
              </thead>
              <tbody>
                {a.eligibility.map((e) => (
                  <tr key={e.cls}>
                    <th scope="row" className={`${td} font-semibold whitespace-nowrap text-heading`}>{e.cls}</th>
                    <td className={td}>{e.requirement}</td>
                    <td className={td}>{e.selection}</td>
                    <td className={`${td} text-right tabular-nums`}>{n(e.seats)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>

        <Box id="proc" title={c.proc}>
          {/* The only numbered list on the site: the order of the steps matters. */}
          <ol className="list-decimal space-y-3 pl-6 marker:font-semibold marker:text-accent">
            {a.steps.map((s) => (
              <li key={s.title}>
                <h3 className="font-semibold text-heading">{s.title}</h3>
                <p className="text-ink">{s.text}</p>
              </li>
            ))}
          </ol>
        </Box>

        <Box id="docs" title={c.docs}>
          <div className="grid gap-5 sm:grid-cols-2">
            {docGroups
              .filter(([, list]) => list.length > 0)
              .map(([label, list]) => (
                <div key={label}>
                  <h3 className="font-semibold text-heading">{label}</h3>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-ink marker:text-muted">
                    {list.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </Box>

        <Box id="fees-h" title={c.fees} bodyClassName="p-0">
          <p className="px-4 pt-3 text-sm text-muted">{c.feesText}</p>
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={c.feeLabel}>
            <table className={`${table} min-w-[34rem]`}>
              <caption className="sr-only">{c.feeCaption(admissionYear)}</caption>
              <thead>
                <tr>
                  <th scope="col" className={th}>{c.item}</th>
                  {[c.primary, c.secondary, c.higher].map((h) => (
                    <th key={h} scope="col" className={`${th} text-right`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {a.fees.map((f) => (
                  <tr key={f.item}>
                    <th scope="row" className={`${td} font-medium text-heading`}>{f.item}</th>
                    <td className={`${td} text-right`}>{taka(f.primary)}</td>
                    <td className={`${td} text-right`}>{taka(f.secondary)}</td>
                    <td className={`${td} text-right`}>{taka(f.higher)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {a.feeNote && <DemoNote className="m-4">{a.feeNote}</DemoNote>}
        </Box>

        <Box id="form-dl" title={c.formDl}>
          <p className="text-ink">{c.formText}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
            {a.formFile && (
              <a href={a.formFile} target="_blank" rel="noopener" download className={fileLink}>
                <Download aria-hidden className="size-4" />
                {c.form}
              </a>
            )}
            {a.open && (
              <ButtonLink href="/admission/apply" variant="secondary" size="sm">
                {c.apply}
              </ButtonLink>
            )}
          </div>
        </Box>
      </WithSidebar>
    </>
  );
}
