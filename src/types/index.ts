export type NavChild = { label: string; labelBn?: string; href: string };

export type NavItem = {
  label: string;
  /** Bangla label; the menu and breadcrumbs use it on Bangla pages. */
  labelBn?: string;
  href: string;
  children?: NavChild[];
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Source page and photographer for licensed photos. */
  credit?: { page: string; author?: string; location?: string };
};

export type NoticeCategory = string;

export type Notice = {
  slug: string;
  title: string;
  titleEn?: string;
  category: NoticeCategory;
  categoryLabel?: string;
  categoryLabelBn?: string;
  date: string;
  important?: boolean;
  summary: string;
  body: string[];
  issuedBy: string;
  attachment?: { label: string; href: string; size: string };
};

export type NewsCategory = string;

export type NewsArticle = {
  slug: string;
  title: string;
  category: NewsCategory;
  categoryLabel?: string;
  date: string;
  eventDate?: string;
  venue?: string;
  featured?: boolean;
  excerpt: string;
  body: string[];
  image: ImageAsset;
};

export type Department = string;

export type Teacher = {
  id: string;
  name: string;
  nameBn: string;
  designation: string;
  department: Department;
  subjects: string[];
  qualification: string;
  joined: number;
  section: "Primary" | "Secondary" | "Higher Secondary" | "All";
  /** Picks the male or female placeholder picture when there is no photo. */
  gender?: "male" | "female";
  /** Placeholder demo number */
  phone: string;
  /** Placeholder demo address on the reserved .example domain */
  email: string;
  photo?: string;
  kind?: "teacher" | "staff";
};

export type GalleryCategory = string;

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  categoryLabel?: string;
  caption: string;
  captionBn: string;
  image: ImageAsset;
};

export type FaqItem = {
  question: string;
  answer: string;
  topic: "admission" | "academic" | "fees" | "general" | "results";
};

export type AcademicLevel = {
  id: string;
  name: string;
  nameBn: string;
  classes: string;
  ages: string;
  summary: string;
  highlights: string[];
  groups?: string[];
  shift?: string;
  sectionSize?: string;
};

export type CalendarEvent = {
  date: string;
  endDate?: string;
  title: string;
  titleBn: string;
  type: string;
  typeLabel?: string;
  venue?: string;
  description?: string;
};

export type ResultSubject = {
  subject: string;
  marks: number;
  grade: string;
  point: number;
};

export type StudentResult = {
  roll: string;
  registration: string;
  name: string;
  nameBn?: string;
  className: string;
  section: string;
  group?: string;
  exam: string;
  year: string;
  subjects: ResultSubject[];
  gpa: number;
  position?: number;
};

export type DownloadResource = {
  id: string;
  title: string;
  titleBn?: string;
  category: string;
  categoryLabel?: string;
  description: string;
  href: string;
  size: string;
  updated: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};
