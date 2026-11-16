import { Download, FileText } from "lucide-react";
import type { DownloadResource } from "@/types";
import { formatDate, toBnDigits } from "@/lib/utils";
import { getI18n } from "@/i18n/server";

/** Grouped list of downloadable forms and documents, in category order. */
/** Display order for the document library; any other category follows in data order. */
const ORDER = ["admission", "academic", "forms", "policy"];

export async function DownloadList({ downloads }: { downloads: DownloadResource[] }) {
  const { t, lang } = await getI18n();
  const cats = [...new Set(downloads.map((d) => d.category))];
  const order = [...cats].sort((a, b) => (ORDER.indexOf(a.toLowerCase()) + 1 || 99) - (ORDER.indexOf(b.toLowerCase()) + 1 || 99));
  const type = (d: DownloadResource) => (d.href.split("?")[0].split(".").pop() ?? "").toUpperCase() || d.size;
  if (!downloads.length) return <p className="text-muted">{lang === "bn" ? "এখন ডাউনলোডের জন্য কোনো ফাইল নেই।" : "No files are available for download right now."}</p>;
  return (
    <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
      {order.map((cat) => {
        const list = downloads.filter((d) => d.category === cat);
        return (
          <section key={cat} aria-labelledby={`dl-${cat}`}>
            <h3 id={`dl-${cat}`} className="flex items-baseline justify-between font-serif text-xl font-semibold text-heading">
              {list[0]?.categoryLabel ?? cat}
              <span className="text-sm font-normal text-muted tabular-nums">{lang === "bn" ? toBnDigits(list.length) : list.length}</span>
            </h3>
            <ul className="mt-3 border-t-2 border-forest-800 dark:border-forest-300">
              {list.map((d) => (
                <li key={d.id} className="flex items-start gap-4 border-b border-line py-4">
                  <span aria-hidden className="mt-0.5 flex w-11 shrink-0 flex-col items-center border border-line-strong py-1.5 text-[0.65rem] font-bold tracking-wider text-crimson-600 dark:text-accent">
                    <FileText className="mb-0.5 size-4" />
                    {type(d)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-heading">{d.title}</p>
                    <p className="text-sm text-muted">{d.description}</p>
                    <p className="mt-1 text-xs text-muted">
                      {type(d)}
                      {d.updated && <> · {t.common.updated} {formatDate(d.updated, lang)}</>}
                    </p>
                  </div>
                  <a
                    href={d.href}
                    download
                    target="_blank"
                    rel="noopener"
                    aria-label={`${t.common.download}: ${d.title} (${type(d)})`}
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-line-strong px-3 text-sm font-semibold text-heading hover:border-heading hover:bg-surface"
                  >
                    <Download aria-hidden className="size-4" />
                    <span className="hidden sm:inline">{t.common.download}</span>
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
