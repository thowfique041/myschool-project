import Link from "@/components/i18n/Link";
import type { ComponentProps, ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------- Section heading */

type SectionHeadingProps = {
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** "rule": heavy top rule, like a notice-board header. "small": compact h2. */
  variant?: "default" | "rule" | "small";
  className?: string;
  id?: string;
};

export function SectionHeading({ title, description, align = "left", tone = "light", variant = "default", className, id }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", variant === "rule" && "max-w-none border-t-4 border-forest-800 pt-3 dark:border-forest-300", className)}>
      <h2
        id={id}
        className={cn(
          variant === "default" && "font-serif text-2xl leading-tight font-semibold",
          variant === "rule" && "text-2xl font-bold uppercase sm:text-[1.65rem]",
          variant === "small" && "font-serif text-2xl font-semibold",
          dark ? "text-white" : "text-heading",
        )}
      >
        {title}
      </h2>
      {variant !== "rule" && (
        <span aria-hidden className={cn("mt-2.5 block h-[3px] w-12 rounded-sm", align === "center" && "mx-auto", dark ? "bg-on-brand-accent" : "bg-accent")} />
      )}
      {description && <p className={cn("mt-2 text-base leading-relaxed", dark ? "text-forest-200" : "text-muted")}>{description}</p>}
    </div>
  );
}

/* --------------------------------------------------------------- Button link */

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary: "border border-brand bg-brand text-white hover:border-brand-hover hover:bg-brand-hover",
  secondary: "border border-brand-text bg-surface text-brand-text hover:bg-tint",
  outline: "border border-line-strong bg-surface text-heading hover:bg-tint",
  ghost: "text-heading hover:bg-tint",
  light: "border border-surface bg-surface text-brand-text hover:bg-tint",
};

export const buttonClasses = (variant: Variant = "primary", size: "sm" | "md" = "md") =>
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors duration-150",
    "focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    size === "md" ? "min-h-11 px-5 text-base" : "min-h-9 px-3.5 text-sm",
    variants[variant],
  );

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: "sm" | "md" };

export function ButtonLink({ variant = "primary", size = "md", className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonClasses(variant, size), className)} {...props} />;
}

/* -------------------------------------------------------------------- Badge */

type BadgeTone = "green" | "red" | "signal" | "highlight" | "neutral";

const badgeTones: Record<BadgeTone, string> = {
  green: "bg-tint text-subheading ring-line-strong",
  red: "bg-crimson-50 text-accent ring-crimson-100",
  signal: "bg-signal-50 text-danger ring-signal-100",
  highlight: "bg-on-brand-accent text-forest-950 ring-on-brand-accent",
  neutral: "bg-paper-dark text-muted ring-line",
};

export function Badge({
  children,
  tone = "green",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- Demo notes */

/** Marks a block of content as sample/demonstration data. */

export function DemoNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-lg border border-line-strong border-l-4 border-l-accent bg-tint px-4 py-3 text-sm text-ink",
        className,
      )}
    >
      <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ Card */

export function Card({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
}) {
  return (
    <As className={cn("border border-line bg-surface", className)}>
      {children}
    </As>
  );
}
