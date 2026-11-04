import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, DemoNote, SectionHeading } from "@/components/ui/primitives";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSite } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Contact Us",
    alt: "যোগাযোগ",
    meta: "Address, phone, email, office hours and a contact form for Webnion School & College, Sylhet.",
    intro: "Visit the office, call during office hours or send a message using the form.",
    address: "Address",
    phone: "Phone",
    email: "Email",
    hours: "Office hours",
    office: "Office:",
    admission: "Admission:",
    sendK: "বার্তা পাঠান",
    send: "Send a message",
    findK: "অবস্থান",
    find: "Find us",
    map: "Map:",
    follow: "Follow us",
    map1: "Location sketch",
    map2: "A simplified sketch map showing the school near a main road and a park in Upashahar. Not to scale.",
    park: "Park",
    road: "Main Road",
    river: "River",
    mapNote: "Sketch map placeholder — not to scale. An embedded map can be added for a real campus.",
  },
  bn: {
    title: "যোগাযোগ",
    alt: "Contact Us",
    meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজ, সিলেটের ঠিকানা, ফোন, ইমেইল, অফিস সময় ও যোগাযোগ ফর্ম।",
    intro: "অফিসে আসুন, অফিস সময়ে ফোন করুন অথবা ফর্মের মাধ্যমে বার্তা পাঠান।",
    address: "ঠিকানা",
    phone: "ফোন",
    email: "ইমেইল",
    hours: "অফিস সময়",
    office: "অফিস:",
    admission: "ভর্তি:",
    sendK: "Send a message",
    send: "বার্তা পাঠান",
    findK: "Location",
    find: "আমাদের অবস্থান",
    map: "মানচিত্র:",
    follow: "আমাদের অনুসরণ করুন",
    map1: "অবস্থানের নকশা",
    map2: "উপশহরে প্রধান সড়ক ও একটি পার্কের কাছে বিদ্যালয়ের অবস্থান দেখানো সরল নকশা। মাপ অনুযায়ী নয়।",
    park: "পার্ক",
    road: "প্রধান সড়ক",
    river: "নদী",
    mapNote: "নকশাটি শুধু প্রতীকী — মাপ অনুযায়ী নয়। আসল ক্যাম্পাসের জন্য এখানে মানচিত্র যুক্ত করা যাবে।",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

function MapPlaceholder({ c }: { c: (typeof copy)["en"] }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
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
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3 text-xs text-muted">
        <span>{c.mapNote}</span>
      </figcaption>
    </figure>
  );
}

function MapEmbed({ url, title }: { url: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
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
  const mapOk = /^https:\/\/(www\.)?google\.com\/maps\/embed\?/.test(site.mapUrl);
  const items = [
    { icon: MapPin, label: c.address, value: site.address, sub: site.addressBn },
    { icon: Phone, label: c.phone, value: site.phone, href: site.phoneHref, sub: site.officePhone ? `${c.office} ${site.officePhone}` : "" },
    { icon: Mail, label: c.email, value: site.email, href: `mailto:${site.email}`, sub: site.admissionEmail ? `${c.admission} ${site.admissionEmail}` : "" },
    { icon: Clock, label: c.hours, value: site.officeHours, sub: lang === "bn" ? "" : site.officeHoursBn },
  ];

  return (
    <>
      <PageHeader title={c.title} titleBn={c.alt} description={c.intro} />
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(({ icon: Icon, label, value, href, sub }) => (
              <li key={label}>
                <Card className="h-full p-5">
                  <Icon aria-hidden className="size-6 text-accent" />
                  <h2 className="mt-3 text-sm font-semibold text-muted">{label}</h2>
                  {href ? (
                    <a href={href} className="mt-0.5 block font-semibold break-words text-heading hover:text-accent">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 font-semibold text-heading">{value}</p>
                  )}
                  {sub && (
                    <p lang={/[ঀ-৿]/.test(sub) ? "bn" : undefined} className="mt-1 text-sm text-muted">
                      {sub}
                    </p>
                  )}
                </Card>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading kicker={c.sendK} title={c.send} />
              <Card className="mt-6 p-5 sm:p-7">
                <ContactForm />
              </Card>
            </div>
            <div>
              <SectionHeading kicker={c.findK} title={c.find} />
              <div className="mt-6">
                {mapOk ? <MapEmbed url={site.mapUrl} title={`${c.map} ${site.name}`} /> : <MapPlaceholder c={c} />}
              </div>
              <div className="mt-6 rounded-xl border border-line bg-surface p-5">
                <h3 className="font-semibold text-heading">{c.follow}</h3>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {site.social.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-lg border border-line px-4 text-sm font-semibold text-heading hover:border-line-strong">
                        {s.label}
                        <span className="sr-only"> {lang === "bn" ? "(নতুন ট্যাবে খুলবে)" : "(opens in a new tab)"}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {site.demoNote && <DemoNote className="mt-6">{site.demoNote}</DemoNote>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
