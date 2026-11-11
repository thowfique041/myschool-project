import Image from "next/image";
import Link from "@/components/i18n/Link";
import { CalendarDays, ClipboardList, FileSpreadsheet, Trophy } from "lucide-react";
import { HeroSlider, type Slide } from "./HeroSlider";
import { NoticeTicker } from "./motion-bits";
import type { HomeContent } from "./types";
import { Box } from "@/components/portal/Box";
import { Sidebar } from "@/components/portal/Sidebar";
import { TeaWave } from "@/components/portal/TeaWave";
import { getGallery, getNews, getNotices, getSite } from "@/content/site-content";
import { getI18n } from "@/i18n/server";
import { formatDate } from "@/lib/utils";

const copy = {
  en: {
    intro: "About the institution",
    more: "Read more",
    quick: "Quick links",
    links: [
      { href: "/admission/apply", label: "Admission form", Icon: ClipboardList },
      { href: "/academic/routine", label: "Class routine", Icon: FileSpreadsheet },
      { href: "/results", label: "Results", Icon: Trophy },
      { href: "/academic/calendar", label: "Calendar", Icon: CalendarDays },
    ],
    news: "News",
    allNews: "All news",
    gallery: "Photo gallery",
    album: "Open album",
    allAlbums: "All albums",
  },
  bn: {
    intro: "প্রতিষ্ঠান পরিচিতি",
    more: "বিস্তারিত",
    quick: "দ্রুত লিংক",
    links: [
      { href: "/admission/apply", label: "ভর্তি ফরম", Icon: ClipboardList },
      { href: "/academic/routine", label: "ক্লাস রুটিন", Icon: FileSpreadsheet },
      { href: "/results", label: "ফলাফল", Icon: Trophy },
      { href: "/academic/calendar", label: "ক্যালেন্ডার", Icon: CalendarDays },
    ],
    news: "সংবাদ",
    allNews: "সকল সংবাদ",
    gallery: "ফটো গ্যালারি",
    album: "অ্যালবাম দেখুন",
    allAlbums: "সকল অ্যালবাম",
  },
};

/** The homepage as a school portal: a main column and the shared sidebar. */
export async function HomeView({ home }: { home: HomeContent }) {
  const [{ lang }, site, notices, news, gallery] = await Promise.all([getI18n(), getSite(), getNotices(), getNews(), getGallery()]);
  const c = copy[lang];
  const slides: Slide[] = [
    { image: home.heroImage || "/images/hero-campus.jpg", imageAlt: home.heroImageAlt, caption: home.heroTagline },
    ...(Array.isArray(home.slides) ? home.slides : []).filter((s) => s.image).map((s) => ({ image: s.image, imageAlt: s.imageAlt, caption: s.title })),
  ];
  const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const albumKey = Object.keys(gallery.categories)[0];
  const albumPhotos = gallery.items.filter((g) => g.category === albumKey).slice(0, 4);
  const sortedNotices = [...notices].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <h1 className="sr-only">{lang === "bn" ? site.nameBn : site.name}</h1>
      <div className="container-page pt-4">
        <NoticeTicker notices={sortedNotices} />
      </div>
      <TeaWave className="container-page mt-3" />
      <div className="container-page grid gap-6 py-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-6">
          <HeroSlider slides={slides} />

          <Box id="home-intro" title={c.intro}>
            <div className="space-y-3 leading-relaxed text-ink">
              {home.welcomeText.slice(0, 1).map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <Link href="/about/history" className="mt-3 inline-block font-semibold text-accent underline underline-offset-4 hover:text-heading">
              {c.more}
            </Link>
          </Box>

          <nav aria-label={c.quick}>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {c.links.map(({ href, label, Icon }) => (
                <li key={href}>
                  <Link href={href} className="quick-link flex min-h-20 flex-col items-center justify-center gap-1.5 border border-line bg-surface px-2 py-3 text-center font-semibold text-heading hover:border-navy-700 hover:bg-tint">
                    <Icon aria-hidden className="size-6 text-accent" strokeWidth={1.75} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Box id="home-news" title={c.news} href="/news" linkLabel={c.allNews} bodyClassName="p-0">
            <ul className="divide-y divide-line">
              {latestNews.map((a) => (
                <li key={a.slug} className="relative flex gap-4 p-4 hover:bg-tint">
                  <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden bg-paper-dark sm:w-36">
                    <Image src={a.image.src} alt="" fill sizes="9rem" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold leading-snug text-heading">
                      <Link href={`/news/${a.slug}`} className="hover:text-accent hover:underline after:absolute after:inset-0">
                        {a.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-muted">{formatDate(a.date, lang)}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-ink max-sm:hidden">{a.excerpt}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Box>

          <TeaWave />

          {albumKey && (
            <Box id="home-gallery" title={c.gallery} href="/gallery" linkLabel={c.allAlbums}>
              <h3 className="font-semibold text-heading">{gallery.categories[albumKey]}</h3>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {albumPhotos.map((g) => (
                  <li key={g.id} className="relative aspect-[4/3] overflow-hidden bg-paper-dark">
                    <Image src={g.image.src} alt={g.image.alt} fill sizes="(min-width: 640px) 12rem, 50vw" className="object-cover" />
                  </li>
                ))}
              </ul>
              <Link href={`/gallery/${albumKey}`} className="mt-3 inline-block text-sm font-semibold text-accent underline underline-offset-4 hover:text-heading">
                {c.album}
              </Link>
            </Box>
          )}
        </div>
        <Sidebar />
      </div>
    </>
  );
}
