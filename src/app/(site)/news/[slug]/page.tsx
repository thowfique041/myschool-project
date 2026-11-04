import { PhotoCredit } from "@/components/ui/PhotoCredit";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, DemoNote } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { NewsCard } from "@/components/shared/cards";
import { getArticle, getNews, getSite } from "@/content/site-content";
import { formatDateEn } from "@/lib/utils";

export async function generateStaticParams() {
  const news = await getNews();
  return news.length ? news.map((n) => ({ slug: n.slug })) : [{ slug: "none" }];
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: [{ url: article.image.src, alt: article.image.alt }] },
  };
}

export default async function NewsDetailPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const [sortedNews, site] = await Promise.all([getNews(), getSite()]);
  const more = sortedNews.filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHeader title={article.categoryLabel ?? article.category} titleBn="খবর" headingAs="p" crumbs={[{ label: "News & Events", href: "/news" }]} />
      <article className="py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <Badge tone="leaf">{article.categoryLabel ?? article.category}</Badge>
            <time dateTime={article.date}>Published {formatDateEn(article.date)}</time>
          </div>
          <h1 className="mt-4 font-serif text-3xl leading-tight font-semibold text-navy-900 sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{article.excerpt}</p>
          {(article.eventDate || article.venue) && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 rounded-xl border border-line bg-white px-5 py-4 text-sm">
              {article.eventDate && (
                <div className="flex items-center gap-2">
                  <CalendarDays aria-hidden className="size-4 text-leaf-600" />
                  <dt className="text-muted">Event date:</dt>
                  <dd className="font-semibold text-navy-900">{formatDateEn(article.eventDate)}</dd>
                </div>
              )}
              {article.venue && (
                <div className="flex items-center gap-2">
                  <MapPin aria-hidden className="size-4 text-leaf-600" />
                  <dt className="text-muted">Venue:</dt>
                  <dd className="font-semibold text-navy-900">{article.venue}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
        <div className="container-page mt-8 max-w-4xl">
          <Picture image={article.image} priority className="rounded-2xl" sizes="(min-width: 1024px) 56rem, 100vw" />
          <PhotoCredit image={article.image} prefix="Representative photo:" className="mt-2" />
        </div>
        <div className="container-page mt-8 max-w-3xl space-y-5 text-[1.05rem] leading-relaxed text-ink">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {site.demoNote && <DemoNote>This article is sample content written for a fictional institution.</DemoNote>}
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-leaf-700">
            <ArrowLeft aria-hidden className="size-4" /> All news & events
          </Link>
        </div>
      </article>
      {more.length > 0 && <section aria-labelledby="more-news" className="border-t border-line bg-white py-12 sm:py-16">
        <div className="container-page">
          <h2 id="more-news" className="font-serif text-2xl font-semibold text-navy-900">
            More news
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
