import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { SiteInfo } from "@/content/site-content";

export function TopBar({ site }: { site: SiteInfo }) {
  return (
    <div className="bg-navy-950 text-[0.8rem] text-navy-100">
      <div className="container-page flex min-h-9 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <li>
            <a href={site.phoneHref} className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone aria-hidden className="size-3.5 text-leaf-200" />
              {site.phone}
            </a>
          </li>
          <li className="hidden sm:block">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail aria-hidden className="size-3.5 text-leaf-200" />
              {site.email}
            </a>
          </li>
          <li className="hidden md:inline-flex items-center gap-1.5">
            <MapPin aria-hidden className="size-3.5 text-leaf-200" />
            {site.area}
          </li>
          <li className="hidden xl:inline-flex items-center gap-1.5">
            <Clock aria-hidden className="size-3.5 text-leaf-200" />
            {site.officeHours}
          </li>
        </ul>
        <ul className="flex items-center gap-4">
          <li className="hidden sm:block">
            <span className="text-navy-300">
              EIIN {site.eiin}
              {site.eiin === "000000" ? " (demo)" : ""}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
