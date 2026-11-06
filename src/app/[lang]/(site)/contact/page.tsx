import type { Metadata } from "next";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { OpenNowBadge } from "@/components/shared/OpenNowBadge";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote, SectionHeading, buttonClasses } from "@/components/ui/primitives";
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
        <rect x="190" y="110" width="110" height="64" rx="6" fill="#172c4a" />
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

const cardCls = "h-full rounded-lg border border-line bg-surface p-6 shadow-[0_6px_24px_-10px_rgb(15_31_54/0.25)]";
const labelCls = "mt-5 text-xs font-bold text-subheading";
const actionCls = "mt-4 inline-flex items-center gap-1 text-sm font-bold text-heading hover:underline";
const iconBox = "flex size-11 items-center justify-center rounded-lg bg-tint text-heading";

export default async function ContactPage() {
  const [site, { lang }] = await Promise.all([getSite(), getI18n()]);
  const c = copy[lang];
  const bn = lang === "bn";
  const cap = bn ? "" : "uppercase tracking-[0.14em]";
  const mapOk = /^https:\/\/(www\.)?google\.com\/maps\/embed\?/.test(site.mapUrl);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${bn ? site.addressBn : site.address}`)}`;
  const waHref = `https://wa.me/${site.phoneHref.replace(/\D/g, "")}`;
  const [days, hours] = site.officeHours.split(/,\s*/);
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const newTab = <span className="sr-only"> {bn ? "(নতুন ট্যাবে খুলবে)" : "(opens in a new tab)"}</span>;

  const whoRows = [
    { title: c.whoAdmission, sub: site.admissionEmail, subHref: `mailto:${site.admissionEmail}`, href: `mailto:${site.admissionEmail}`, icon: Mail, aria: c.mailLabel(c.whoAdmission) },
    { title: c.whoOffice, sub: c.whoOfficeSub, href: site.officePhoneHref, icon: Phone, aria: c.callLabel(c.whoOffice) },
    { title: c.whoPrincipal, sub: c.byAppt, extra: site.officePhone, subHref: site.officePhoneHref, href: site.officePhoneHref, icon: Phone, aria: c.callLabel(c.whoPrincipal) },
  ];

  return (
    <>
      <PageHeader
        title={c.title}
        description={c.intro}
        overlap
        aside={
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href={site.phoneHref} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#e8b84a] px-5 font-bold text-navy-950 hover:bg-[#f3cc6e]">
              <Phone aria-hidden className="size-4" />
              {c.callOffice}
            </a>
            <a href={waHref} {...ext} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 font-bold text-white hover:bg-white/10">
              <MessageCircle aria-hidden className="size-4" />
              {c.whatsapp}
              {newTab}
            </a>
            <a href={mapsHref} {...ext} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 font-bold text-white hover:bg-white/10">
              <Navigation aria-hidden className="size-4" />
              {c.directions}
              {newTab}
            </a>
          </div>
        }
      />

      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <ul className="relative z-10 -mt-16 grid gap-4 sm:-mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <div className={cardCls}>
                <span className={iconBox}><MapPin aria-hidden className="size-5" /></span>
                <h2 className={`${labelCls} ${cap}`}>{c.address}</h2>
                <p className="mt-1.5 text-lg leading-snug font-semibold text-heading">{site.address}</p>
                <a href={mapsHref} {...ext} className={actionCls}>
                  {c.getDirections} <ArrowRight aria-hidden className="size-4" />
                  {newTab}
                </a>
              </div>
            </li>
            <li>
              <div className={cardCls}>
                <span className={iconBox}><Phone aria-hidden className="size-5" /></span>
                <h2 className={`${labelCls} ${cap}`}>{c.phone}</h2>
                <p className="mt-1.5 text-lg font-semibold text-heading">{site.phone}</p>
                {site.officePhone && (
                  <p className="text-sm text-muted">
                    {c.landline}{" "}
                    <a href={site.officePhoneHref} className="underline underline-offset-2 hover:text-heading">{site.officePhone}</a>
                  </p>
                )}
                <a href={site.phoneHref} className={actionCls}>
                  {c.callNow} <ArrowRight aria-hidden className="size-4" />
                </a>
              </div>
            </li>
            <li>
              <div className={cardCls}>
                <span className={iconBox}><Mail aria-hidden className="size-5" /></span>
                <h2 className={`${labelCls} ${cap}`}>{c.email}</h2>
                <p className="mt-1.5 text-lg font-semibold break-words text-heading">{site.email}</p>
                <p className="text-sm text-muted">{c.general}</p>
                <a href={`mailto:${site.email}`} className={actionCls}>
                  {c.writeEmail} <ArrowRight aria-hidden className="size-4" />
                </a>
              </div>
            </li>
            <li>
              <div className={cardCls}>
                <div className="flex items-start justify-between gap-2">
                  <span className={iconBox}><Clock aria-hidden className="size-5" /></span>
                  <OpenNowBadge open={c.openNow} closed={c.closedNow} />
                </div>
                <h2 className={`${labelCls} ${cap}`}>{c.hours}</h2>
                <p className="mt-1.5 text-lg leading-snug font-semibold text-heading">
                  {days}
                  {hours && <span className="block">{hours}</span>}
                </p>
                <p className="mt-4 text-sm text-muted">{c.closedFri}</p>
              </div>
            </li>
          </ul>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-8">
            <div>
              <SectionHeading title={c.send} description={c.sendNote} />
              <div className="mt-6 rounded-lg border border-line bg-surface p-5 sm:p-7">
                <ContactForm wide to={site.email} />
              </div>
            </div>

            <div>
              <SectionHeading title={c.who} />
              <ul className="mt-6 divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
                {whoRows.map((r) => {
                  const Icon = r.icon;
                  return (
                    <li key={r.title} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div className="min-w-0">
                        <p className="font-bold text-heading">{r.title}</p>
                        <p className="text-sm break-words text-muted">
                          {r.extra ? (
                            <>
                              {r.sub} · <a href={r.subHref} className="underline underline-offset-2 hover:text-heading">{r.extra}</a>
                            </>
                          ) : r.subHref ? (
                            <a href={r.subHref} className="underline underline-offset-2 hover:text-heading">{r.sub}</a>
                          ) : (
                            r.sub
                          )}
                        </p>
                      </div>
                      <a href={r.href} aria-label={r.aria} className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-tint text-heading hover:bg-navy-800 hover:text-white">
                        <Icon aria-hidden className="size-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface">
                {mapOk ? <MapEmbed url={site.mapUrl} title={`${c.map} ${site.name}`} /> : <MapPlaceholder c={c} />}
                <div className="border-t border-line p-5">
                  <p className="font-bold text-heading">{bn ? site.nameBn : site.name}</p>
                  <p className="text-sm text-muted">{site.address}</p>
                  <a href={mapsHref} {...ext} className={`mt-4 ${buttonClasses("primary", "sm")}`}>
                    <Navigation aria-hidden className="size-4" />
                    {c.openMaps}
                    {newTab}
                  </a>
                </div>
              </div>
              {site.demoNote && <DemoNote className="mt-6">{site.demoNote}</DemoNote>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
