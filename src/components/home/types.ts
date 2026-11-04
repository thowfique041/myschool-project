import type { AcademicLevel, FaqItem, GalleryItem, NewsArticle, Notice, Teacher, Testimonial } from "@/types";
import type { SiteInfo } from "@/content/site-content";
import type { Dictionary } from "@/i18n/dict";
import type { Locale } from "@/i18n/config";

export type SectionCopy = { key: string; enabled: boolean; kicker: string; title: string; description: string };

export type HomeContent = {
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  heroCaption: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  facts: { label: string; value: string }[];
  welcomeTitle: string;
  welcomeText: string[];
  welcomePoints: string[];
  sections: SectionCopy[];
};

export type AdmissionContent = {
  year: number | string;
  open: boolean;
  intro: string;
  noticeDate: string;
  formFile: string;
  circularFile: string;
  noticeTitle: string;
  noticeTitleBn: string;
  noticeBodyBn: string;
  noticeBody: string;
  image: string;
  dates: { label: string; date: string }[];
  eligibility: { cls: string; requirement: string; selection: string; seats: number | string }[];
  steps: { title: string; text: string }[];
  documents: string[];
  fees: { item: string; primary: string; secondary: string; higher: string }[];
  feeNote: string;
  classOptions: string[];
};

export type PrincipalContent = { name: string; title: string; photo: string; quote: string; message: string[]; messageBn: string };

export type HomeData = {
  t: Dictionary;
  lang: Locale;
  site: SiteInfo;
  notices: Notice[];
  news: NewsArticle[];
  gallery: GalleryItem[];
  people: Teacher[];
  levels: AcademicLevel[];
  faqs: FaqItem[];
  testimonials: Testimonial[];
  facilities: { title: string; text: string; image: string; imageAlt: string }[];
  admission: AdmissionContent;
  principal: PrincipalContent;
  board: { isSample: boolean; rows: { exam: string; year: string; examinees: number; passed: number; aPlus: number }[] };
};
