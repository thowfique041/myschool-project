import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------- Section heading */

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  id,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {kicker && (
        <p
          lang="bn"
          className={cn(
            "mb-2 inline-flex items-center gap-2 text-sm font-semibold",
            dark ? "text-leaf-200" : "text-accent",
          )}
          style={{ lineHeight: 1.4 }}
        >
          {kicker}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "font-serif text-[1.75rem] leading-tight font-semibold tracking-tight sm:text-[2.1rem]",
          dark ? "text-white" : "text-heading",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-3 text-[0.98rem] leading-relaxed", dark ? "text-navy-100" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- Button link */

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-brand hover:bg-brand-hover text-white shadow-sm",
  secondary: "bg-leaf-600 text-white hover:bg-leaf-700 shadow-sm",
  outline: "border border-line-strong bg-surface text-heading hover:border-line-strong hover:bg-tint",
  ghost: "text-heading hover:bg-tint",
  light: "bg-white text-navy-900 hover:bg-navy-50 shadow-sm",
};

export const buttonClasses = (variant: Variant = "primary", size: "sm" | "md" = "md") =>
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors duration-150",
    "focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    size === "md" ? "min-h-11 px-5 text-[0.95rem]" : "min-h-9 px-3.5 text-sm",
    variants[variant],
  );

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: "sm" | "md" };

export function ButtonLink({ variant = "primary", size = "md", className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonClasses(variant, size), className)} {...props} />;
}

/* -------------------------------------------------------------------- Badge */

type BadgeTone = "navy" | "leaf" | "signal" | "gold" | "neutral";

const badgeTones: Record<BadgeTone, string> = {
  navy: "bg-tint text-subheading ring-line-strong",
  leaf: "bg-leaf-50 text-accent ring-leaf-100",
  signal: "bg-signal-50 text-danger ring-signal-100",
  gold: "bg-[#faf3e3] text-[#7d5c17] ring-[#efe0bb] dark:bg-[#2e2410] dark:text-[#f4cf7f] dark:ring-[#6b5420]",
  neutral: "bg-paper-dark text-muted ring-line",
};

export function Badge({
  children,
  tone = "navy",
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
export function SampleTag({ className }: { className?: string }) {
  return (
    <Badge tone="gold" className={className}>
      Sample data
    </Badge>
  );
}

export function DemoNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-lg border border-[#efe0bb] bg-[#fcf8ee] px-4 py-3 text-sm text-[#5f4712] dark:border-[#6b5420] dark:bg-[#251d0d] dark:text-[#f1d796]",
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
    <As className={cn("rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-card)]", className)}>
      {children}
    </As>
  );
}
