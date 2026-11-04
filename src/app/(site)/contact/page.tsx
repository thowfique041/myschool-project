import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, DemoNote, SectionHeading } from "@/components/ui/primitives";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSite } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Address, phone, email, office hours and a contact form for Webnion School & College, Sylhet.",
};

function MapPlaceholder() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white">
      <svg viewBox="0 0 640 380" role="img" aria-labelledby="map-title map-desc" className="h-auto w-full">
        <title id="map-title">Location sketch</title>
        <desc id="map-desc">A simplified sketch map showing the school near a main road and a park in Upashahar. Not to scale.</desc>
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
          Park
        </text>
        <text x="560" y="182" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fill="#5a6577">
          Main Road
        </text>
        <text x="80" y="330" fontFamily="sans-serif" fontSize="12" fill="#3c5f8e">
          River
        </text>
      </svg>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3 text-xs text-muted">
        <span>Sketch map placeholder — not to scale. An embedded map can be added for a real campus.</span>
      </figcaption>
    </figure>
  );
}

function MapEmbed({ url, title }: { url: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
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
  const site = await getSite();
  const mapOk = /^https:\/\/(www\.)?google\.com\/maps\/embed\?/.test(site.mapUrl);
  const items = [
    { icon: MapPin, label: "Address", value: site.address, sub: site.addressBn },
    { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref, sub: site.officePhone ? `Office: ${site.officePhone}` : "" },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, sub: site.admissionEmail ? `Admission: ${site.admissionEmail}` : "" },
    { icon: Clock, label: "Office hours", value: site.officeHours, sub: site.officeHoursBn },
  ];

  return (
    <>
      <PageHeader title="Contact Us" titleBn="যোগাযোগ" description="Visit the office, call during office hours or send a message using the form." />
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(({ icon: Icon, label, value, href, sub }) => (
              <li key={label}>
                <Card className="h-full p-5">
                  <Icon aria-hidden className="size-6 text-leaf-600" />
                  <h2 className="mt-3 text-sm font-semibold text-muted">{label}</h2>
                  {href ? (
                    <a href={href} className="mt-0.5 block font-semibold break-words text-navy-900 hover:text-leaf-700">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 font-semibold text-navy-900">{value}</p>
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
              <SectionHeading kicker="বার্তা পাঠান" title="Send a message" />
              <Card className="mt-6 p-5 sm:p-7">
                <ContactForm />
              </Card>
            </div>
            <div>
              <SectionHeading kicker="অবস্থান" title="Find us" />
              <div className="mt-6">
                {mapOk ? <MapEmbed url={site.mapUrl} title={`Map: ${site.name}`} /> : <MapPlaceholder />}
              </div>
              <div className="mt-6 rounded-xl border border-line bg-white p-5">
                <h3 className="font-semibold text-navy-900">Follow us</h3>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {site.social.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-lg border border-line px-4 text-sm font-semibold text-navy-800 hover:border-navy-300">
                        {s.label}
                        <span className="sr-only"> (opens in a new tab)</span>
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
