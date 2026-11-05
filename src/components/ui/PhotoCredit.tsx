import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";
import { getI18n } from "@/i18n/server";

/** Small caption crediting the photographer and source of a stock photo. */
export async function PhotoCredit({ image, prefix, className }: { image: ImageAsset; prefix?: string; className?: string }) {
  if (!image.credit) return null;
  const { lang } = await getI18n();
  const { author, location, page } = image.credit;
  return (
    <p className={cn("text-xs leading-snug text-muted", className)}>
      {prefix && <span>{prefix} </span>}
      {location && <span>{location}. </span>}
      {lang === "bn" ? "ছবি" : "Photo"}
      {author ? (lang === "bn" ? `: ${author},` : ` by ${author}`) : ""} {lang === "bn" ? "উৎস:" : "on"}{" "}
      <a href={page} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
        Unsplash
        <span className="sr-only"> {lang === "bn" ? "(নতুন ট্যাবে খুলবে)" : "(opens in a new tab)"}</span>
      </a>
      .
    </p>
  );
}
