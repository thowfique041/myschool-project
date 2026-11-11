import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Box } from "@/components/portal/Box";
import { FullWidth } from "@/components/portal/Sidebar";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSite } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Contact Us",
    alt: "যোগাযোগ",
    meta: "Address, phone, email, office hours and a contact form for Webnion School & College, Sylhet.",
    intro: "Call during office hours, message us on WhatsApp, or visit the school office.",
    callOffice: "Call office",
    whatsapp: "WhatsApp",
    directions: "Directions",
    getDirections: "Get directions",
    callNow: "Call now",
    writeEmail: "Write an email",
    landline: "Landline:",
    general: "For general questions",
    closedFri: "Closed on Friday",
    openNow: "Open now",
    closedNow: "Closed now",
    sendNote: "Fields marked * are required. The office replies during working hours.",
    who: "Who to contact",
    whoAdmission: "Admission",
    whoOffice: "School office",
    whoOfficeSub: "Fees, certificates and documents",
    whoPrincipal: "Principal's office",
    byAppt: "By appointment",
    openMaps: "Open in Maps",
    callLabel: (who: string) => `Call ${who}`,
    mailLabel: (who: string) => `Email ${who}`,
    address: "Address",
    phone: "Phone",
    email: "Email",
    hours: "Office hours",
    office: "Office:",
    admission: "Admission:",
    sendK: "Send a message",
    send: "Send a message",
    findK: "Location",
    find: "Find us",
    map: "Map:",
    follow: "Follow us",
    map1: "Location sketch",
    map2: "A simplified sketch map showing the school near a main road and a park in Upashahar. Not to scale.",
    park: "Park",
    road: "Main Road",
    river: "River",
    mapNote: "Sketch map, not to scale.",
  },
  bn: {
    title: "যোগাযোগ",
    alt: "Contact Us",
    meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজ, সিলেটের ঠিকানা, ফোন, ইমেইল, অফিস সময় ও যোগাযোগ ফর্ম।",
    intro: "অফিস সময়ে ফোন করুন, হোয়াটসঅ্যাপে বার্তা পাঠান অথবা সরাসরি বিদ্যালয়ের অফিসে আসুন।",
    callOffice: "অফিসে ফোন",
    whatsapp: "হোয়াটসঅ্যাপ",
    directions: "পথনির্দেশ",
    getDirections: "পথনির্দেশ দেখুন",
    callNow: "এখনই ফোন করুন",
    writeEmail: "ইমেইল লিখুন",
    landline: "ল্যান্ডলাইন:",
    general: "সাধারণ জিজ্ঞাসার জন্য",
    closedFri: "শুক্রবার বন্ধ",
    openNow: "এখন খোলা",
    closedNow: "এখন বন্ধ",
    sendNote: "* চিহ্নিত ঘরগুলো পূরণ করা আবশ্যক। অফিস সময়ে উত্তর দেওয়া হয়।",
    who: "কার সঙ্গে যোগাযোগ করবেন",
    whoAdmission: "ভর্তি",
    whoOffice: "বিদ্যালয়ের অফিস",
    whoOfficeSub: "ফি, সনদ ও কাগজপত্র",
    whoPrincipal: "অধ্যক্ষের কার্যালয়",
    byAppt: "সময় নিয়ে সাক্ষাৎ",
    openMaps: "ম্যাপে খুলুন",
    callLabel: (who: string) => `${who}: ফোন করুন`,
    mailLabel: (who: string) => `${who}: ইমেইল করুন`,
    address: "ঠিকানা",
    phone: "ফোন",
    email: "ইমেইল",
    hours: "অফিস সময়",
    office: "অফিস:",
    admission: "ভর্তি:",
    sendK: "বার্তা পাঠান",
    send: "বার্তা পাঠান",
    findK: "অবস্থান",
    find: "আমাদের অবস্থান",
    map: "মানচিত্র:",
    follow: "আমাদের অনুসরণ করুন",
    map1: "অবস্থানের নকশা",
    map2: "উপশহরে প্রধান সড়ক ও একটি পার্কের কাছে বিদ্যালয়ের অবস্থান দেখানো সরল নকশা। মাপ অনুযায়ী নয়।",
    park: "পার্ক",
    road: "প্রধান সড়ক",
    river: "নদী",
    mapNote: "নকশা মানচিত্র, মাপ অনুযায়ী নয়।",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

function MapPlaceholder({ c }: { c: (typeof copy)["en"] | (typeof copy)["bn"] }) {
  return (
    <figure className="overflow-hidden">
      <svg viewBox="0 0 640 380" role="img" aria-labelledby="map-title map-desc" className="h-auto w-full">
        <title id="map-title">{c.map1}</title>
        <desc id="map-desc">{c.map2}</desc>
        <rect width="640" height="380" fill="#eef2ec" />
        <path d="M0 250 C160 230 260 300 640 260 V380 H0Z" fill="#cfe3ee" />
        <rect x="430" y="40" width="160" height="110" rx="10" fill="#cfe5c9" />
        <g stroke="#ffffff" strokeLinecap="round">
          <path d="M-10 190 H650" strokeWidth="26" />
          <path d="M320 -10 V250" strokeWidth="18" />
          <path d="M60 -10 L170 190" strokeWidth="12" />
          <path d="M320 110 H650" strokeWidth="12" />
          <path d="M120 190 V250" strokeWidth="10" />
        </g>
        <g stroke="#e2ddd2" strokeWidth="2" fill="none">
          <path d="M-10 190 H650" strokeDasharray="10 10" />
        </g>
        <g fill="#e6dfd0">
          <rect x="30" y="40" width="70" height="50" rx="4" />
          <rect x="190" y="30" width="100" height="60" rx="4" />
          <rect x="350" y="140" width="60" height="30" rx="4" />
          <rect x="30" y="215" width="70" height="25" rx="4" />
          <rect x="440" y="205" width="120" height="30" rx="4" />
        </g>
        <rect x="190" y="110" width="110" height="64" rx="6" fill="#17482f" />
        <circle cx="245" cy="104" r="20" fill="#c8283a" />
        <path d="M245 132 l-12 -22 a14 14 0 1 1 24 0Z" fill="#c8283a" />
        <circle cx="245" cy="102" r="6" fill="#fff" />
        <text x="245" y="152" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fill="#fff" fontWeight="600">
          Webnion
        </text>
        <text x="510" y="100" textAnchor="middle" fontFamily="sans-serif" fontSize="13" fill="#3c6b38">
          {c.park}
        </text>
        <text x="560" y="182" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fill="#5a6577">
          {c.road}
        </text>
        <text x="80" y="330" fontFamily="sans-serif" fontSize="12" fill="#3c5f8e">
          {c.river}
        </text>
      </svg>
      <figcaption className="sr-only">{c.mapNote}</figcaption>
    </figure>
  );
}

function MapEmbed({ url, title }: { url: string; title: string }) {
  return (
    <div className="overflow-hidden">
      <iframe
        src={url}
        title={title}
        className="aspect-[16/10] w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
}

export default async function ContactPage() {
  const [site, { lang }] = await Promise.all([getSite(), getI18n()]);
  const c = copy[lang];
  const bn = lang === "bn";
  const mapOk = /^https:\/\/(www\.)?google\.com\/maps\/embed\?/.test(site.mapUrl);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${bn ? site.addressBn : site.address}`)}`;
  const waHref = `https://wa.me/${site.phoneHref.replace(/\D/g, "")}`;
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const newTab = <span className="sr-only"> {bn ? "(নতুন ট্যাবে খুলবে)" : "(opens in a new tab)"}</span>;
  const link = "underline underline-offset-4 hover:text-accent";
  const rows: { Icon: typeof MapPin; label: string; value: React.ReactNode }[] = [
    {
      Icon: MapPin,
      label: c.address,
      value: (
        <>
          {site.address}
          <br />
          <a href={mapsHref} {...ext} className={`text-sm ${link}`}>
            {c.openMaps}
            {newTab}
          </a>
        </>
      ),
    },
    {
      Icon: Phone,
      label: c.phone,
      value: (
        <>
          <a href={site.phoneHref} className={link}>{site.phone}</a>
          {site.officePhone && (
            <>
              <br />
              <span className="text-sm text-muted">{c.landline} </span>
              <a href={site.officePhoneHref} className={`text-sm ${link}`}>{site.officePhone}</a>
            </>
          )}
          <br />
          <a href={waHref} {...ext} className={`text-sm ${link}`}>
            {c.whatsapp}
            {newTab}
          </a>
        </>
      ),
    },
    {
      Icon: Mail,
      label: c.email,
      value: (
        <>
          <a href={`mailto:${site.email}`} className={`break-all ${link}`}>{site.email}</a>
          {site.admissionEmail && (
            <>
              <br />
              <span className="text-sm text-muted">{c.whoAdmission}: </span>
              <a href={`mailto:${site.admissionEmail}`} className={`text-sm break-all ${link}`}>{site.admissionEmail}</a>
            </>
          )}
        </>
      ),
    },
    {
      Icon: Clock,
      label: c.hours,
      value: (
        <>
          {site.officeHours}
          <br />
          <span className="text-sm text-muted">{c.closedFri}</span>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader path="/contact" title={c.title} />
      <FullWidth>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="space-y-6">
            <Box id="contact-info" title={bn ? site.nameBn : site.name} bodyClassName="p-0">
              <dl className="divide-y divide-line">
                {rows.map(({ Icon, label, value }) => (
                  <div key={label} className="px-4 py-3">
                    <dt className="flex items-center gap-2 text-sm font-semibold text-heading">
                      <Icon aria-hidden className="size-4 shrink-0 text-accent" />
                      {label}
                    </dt>
                    <dd className="mt-0.5 pl-6 text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </Box>
            <Box id="contact-map" title={c.find} bodyClassName="p-0">
              {mapOk ? <MapEmbed url={site.mapUrl} title={`${c.map} ${site.name}`} /> : <MapPlaceholder c={c} />}
            </Box>
          </div>
          <div className="space-y-6">
            <Box id="contact-form" title={c.send}>
              <p className="mb-4 text-sm text-muted">{c.sendNote}</p>
              <ContactForm wide to={site.email} />
            </Box>
            {site.demoNote && <DemoNote>{site.demoNote}</DemoNote>}
          </div>
        </div>
      </FullWidth>
    </>
  );
}
