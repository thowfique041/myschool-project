import type { Permission } from "@/cms/permissions";

export type NavLink = { label: string; href: string; perm: Permission; badge?: "applications" | "messages" };
export type NavGroup = { label: string; links: NavLink[] };

export const adminNav: NavGroup[] = [
  { label: "Overview", links: [{ label: "Dashboard", href: "/admin/dashboard", perm: "dashboard.view" }] },
  {
    label: "Website",
    links: [
      { label: "Homepage", href: "/admin/settings/homepage", perm: "website.view" },
      { label: "Header & navigation", href: "/admin/settings/navigation", perm: "website.view" },
      { label: "Footer", href: "/admin/settings/footer", perm: "website.view" },
      { label: "About us", href: "/admin/settings/about", perm: "website.view" },
      { label: "Mission & vision", href: "/admin/settings/mission", perm: "website.view" },
      { label: "Principal's message", href: "/admin/settings/principal", perm: "website.view" },
      { label: "Facilities", href: "/admin/content/facilities", perm: "website.view" },
      { label: "FAQs", href: "/admin/content/faqs", perm: "website.view" },
      { label: "Testimonials", href: "/admin/content/testimonials", perm: "website.view" },
      { label: "Categories", href: "/admin/content/categories", perm: "website.view" },
    ],
  },
  {
    label: "Academic",
    links: [
      { label: "Classes & levels", href: "/admin/content/levels", perm: "academic.view" },
      { label: "Subjects", href: "/admin/content/subjects", perm: "academic.view" },
      { label: "Class routines", href: "/admin/content/routines", perm: "academic.view" },
      { label: "Policies", href: "/admin/content/policies", perm: "academic.view" },
      { label: "Exam system & grading", href: "/admin/settings/academic", perm: "academic.view" },
    ],
  },
  { label: "Notices", links: [{ label: "Notices", href: "/admin/content/notices", perm: "notices.view" }] },
  {
    label: "Admissions",
    links: [
      { label: "Applications", href: "/admin/content/applications", perm: "admissions.view", badge: "applications" },
      { label: "Admission information", href: "/admin/settings/admission", perm: "admissions.view" },
    ],
  },
  { label: "Students", links: [{ label: "Students", href: "/admin/content/students", perm: "students.view" }] },
  { label: "Teachers & Staff", links: [{ label: "Teachers & staff", href: "/admin/content/teachers", perm: "teachers.view" }] },
  {
    label: "Results",
    links: [
      { label: "Examinations", href: "/admin/content/exams", perm: "results.view" },
      { label: "Results", href: "/admin/content/results", perm: "results.view" },
      { label: "Import results (CSV)", href: "/admin/results-import", perm: "results.edit" },
      { label: "Public exam summary", href: "/admin/settings/boardResults", perm: "results.view" },
    ],
  },
  {
    label: "News & Events",
    links: [
      { label: "News", href: "/admin/content/news", perm: "news.view" },
      { label: "Events & calendar", href: "/admin/content/events", perm: "news.view" },
    ],
  },
  {
    label: "Gallery",
    links: [
      { label: "Photos", href: "/admin/content/gallery", perm: "gallery.view" },
      { label: "Albums", href: "/admin/content/albums", perm: "gallery.view" },
    ],
  },
  {
    label: "Files",
    links: [
      { label: "Media library", href: "/admin/media", perm: "files.view" },
      { label: "Downloads & resources", href: "/admin/content/downloads", perm: "files.view" },
    ],
  },
  { label: "Messages", links: [{ label: "Contact messages", href: "/admin/content/messages", perm: "messages.view", badge: "messages" }] },
  {
    label: "Administration",
    links: [
      { label: "Admin users", href: "/admin/users", perm: "users.view" },
      { label: "Roles & permissions", href: "/admin/users/roles", perm: "users.view" },
      { label: "Activity log", href: "/admin/activity", perm: "activity.view" },
    ],
  },
  {
    label: "Settings",
    links: [
      { label: "Institution information", href: "/admin/settings/site", perm: "settings.view" },
      { label: "Social media", href: "/admin/settings/social", perm: "settings.view" },
      { label: "Logo & colours", href: "/admin/settings/branding", perm: "settings.view" },
      { label: "SEO", href: "/admin/settings/seo", perm: "settings.view" },
      { label: "Maintenance mode", href: "/admin/settings/maintenance", perm: "settings.view" },
    ],
  },
];
