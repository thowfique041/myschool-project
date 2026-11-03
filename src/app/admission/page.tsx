import type { Metadata } from "next";
import { CalendarClock, CheckCircle2, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, ButtonLink, buttonClasses, Card, DemoNote, SampleTag, SectionHeading } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { AdmissionForm } from "@/components/forms/AdmissionForm";
import { admissionDates, admissionSteps, admissionYear, eligibility, fees, requiredDocuments } from "@/data/admission";
import { faqs } from "@/data/faqs";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { formatDateBn, formatDateEn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Admission ${admissionYear}`,
  description: `Admission ${admissionYear} at Webnion School & College: eligibility, important dates, required documents, sample fees and an inquiry form.`,
};

export default function AdmissionPage() {
  return (
    <>
      <PageHeader
        title={`Admission ${admissionYear}`}
        titleBn={`ভর্তি ${admissionYear}`}
        description="Applications are open for Play to Class 9. Class 11 admission follows the national online admission schedule."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="#apply" variant="secondary">
            Apply / Inquire online
          </ButtonLink>
          <a href="/downloads/admission-form-2027.pdf" download className={buttonClasses("light")}>
            Download printable form
          </a>
        </div>
      </PageHeader>

      {/* Announcement */}
      <section aria-labelledby="announce" className="py-16">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Badge tone="signal">Notice · {formatDateEn("2026-11-01")}</Badge>
            <h2 id="announce" lang="bn" className="mt-3 font-serif text-2xl font-semibold text-navy-900 sm:text-3xl" style={{ lineHeight: 1.45 }}>
              ২০২৭ শিক্ষাবর্ষে প্লে থেকে নবম শ্রেণিতে ভর্তি বিজ্ঞপ্তি
            </h2>
            <p lang="bn" className="mt-4 text-muted">
              ২০২৭ শিক্ষাবর্ষে প্লে, নার্সারি এবং প্রথম থেকে নবম শ্রেণির শূন্য আসনে ভর্তির জন্য আবেদন গ্রহণ করা হচ্ছে। আবেদন ফরম{" "}
              {formatDateBn("2026-11-10")} থেকে {formatDateBn("2026-12-03")} পর্যন্ত প্রতিষ্ঠানের অফিস ও ওয়েবসাইট থেকে সংগ্রহ করা যাবে।
            </p>
            <p className="mt-4 text-muted">
              Forms are available from {formatDateEn("2026-11-10")} to {formatDateEn("2026-12-03")} at the school office and on
              the Downloads page. Questions? Call the admission office on {site.phone}.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <Picture image={images.admission} className="rounded-2xl" sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
        </div>
      </section>

      {/* Dates */}
      <section aria-labelledby="dates" className="border-y border-line bg-white py-16">
        <div className="container-page">
          <SectionHeading id="dates" kicker="গুরুত্বপূর্ণ তারিখ" title="Important dates" />
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {admissionDates.map((d, i) => (
              <Reveal as="li" key={d.label} delay={i * 0.03} className="flex gap-3 rounded-xl border border-line bg-paper p-4">
                <CalendarClock aria-hidden className="mt-0.5 size-5 shrink-0 text-leaf-600" />
                <div>
                  <p className="font-semibold text-navy-900">{formatDateEn(d.date)}</p>
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
          <SectionHeading id="elig" kicker="যোগ্যতা" title="Eligibility and class-wise requirements" description="Seat numbers are indicative for this demonstration." />
          <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-white" tabIndex={0} aria-label="Eligibility table">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <thead className="bg-navy-800 text-xs text-white uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Class</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Requirement</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Selection</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Seats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {eligibility.map((e) => (
                  <tr key={e.cls}>
                    <th scope="row" className="px-4 py-3 font-semibold whitespace-nowrap text-navy-900">
                      {e.cls}
                    </th>
                    <td className="px-4 py-3 text-ink">{e.requirement}</td>
                    <td className="px-4 py-3 text-muted">{e.selection}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{e.seats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Procedure + documents */}
      <section aria-labelledby="proc" className="border-y border-line bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading id="proc" kicker="ভর্তি প্রক্রিয়া" title="Admission procedure" />
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {admissionSteps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.03} className="rounded-xl border border-line p-5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-navy-800 text-sm font-semibold text-white">{i + 1}</span>
                  <h3 className="mt-3 font-semibold text-navy-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading kicker="প্রয়োজনীয় কাগজপত্র" title="Required documents" />
            <Card className="mt-8 p-6">
              <ul className="space-y-3">
                {requiredDocuments.map((d) => (
                  <li key={d} className="flex gap-3 text-[0.95rem] text-ink">
                    <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-leaf-600" />
                    {d}
                  </li>
                ))}
              </ul>
              <a
                href="/downloads/admission-circular-2027.pdf"
                download
                className="mt-6 flex items-center gap-3 rounded-lg border border-line bg-paper p-3 text-sm font-semibold text-navy-900 hover:border-leaf-200"
              >
                <FileText aria-hidden className="size-5 text-signal-600" />
                Admission circular 2027 (sample PDF)
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" aria-labelledby="fees-h" className="scroll-mt-24 py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="fees-h" kicker="ফি কাঠামো" title="Fee information" description="Amounts in Bangladeshi Taka (BDT)." />
            <SampleTag />
          </div>
          <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-white" tabIndex={0} aria-label="Sample fee table">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">Sample fee structure for 2027 in BDT</caption>
              <thead className="border-b border-line bg-paper text-xs text-muted uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Item</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Primary</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Secondary</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Higher Secondary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {fees.map((f) => (
                  <tr key={f.item}>
                    <th scope="row" className="px-4 py-3 font-medium text-navy-900">
                      {f.item}
                    </th>
                    <td className="px-4 py-3 text-right tabular-nums">{f.primary}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{f.secondary}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{f.higher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DemoNote className="mt-4">
            These fees are sample figures for the demonstration and are not the fees of any real institution. Partial fee waivers
            are described in the FAQ below.
          </DemoNote>
        </div>
      </section>

      {/* Form + FAQ */}
      <section id="apply" aria-labelledby="apply-h" className="scroll-mt-24 border-t border-line bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <SectionHeading
              id="apply-h"
              kicker="অনলাইন আবেদন"
              title="Admission inquiry / application form"
              description="Frontend demonstration — the form validates your entries and shows a confirmation, but does not send data anywhere."
            />
            <div className="mt-8 rounded-2xl border border-line bg-paper p-5 sm:p-8">
              <AdmissionForm />
            </div>
          </div>
          <div>
            <SectionHeading kicker="ভর্তি সংক্রান্ত প্রশ্ন" title="Admission FAQ" />
            <Accordion className="mt-8" items={faqs.filter((f) => f.topic === "admission" || f.topic === "fees")} />
          </div>
        </div>
      </section>
    </>
  );
}
