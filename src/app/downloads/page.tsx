import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, DemoNote } from "@/components/ui/primitives";
import { downloads } from "@/data/downloads";
import type { DownloadResource } from "@/types";
import { formatDateEn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Admission forms, circulars, routines, the academic calendar and other forms from Webnion School & College.",
};

const order: DownloadResource["category"][] = ["Admission", "Academic", "Forms", "Policy"];

export default function DownloadsPage() {
  return (
    <>
      <PageHeader title="Downloads" titleBn="ডাউনলোড" description="Forms and documents for students and guardians. All files are PDF." />
      <section className="py-12 sm:py-16">
        <div className="container-page max-w-5xl space-y-10">
          {order.map((cat) => {
            const list = downloads.filter((d) => d.category === cat);
            if (!list.length) return null;
            return (
              <section key={cat} aria-labelledby={`dl-${cat}`}>
                <h2 id={`dl-${cat}`} className="font-serif text-xl font-semibold text-navy-900">
                  {cat}
                </h2>
                <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-white">
                  {list.map((d) => (
                    <li key={d.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5">
                      <FileText aria-hidden className="hidden size-8 shrink-0 text-signal-600 sm:block" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-navy-900">
                          {d.title}
                          {d.titleBn && (
                            <span lang="bn" className="ml-2 text-sm font-normal text-muted">
                              {d.titleBn}
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted">{d.description}</p>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                          <Badge tone="neutral">{d.size}</Badge> Updated {formatDateEn(d.updated)}
                        </p>
                      </div>
                      <a
                        href={d.href}
                        download
                        className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold text-navy-800 hover:border-leaf-200 hover:bg-leaf-50"
                      >
                        <Download aria-hidden className="size-4" /> Download
                        <span className="sr-only"> {d.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          <DemoNote>Every file is a short sample PDF marked “for website demonstration only”.</DemoNote>
        </div>
      </section>
    </>
  );
}
