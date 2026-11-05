import { PhotoCredit } from "@/components/ui/PhotoCredit";
import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, DemoNote } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { NewsCard } from "@/components/shared/cards";
import { getArticle, getNews, getSite } from "@/content/site-content";
import { formatDate } from "@/lib/utils";
import { getI18n } from "@/i18n/server";

export async function generateStaticParams() {
  const news = await getNews();
  return news.length ? news.map((n) => ({ slug: n.slug })) : [{ slug: "none" }];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "404" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: [{ url: article.image.src, alt: article.image.alt }] },
  };
}

export default async function NewsDetailPage({ params }: PageProps<"/[lang]/news/[slug]">) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const [sortedNews, site, { t, lang }] = await Promise.all([getNews(), getSite(), getI18n()]);
  const more = sortedNews.filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHeader title={article.categoryLabel ?? article.category} titleBn={lang === "bn" ? "News" : "খবর"} headingAs="p" crumbs={[{ label: lang === "bn" ? "খবর ও অনুষ্ঠান" : "News & Events", href: "/news" }]} />
      <article className="py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <Badge tone="leaf">{article.categoryLabel ?? article.category}</Badge>
            <time dateTime={article.date}>
              {t.news.publishedOn} {formatDate(article.date, lang)}
            </time>
          </div>
          <h1 className="mt-4 font-serif text-3xl leading-tight font-semibold text-heading sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{article.excerpt}</p>
          {(article.eventDate || article.venue) && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 rounded-md border border-line bg-surface px-5 py-4 text-sm">
              {article.eventDate && (
                <div className="flex items-center gap-2">
                  <CalendarDays aria-hidden className="size-4 text-accent" />
                  <dt className="text-muted">{t.news.eventDate}</dt>
                  <dd className="font-semibold text-heading">{formatDate(article.eventDate, lang)}</dd>
                </div>
              )}
              {article.venue && (
                <div className="flex items-center gap-2">
                  <MapPin aria-hidden className="size-4 text-accent" />
                  <dt className="text-muted">{t.news.venue}</dt>
                  <dd className="font-semibold text-heading">{article.venue}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
        <div className="container-page mt-8 max-w-4xl">
          <Picture image={article.image} priority className="rounded-lg" sizes="(min-width: 1024px) 56rem, 100vw" />
          <PhotoCredit image={article.image} className="mt-2" />
        </div>
        <div className="container-page mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {site.demoNote && <DemoNote>{t.news.sampleNote}</DemoNote>}
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-heading hover:text-accent">
            <ArrowLeft aria-hidden className="size-4" /> {t.news.backAll}
          </Link>
        </div>
      </article>
      {more.length > 0 && <section aria-labelledby="more-news" className="border-t border-line bg-surface py-12 sm:py-16">
        <div className="container-page">
          <h2 id="more-news" className="font-serif text-2xl font-semibold text-heading">
            {t.news.more}
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((a) => (
              <li key={a.slug}>
                <NewsCard article={a} />
              </li>
            ))}
          </ul>
        </div>
      </section>}
    </>
  );
}
