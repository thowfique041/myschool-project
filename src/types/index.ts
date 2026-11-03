export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type NoticeCategory = "admission" | "exam" | "academic" | "holiday" | "event" | "general";

export type Notice = {
  slug: string;
  title: string;
  titleEn?: string;
  category: NoticeCategory;
  date: string;
  important?: boolean;
  summary: string;
  body: string[];
  issuedBy: string;
  attachment?: { label: string; href: string; size: string };
};

export type NewsCategory = "event" | "achievement" | "academic" | "campus" | "culture" | "sports";

export type NewsArticle = {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  eventDate?: string;
  venue?: string;
  featured?: boolean;
  excerpt: string;
  body: string[];
  image: ImageAsset;
};

export type Department =
  | "Administration"
  | "Bangla"
  | "English"
  | "Mathematics"
  | "Science"
  | "ICT"
  | "Business Studies"
  | "Humanities"
  | "Religion & Moral Education"
  | "Primary Section"
  | "Physical Education";

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
};

export type GalleryCategory = "campus" | "classroom" | "sports" | "cultural" | "events";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
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
};

export type CalendarEvent = {
  date: string;
  endDate?: string;
  title: string;
  titleBn: string;
  type: "exam" | "holiday" | "event" | "academic" | "admission";
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
  category: "Admission" | "Academic" | "Forms" | "Policy";
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
