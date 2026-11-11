
export type SectionCopy = { key: string; enabled: boolean; kicker: string; title: string; description: string };

export type HomeContent = {
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroNote?: string;
  slides?: { image: string; imageAlt: string; title: string; text: string; label: string; href: string }[];
  statsText?: string;
  stats?: { key: string; label: string; value?: string }[];
  heroImage: string;
  heroImageAlt: string;
  heroCaption: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
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

export type PrincipalContent = { name: string; title: string; gender?: string; photo: string; quote: string; message: string[]; messageBn: string };
