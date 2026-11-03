import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

/** Small caption crediting the photographer and source of a stock photo. */
export function PhotoCredit({ image, prefix, className }: { image: ImageAsset; prefix?: string; className?: string }) {
  if (!image.credit) return null;
  const { author, location, page } = image.credit;
  return (
    <p className={cn("text-[0.72rem] leading-snug text-muted", className)}>
      {prefix && <span>{prefix} </span>}
      {location && <span>{location}. </span>}
      Photo{author ? ` by ${author}` : ""} on{" "}
      <a href={page} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
        Unsplash
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      {location || prefix ? " — not Webnion's campus." : "."}
    </p>
  );
}
