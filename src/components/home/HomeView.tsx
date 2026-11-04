import { Hero } from "./Hero";
import {
  FaqContactSection,
  GalleryPreview,
  LevelsSection,
  NewsSection,
  NoticesAdmissionSection,
  PeopleSection,
  ResultsSection,
  WelcomeSection,
  WhyFacilitiesSection,
} from "./sections";
import type { HomeContent, HomeData, SectionCopy } from "./types";
import {
  getAcademic,
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

export async function loadHomeData(): Promise<HomeData> {
  const [site, notices, news, gallery, people, academic, faqs, testimonials, facilities, admission, principal, board] = await Promise.all([
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
  ]);
  return { site, notices, news, gallery: gallery.items, people, levels: academic.levels, faqs, testimonials, facilities, admission, principal, board };
}

/** Renders the homepage from its CMS content: enabled sections, in the saved order. */
export function HomeView({ home, data }: { home: HomeContent; data: HomeData }) {
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
