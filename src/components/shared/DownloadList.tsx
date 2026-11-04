import { Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import type { DownloadResource } from "@/types";
import { formatDate } from "@/lib/utils";
import { getI18n } from "@/i18n/server";

/** Grouped list of downloadable forms and documents, in category order. */
export async function DownloadList({ downloads }: { downloads: DownloadResource[] }) {
  const { t, lang } = await getI18n();
  const order = [...new Set(downloads.map((d) => d.category))];
  if (!downloads.length) return <p className="text-muted">{lang === "bn" ? "এখন ডাউনলোডের জন্য কোনো ফাইল নেই।" : "No files are available for download right now."}</p>;
  return (
    <div className="space-y-8">
      {order.map((cat) => {
        const list = downloads.filter((d) => d.category === cat);
        return (
          <section key={cat} aria-labelledby={`dl-${cat}`}>
            <h3 id={`dl-${cat}`} className="text-sm font-semibold tracking-wide text-muted uppercase">
              {list[0]?.categoryLabel ?? cat}
            </h3>
            <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
              {list.map((d) => (
                <li key={d.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5">
                  <FileText aria-hidden className="hidden size-7 shrink-0 text-danger sm:block" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-heading">
                      {d.title}
                    </p>
                    <p className="text-sm text-muted">{d.description}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                      <Badge tone="neutral">{d.size}</Badge> {d.updated && <>{t.common.updated} {formatDate(d.updated, lang)}</>}
                    </p>
                  </div>
                  <a
                    href={d.href}
                    download
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold text-heading hover:border-leaf-200 hover:bg-leaf-50"
                  >
                    <Download aria-hidden className="size-4" /> {t.common.download}
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
