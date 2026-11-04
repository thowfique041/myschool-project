import type { Field } from "./fields";
import type { Area } from "./permissions";

/**
 * Single-document content (site settings, page copy, homepage). Stored in the
 * `settings` collection, one document per key. The homepage keeps a draft and
 * a published copy.
 */

export type SingletonConfig = {
  key: string;
  label: string;
  description: string;
  area: Area;
  fields: Field[];
  tags: string[];
  /** Draft → Publish workflow with preview */
  draftable?: boolean;
  /** Public page affected, for the "View on site" link */
  publicPath?: string;
};

const link: Field[] = [
  { name: "label", label: "Label", type: "text", required: true, span: 1 },
  { name: "href", label: "Link", type: "url", required: true, span: 1 },
];

export const homepageSectionKeys = [
  { value: "welcome", label: "Welcome & principal" },
  { value: "levels", label: "Academic levels" },
  { value: "notices", label: "Notices & admission" },
  { value: "facilities", label: "Why us & facilities" },
  { value: "results", label: "Results" },
  { value: "news", label: "News & events" },
  { value: "gallery", label: "Gallery preview" },
  { value: "people", label: "Teachers & testimonials" },
  { value: "faq", label: "FAQ & contact form" },
];

export const singletons: SingletonConfig[] = [
  {
    key: "homepage",
    label: "Homepage",
    description: "Hero, key facts, section headings and the order and visibility of homepage sections.",
    area: "website",
    draftable: true,
    publicPath: "/",
    tags: ["homepage"],
    fields: [
      { name: "heroTagline", label: "Hero tagline (Bangla)", type: "text", bn: true },
      { name: "heroTitle", label: "Hero title", type: "text", required: true },
      { name: "heroSubtitle", label: "Hero description", type: "textarea", rows: 3 },
      { name: "heroImage", label: "Hero background image", type: "image", required: true, span: 1 },
      { name: "heroImageAlt", label: "Hero image description", type: "text", span: 1 },
      { name: "heroCaption", label: "Photo caption", type: "text", span: 1 },
      { name: "primaryLabel", label: "Main button text", type: "text", span: 1 },
      { name: "primaryHref", label: "Main button link", type: "url", span: 1 },
      { name: "secondaryLabel", label: "Second button text", type: "text", span: 1 },
      { name: "secondaryHref", label: "Second button link", type: "url", span: 1 },
      {
        name: "facts",
        label: "Key facts bar",
        type: "repeater",
        itemLabel: "Fact",
        max: 4,
        fields: [
          { name: "label", label: "Label", type: "text", required: true, span: 1 },
          { name: "value", label: "Value", type: "text", required: true, span: 1 },
        ],
      },
      { name: "welcomeTitle", label: "Welcome heading", type: "text" },
      { name: "welcomeText", label: "Welcome text", type: "paragraphs", rows: 6 },
      { name: "welcomePoints", label: "Welcome highlights", type: "lines", rows: 4 },
      {
        name: "sections",
        label: "Homepage sections",
        type: "repeater",
        itemLabel: "Section",
        help: "Drag order with the arrows. Turn a section off to hide it.",
        fields: [
          { name: "key", label: "Section", type: "select", options: homepageSectionKeys, required: true, span: 1 },
          { name: "enabled", label: "Show this section", type: "boolean", span: 1 },
          { name: "kicker", label: "Small heading (Bangla)", type: "text", bn: true, span: 1 },
          { name: "title", label: "Heading", type: "text", span: 1 },
          { name: "description", label: "Description", type: "textarea", rows: 2 },
        ],
      },
    ],
  },
  {
    key: "site",
    label: "Institution Information",
    description: "Name, contact details and office hours used in the header, footer and contact page.",
    area: "settings",
    publicPath: "/contact",
    tags: ["site"],
    fields: [
      { name: "name", label: "Institution name", type: "text", required: true, span: 1 },
      { name: "nameBn", label: "Name (Bangla)", type: "text", bn: true, span: 1 },
      { name: "shortName", label: "Short name", type: "text", span: 1 },
      { name: "established", label: "Year established", type: "number", min: 1800, max: 2100, span: 1 },
      { name: "tagline", label: "Motto (English)", type: "text", span: 1 },
      { name: "taglineBn", label: "Motto (Bangla)", type: "text", bn: true, span: 1 },
      { name: "eiin", label: "EIIN", type: "text", span: 1 },
      { name: "address", label: "Address", type: "text", span: 1 },
      { name: "addressBn", label: "Address (Bangla)", type: "text", bn: true, span: 1 },
      { name: "area", label: "Short location", type: "text", span: 1, placeholder: "Upashahar, Sylhet" },
      { name: "phone", label: "Main phone", type: "phone", span: 1 },
      { name: "officePhone", label: "Office phone", type: "phone", span: 1 },
      { name: "email", label: "Main email", type: "email", span: 1 },
      { name: "admissionEmail", label: "Admission email", type: "email", span: 1 },
      { name: "officeHours", label: "Office hours", type: "text", span: 1 },
      { name: "officeHoursBn", label: "Office hours (Bangla)", type: "text", bn: true, span: 1 },
      { name: "mapUrl", label: "Google Maps link", type: "url", span: 1 },
      { name: "demoNote", label: "Notice shown on demo content", type: "textarea", rows: 2 },
    ],
  },
  {
    key: "social",
    label: "Social Media Links",
    description: "Links shown in the footer and on the contact page.",
    area: "settings",
    tags: ["site"],
    fields: [{ name: "links", label: "Social links", type: "repeater", itemLabel: "Link", fields: link }],
  },
  {
    key: "branding",
    label: "Logo, Favicon & Colours",
    description: "Replace the crest with an uploaded logo and adjust the main brand colours.",
    area: "settings",
    tags: ["site"],
    fields: [
      { name: "logo", label: "Logo image", type: "image", span: 1, help: "Leave empty to use the built-in crest" },
      { name: "favicon", label: "Favicon", type: "image", span: 1, help: "Square PNG, at least 64×64" },
      { name: "primary", label: "Primary colour (navy)", type: "color", span: 1 },
      { name: "accent", label: "Accent colour (green)", type: "color", span: 1 },
    ],
  },
  {
    key: "seo",
    label: "SEO Settings",
    description: "Default search-engine title, description and sharing image.",
    area: "settings",
    tags: ["site"],
    fields: [
      { name: "title", label: "Default page title", type: "text", required: true },
      { name: "description", label: "Meta description", type: "textarea", rows: 3, max: 300 },
      { name: "keywords", label: "Keywords", type: "lines", rows: 4 },
      { name: "ogImage", label: "Sharing image", type: "image", span: 1 },
      { name: "siteUrl", label: "Public site URL", type: "url", span: 1 },
    ],
  },
  {
    key: "maintenance",
    label: "Maintenance Mode",
    description: "Temporarily replace the public website with a maintenance message. The admin panel keeps working.",
    area: "settings",
    tags: ["site"],
    fields: [
      { name: "enabled", label: "Enable maintenance mode", type: "boolean" },
      { name: "title", label: "Heading", type: "text" },
      { name: "message", label: "Message", type: "textarea", rows: 3 },
    ],
  },
  {
    key: "navigation",
    label: "Header & Navigation",
    description: "Main menu items, dropdowns and the header button.",
    area: "website",
    tags: ["site"],
    fields: [
      { name: "ctaLabel", label: "Header button text", type: "text", span: 1 },
      { name: "ctaHref", label: "Header button link", type: "url", span: 1 },
      {
        name: "items",
        label: "Menu items",
        type: "repeater",
        itemLabel: "Menu item",
        fields: [
          ...link,
          {
            name: "children",
            label: "Dropdown links",
            type: "repeater",
            itemLabel: "Link",
            fields: [...link, { name: "description", label: "Short description", type: "text" }],
          },
        ],
      },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    description: "Footer text and the three link columns.",
    area: "website",
    tags: ["site"],
    fields: [
      { name: "about", label: "Footer description", type: "textarea", rows: 3 },
      { name: "quickTitle", label: "Column 1 heading", type: "text", span: 1 },
      { name: "quick", label: "Column 1 links", type: "repeater", itemLabel: "Link", fields: link },
      { name: "institutionTitle", label: "Column 2 heading", type: "text", span: 1 },
      { name: "institution", label: "Column 2 links", type: "repeater", itemLabel: "Link", fields: link },
      { name: "helpTitle", label: "Column 3 heading", type: "text", span: 1 },
      { name: "help", label: "Column 3 links", type: "repeater", itemLabel: "Link", fields: link },
      { name: "copyright", label: "Copyright line", type: "text" },
    ],
  },
  {
    key: "about",
    label: "About Us",
    description: "Overview, history, managing committee and staff introduction on the About page.",
    area: "website",
    publicPath: "/about",
    tags: ["about"],
    fields: [
      { name: "overview", label: "Institutional overview", type: "paragraphs", rows: 6 },
      { name: "overviewImage", label: "Overview photo", type: "image", span: 1 },
      {
        name: "milestones",
        label: "History & milestones",
        type: "repeater",
        itemLabel: "Milestone",
        fields: [
          { name: "year", label: "Year", type: "text", required: true, span: 1 },
          { name: "text", label: "What happened", type: "text", required: true, span: 1 },
        ],
      },
      {
        name: "committee",
        label: "Managing committee",
        type: "repeater",
        itemLabel: "Member",
        fields: [
          { name: "name", label: "Name", type: "text", required: true, span: 1 },
          { name: "role", label: "Position", type: "text", required: true, span: 1 },
          { name: "note", label: "Note", type: "text" },
        ],
      },
      { name: "staffText", label: "Teachers & staff introduction", type: "textarea", rows: 3 },
    ],
  },
  {
    key: "mission",
    label: "Mission & Vision",
    description: "Mission, vision and core values.",
    area: "website",
    publicPath: "/about",
    tags: ["about"],
    fields: [
      { name: "mission", label: "Mission", type: "textarea", rows: 3 },
      { name: "vision", label: "Vision", type: "textarea", rows: 3 },
      {
        name: "values",
        label: "Values",
        type: "repeater",
        itemLabel: "Value",
        fields: [
          { name: "title", label: "Value", type: "text", required: true, span: 1 },
          { name: "text", label: "Explanation", type: "text", span: 1 },
        ],
      },
    ],
  },
  {
    key: "principal",
    label: "Principal's Message",
    description: "Shown on the homepage and the About page.",
    area: "website",
    publicPath: "/about#principal",
    tags: ["about", "homepage"],
    fields: [
      { name: "name", label: "Principal's name", type: "text", required: true, span: 1 },
      { name: "title", label: "Title", type: "text", span: 1 },
      { name: "photo", label: "Photo", type: "image", span: 1 },
      { name: "quote", label: "Short quote (homepage)", type: "textarea", rows: 3 },
      { name: "message", label: "Full message", type: "paragraphs", rows: 8 },
      { name: "messageBn", label: "Message in Bangla", type: "textarea", rows: 3, bn: true },
    ],
  },
  {
    key: "admission",
    label: "Admission Information",
    description: "Circular, important dates, eligibility, procedure, documents and fees on the Admission page.",
    area: "admissions",
    publicPath: "/admission",
    tags: ["admission"],
    fields: [
      { name: "year", label: "Admission year", type: "number", min: 2000, max: 2100, span: 1 },
      { name: "open", label: "Applications open", type: "boolean", span: 1, help: "When off, the online form is hidden" },
      { name: "intro", label: "Page introduction", type: "textarea", rows: 2 },
      { name: "noticeDate", label: "Announcement date", type: "date", span: 1 },
      { name: "formFile", label: "Printable admission form (PDF)", type: "file", accept: "application/pdf", span: 1 },
      { name: "circularFile", label: "Admission circular (PDF)", type: "file", accept: "application/pdf", span: 1 },
      { name: "noticeTitleBn", label: "Announcement title (Bangla)", type: "text", bn: true },
      { name: "noticeBodyBn", label: "Announcement (Bangla)", type: "textarea", rows: 3, bn: true },
      { name: "noticeBody", label: "Announcement (English)", type: "textarea", rows: 3 },
      { name: "image", label: "Page photo", type: "image", span: 1 },
      {
        name: "dates",
        label: "Important dates",
        type: "repeater",
        itemLabel: "Date",
        fields: [
          { name: "label", label: "What", type: "text", required: true, span: 1 },
          { name: "date", label: "Date", type: "date", required: true, span: 1 },
        ],
      },
      {
        name: "eligibility",
        label: "Eligibility by class",
        type: "repeater",
        itemLabel: "Class",
        fields: [
          { name: "cls", label: "Class", type: "text", required: true, span: 1 },
          { name: "seats", label: "Seats", type: "number", min: 0, max: 5000, span: 1 },
          { name: "requirement", label: "Requirement", type: "text", span: 1 },
          { name: "selection", label: "Selection", type: "text", span: 1 },
        ],
      },
      {
        name: "steps",
        label: "Admission procedure",
        type: "repeater",
        itemLabel: "Step",
        fields: [
          { name: "title", label: "Step", type: "text", required: true, span: 1 },
          { name: "text", label: "Details", type: "text", span: 1 },
        ],
      },
      { name: "documents", label: "Required documents", type: "lines", rows: 6 },
      {
        name: "fees",
        label: "Fee table (BDT)",
        type: "repeater",
        itemLabel: "Fee",
        fields: [
          { name: "item", label: "Item", type: "text", required: true },
          { name: "primary", label: "Primary", type: "text", span: 1 },
          { name: "secondary", label: "Secondary", type: "text", span: 1 },
          { name: "higher", label: "Higher Secondary", type: "text", span: 1 },
        ],
      },
      { name: "feeNote", label: "Note under the fee table", type: "textarea", rows: 2 },
      { name: "classOptions", label: "Classes on the application form", type: "lines", rows: 6 },
    ],
  },
  {
    key: "academic",
    label: "Examination System & Grading",
    description: "Assessment overview and grading scale on the Academic page.",
    area: "academic",
    publicPath: "/academic#exams",
    tags: ["academic"],
    fields: [
      {
        name: "examSystem",
        label: "Examination system",
        type: "repeater",
        itemLabel: "Stage",
        fields: [
          { name: "title", label: "Title", type: "text", required: true, span: 1 },
          { name: "text", label: "Explanation", type: "text", span: 1 },
        ],
      },
      {
        name: "grading",
        label: "Grading scale",
        type: "repeater",
        itemLabel: "Grade",
        fields: [
          { name: "range", label: "Marks", type: "text", required: true, span: 1 },
          { name: "grade", label: "Grade", type: "text", required: true, span: 1 },
          { name: "point", label: "Point", type: "text", span: 1 },
        ],
      },
      { name: "timings", label: "Shift timings", type: "text", help: "Shown under the class routine" },
    ],
  },
  {
    key: "boardResults",
    label: "Public Exam Summary",
    description: "SSC and HSC summary figures on the homepage and Results page.",
    area: "results",
    publicPath: "/results#summary",
    tags: ["results"],
    fields: [
      { name: "isSample", label: "Label figures as sample data", type: "boolean" },
      {
        name: "rows",
        label: "Results",
        type: "repeater",
        itemLabel: "Exam",
        fields: [
          { name: "exam", label: "Exam", type: "text", required: true, span: 1 },
          { name: "year", label: "Year", type: "text", required: true, span: 1 },
          { name: "examinees", label: "Examinees", type: "number", min: 0, max: 100000, span: 1 },
          { name: "passed", label: "Passed", type: "number", min: 0, max: 100000, span: 1 },
          { name: "aPlus", label: "GPA 5.00", type: "number", min: 0, max: 100000, span: 1 },
        ],
      },
    ],
  },
];

export function getSingleton(key: string): SingletonConfig | undefined {
  return singletons.find((s) => s.key === key);
}
