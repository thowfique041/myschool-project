import { Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import { downloads } from "@/data/downloads";
import type { DownloadResource } from "@/types";
import { formatDateEn } from "@/lib/utils";

const order: DownloadResource["category"][] = ["Admission", "Academic", "Forms", "Policy"];

/** Grouped list of downloadable forms and documents. */
export function DownloadList() {
  return (
    <div className="space-y-8">
      {order.map((cat) => {
        const list = downloads.filter((d) => d.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} aria-labelledby={`dl-${cat}`}>
            <h3 id={`dl-${cat}`} className="text-sm font-semibold tracking-wide text-muted uppercase">
              {cat}
            </h3>
            <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-white">
              {list.map((d) => (
                <li key={d.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5">
                  <FileText aria-hidden className="hidden size-7 shrink-0 text-signal-600 sm:block" />
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
    </div>
  );
}
