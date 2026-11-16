import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  /** "light" for light backgrounds, "dark" for green/dark backgrounds */
  tone?: "light" | "dark";
  title?: string;
};

/** School crest: shield with an open book and a two-leaf sprout. */
export function LogoMark({ className, tone = "light", title }: LogoMarkProps) {
  const light = tone === "light";
  // Colours come from the theme tokens in globals.css.
  const shield = light ? "var(--color-crest)" : "var(--color-on-brand)";
  const book = light ? "var(--color-on-brand)" : "var(--color-crest)";
  const rim = light ? "var(--color-on-brand-accent)" : "var(--color-accent)";
  const leafA = light ? "var(--color-forest-200)" : "var(--color-forest-600)";
  const leafB = light ? "var(--color-forest-100)" : "var(--color-forest-500)";
  return (
    <svg
      viewBox="0 0 48 56"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M24 2 44 8.5V26c0 13.6-8.3 22.6-20 28C12.3 48.6 4 39.6 4 26V8.5Z" style={{ fill: shield }} />
      <path
        d="M24 5.2 41 10.7V26c0 11.8-7 19.7-17 24.7C14 45.7 7 37.8 7 26V10.7Z"
        fill="none"
        strokeWidth="1.2"
        style={{ stroke: rim }}
      />
      {/* sprout */}
      <path d="M24 33V19" strokeWidth="2" strokeLinecap="round" style={{ stroke: leafA }} />
      <path d="M24 25c-1.2-5.4-5.4-8.2-10.2-8 .6 5.2 4.6 8.4 10.2 8Z" style={{ fill: leafA }} />
      <path d="M24 21.5c1-5.6 5.2-8.8 10.4-8.8-.4 5.6-4.4 9-10.4 8.8Z" style={{ fill: leafB }} />
      {/* open book */}
      <path d="M24 36.5c-4.6-3.4-9.6-4.2-14-3.4v8.4c4.6-.8 9.4.2 14 3.4Z" style={{ fill: book }} />
      <path d="M24 36.5c4.6-3.4 9.6-4.2 14-3.4v8.4c-4.6-.8-9.4.2-14 3.4Z" style={{ fill: book }} />
      <path d="M24 36.5v8.4" strokeWidth="1" style={{ stroke: rim }} />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
  name?: string;
  nameBn?: string;
  src?: string;
};

export function Logo({ className, tone = "light", compact = false, name = "Webnion School & College", nameBn = "ওয়েবনিয়ন স্কুল এন্ড কলেজ", src }: LogoProps) {
  const isLight = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-11 w-auto object-contain sm:h-14" />
      ) : (
        <LogoMark tone={tone} className="h-11 w-auto sm:h-14" />
      )}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.02rem] font-semibold whitespace-nowrap min-[400px]:text-[1.12rem] sm:text-[1.35rem] lg:text-[1.15rem] xl:text-[1.35rem]",
            /[\u0980-\u09FF]/.test(name) && "sm:text-[1.3rem]",
            isLight ? "text-heading" : "text-white",
          )}
        >
          {name}
        </span>
        {!compact && (
          <span
            lang={/[\u0980-\u09FF]/.test(nameBn) ? "bn" : "en"}
            className={cn(
              "mt-1 text-[0.74rem] font-medium whitespace-nowrap sm:text-sm",
              isLight ? "text-accent" : "text-on-brand-accent",
            )}
            style={{ lineHeight: 1.3 }}
          >
            {nameBn}
          </span>
        )}
      </span>
    </span>
  );
}
