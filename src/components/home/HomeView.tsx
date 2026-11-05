import { Hero } from "./Hero";
import {
  FaqContactSection,
  GalleryPreview,
  LevelsSection,
  NewsSection,
  NoticesAdmissionSection,
  PeopleSection,
  ResultsSection,
  StatsSection,
  WelcomeSection,
  WhyFacilitiesSection,
} from "./sections";
import type { HomeContent, HomeData, SectionCopy } from "./types";
import {
  getAcademic,
  getCurrentYear,
  getBoardResults,
  getFacilities,
  getFaqs,
  getGallery,
  getNews,
  getNotices,
  getPeople,
  getSetting,
  getSite,
  getTestimonials,
} from "@/content/site-content";
import type { AdmissionContent, PrincipalContent } from "./types";
import { getI18n } from "@/i18n/server";

export async function loadHomeData(): Promise<HomeData> {
  const [{ t, lang }, site, notices, news, gallery, people, academic, faqs, testimonials, facilities, admission, principal, board, year] = await Promise.all([
    getI18n(),
    getSite(),
    getNotices(),
    getNews(),
    getGallery(),
    getPeople(),
    getAcademic(),
    getFaqs(),
    getTestimonials(),
    getFacilities(),
    getSetting<AdmissionContent>("admission"),
    getSetting<PrincipalContent>("principal"),
    getBoardResults(),
    getCurrentYear(),
  ]);
  return { t, lang, site, notices, news, gallery: gallery.items, people, levels: academic.levels, faqs, testimonials, facilities, admission, principal, board, year };
}

/** Renders the homepage from its CMS content: enabled sections, in the saved order. */
export function HomeView({ home, data: base }: { home: HomeContent; data: HomeData }) {
  const data: HomeData = { ...base, slideImages: [home.heroImage, ...(home.slides ?? []).map((s) => s.image)].filter(Boolean) };
  const sections: SectionCopy[] = Array.isArray(home.sections) ? home.sections : [];
  return (
    <>
      <Hero home={home} notices={data.notices} />
      {sections
        .filter((s) => s.enabled)
        .map((copy) => {
          switch (copy.key) {
            case "welcome":
              return <WelcomeSection key={copy.key} home={home} copy={copy} data={data} />;
            case "levels":
              return <LevelsSection key={copy.key} copy={copy} data={data} />;
            case "notices":
              return <NoticesAdmissionSection key={copy.key} copy={copy} data={data} />;
            case "facilities":
              return <WhyFacilitiesSection key={copy.key} copy={copy} data={data} />;
            case "stats":
              return <StatsSection key={copy.key} home={home} copy={copy} data={data} />;
            case "results":
              return <ResultsSection key={copy.key} copy={copy} data={data} />;
            case "news":
              return <NewsSection key={copy.key} copy={copy} data={data} />;
            case "gallery":
              return <GalleryPreview key={copy.key} copy={copy} data={data} />;
            case "people":
              return <PeopleSection key={copy.key} copy={copy} data={data} />;
            case "faq":
              return <FaqContactSection key={copy.key} copy={copy} data={data} />;
            default:
              return null;
          }
        })}
    </>
  );
}
