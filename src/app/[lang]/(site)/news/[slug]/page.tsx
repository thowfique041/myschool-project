import { PhotoCredit } from "@/components/ui/PhotoCredit";
import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { WithSidebar } from "@/components/portal/Sidebar";
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
  const [site, { t, lang }] = await Promise.all([getSite(), getI18n()]);
  const meta = [
    article.eventDate && `${t.news.eventDate}: ${formatDate(article.eventDate, lang)}`,
    article.venue && `${t.news.venue}: ${article.venue}`,
  ].filter(Boolean);

  return (
    <>
      <PageHeader path="/news" current={article.title} title={article.title} headingAs="p" />
      <WithSidebar>
        <article className="border border-line bg-surface p-5 sm:p-8">
          <h1 className="font-serif text-2xl leading-snug font-bold text-heading sm:text-3xl">{article.title}</h1>
          <p className="mt-2 text-sm text-muted">
            <time dateTime={article.date}>{formatDate(article.date, lang)}</time> · {article.categoryLabel ?? article.category}
          </p>
          <div className="mt-5">
            <Picture image={article.image} priority sizes="(min-width: 1024px) 48rem, 100vw" />
            <PhotoCredit image={article.image} className="mt-2" />
          </div>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink">
            <p>{article.excerpt}</p>
            {meta.length > 0 && <p className="text-sm text-muted">{meta.join(" · ")}</p>}
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-6 border-t border-line pt-4">
            <Link href="/news" className="text-sm font-semibold text-accent underline underline-offset-4 hover:text-heading">
              {lang === "bn" ? "সকল সংবাদ" : "All news"}
            </Link>
          </p>
        </article>
        {site.demoNote && <DemoNote>{t.news.sampleNote}</DemoNote>}
      </WithSidebar>
    </>
  );
}
