import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { PageHeader } from "@/components/ui/PageHeader";
import { WithSidebar } from "@/components/portal/Sidebar";
import { getNews } from "@/content/site-content";
import { formatDate } from "@/lib/utils";
import { getI18n } from "@/i18n/server";

const copy = {
  en: { title: "News", meta: "Latest news, achievements and events at Webnion School & College." },
  bn: { title: "সংবাদ", meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের সর্বশেষ খবর, অর্জন ও অনুষ্ঠান।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function NewsPage() {
  const [news, { lang }] = await Promise.all([getNews(), getI18n()]);
  const c = copy[lang];
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHeader path="/news" title={c.title} />
      <WithSidebar>
        <ul className="divide-y divide-line border border-line bg-surface">
          {sorted.map((a) => (
            <li key={a.slug} className="relative flex gap-4 p-4 hover:bg-tint">
              <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden bg-paper-dark sm:w-44">
                <Image src={a.image.src} alt="" fill sizes="11rem" className="object-cover" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg leading-snug font-semibold text-heading">
                  <Link href={`/news/${a.slug}`} className="hover:text-accent hover:underline after:absolute after:inset-0">
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-muted">
                  <time dateTime={a.date}>{formatDate(a.date, lang)}</time> · {a.categoryLabel ?? a.category}
                </p>
                <p className="mt-1.5 line-clamp-2 text-ink max-sm:hidden">{a.excerpt}</p>
              </div>
            </li>
          ))}
        </ul>
      </WithSidebar>
    </>
  );
}
