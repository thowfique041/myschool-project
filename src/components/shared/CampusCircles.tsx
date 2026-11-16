import Image from "next/image";
import { images } from "@/data/images";

/** Positions in the cluster: top-left, top-centre (front), right, bottom-centre (behind). */
const POS = [
  "left-0 top-[15%] z-10 w-[45%] aspect-square",
  "left-[27%] top-0 z-30 w-[47%] aspect-square",
  "right-0 top-[13%] z-20 w-[45%] aspect-square",
  "left-[26%] bottom-0 z-0 w-[44%] aspect-square",
];
const PHOTOS = [
  images.heroCampus,
  images.scienceLab,
  images.library,
  { src: "/images/sports-day.jpg", alt: "Students in sports kit with a football on a grass pitch in front of a goal" },
];

/** Four overlapping round campus photographs with labels (used on the home and About pages). */
export function CampusCircles({ labels, listLabel, className = "" }: { labels: string[]; listLabel: string; className?: string }) {
  return (
    <ul aria-label={listLabel} className={`relative mx-auto aspect-[100/86] w-full max-w-md ${className}`}>
      {PHOTOS.map((ph, i) => (
        <li key={ph.src} className={`absolute overflow-hidden rounded-full border-[6px] border-surface bg-paper-dark ${POS[i]}`}>
          <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 1024px) 220px, 45vw" className="object-cover" />
          <span className="absolute inset-x-0 bottom-0 bg-forest-950/85 pt-1.5 pb-3 text-center text-sm font-semibold text-white sm:text-base">{labels[i]}</span>
        </li>
      ))}
    </ul>
  );
}
