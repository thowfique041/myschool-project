import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  /** "light" for light backgrounds, "dark" for navy/dark backgrounds */
  tone?: "light" | "dark";
  title?: string;
};

/**
 * Original Webnion emblem: a crest holding an open book with a two-leaf
 * sprout rising from its spine — knowledge as the ground growth comes from.
 */
export function LogoMark({ className, tone = "light", title }: LogoMarkProps) {
  const shield = tone === "light" ? "#172c4a" : "#ffffff";
  const book = tone === "light" ? "#ffffff" : "#172c4a";
  const rim = "#b88a2e";

  return (
    <svg
      viewBox="0 0 48 56"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d="M24 2 44 8.5V26c0 13.6-8.3 22.6-20 28C12.3 48.6 4 39.6 4 26V8.5Z"
        fill={shield}
      />
      <path
        d="M24 5.2 41 10.7V26c0 11.8-7 19.7-17 24.7C14 45.7 7 37.8 7 26V10.7Z"
        fill="none"
        stroke={rim}
        strokeWidth="1.2"
      />
      {/* sprout */}
      <path d="M24 33V19" stroke="#13895f" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 25c-1.2-5.4-5.4-8.2-10.2-8 .6 5.2 4.6 8.4 10.2 8Z" fill="#13895f" />
      <path d="M24 21.5c1-5.6 5.2-8.8 10.4-8.8-.4 5.6-4.4 9-10.4 8.8Z" fill="#1fa774" />
      {/* open book */}
      <path d="M24 36.5c-4.6-3.4-9.6-4.2-14-3.4v8.4c4.6-.8 9.4.2 14 3.4Z" fill={book} />
      <path d="M24 36.5c4.6-3.4 9.6-4.2 14-3.4v8.4c-4.6-.8-9.4.2-14 3.4Z" fill={book} />
      <path d="M24 36.5v8.4" stroke={rim} strokeWidth="1" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
};

export function Logo({ className, tone = "light", compact = false }: LogoProps) {
  const isLight = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}>
      <LogoMark tone={tone} className="h-11 w-auto sm:h-14" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.02rem] font-semibold tracking-tight whitespace-nowrap min-[400px]:text-[1.12rem] sm:text-[1.35rem]",
            isLight ? "text-navy-900" : "text-white",
          )}
        >
          Webnion School &amp; College
        </span>
        {!compact && (
          <span
            lang="bn"
            className={cn(
              "mt-1 text-[0.74rem] font-medium whitespace-nowrap sm:text-sm",
              isLight ? "text-leaf-700" : "text-leaf-200",
            )}
            style={{ lineHeight: 1.3 }}
          >
            ওয়েবনিয়ন স্কুল এন্ড কলেজ
          </span>
        )}
      </span>
    </span>
  );
}
