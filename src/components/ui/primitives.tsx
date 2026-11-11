import Link from "@/components/i18n/Link";
import type { ComponentProps, ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------- Button link */

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-brand hover:bg-brand-hover text-white",
  secondary: "bg-leaf-600 text-white hover:bg-leaf-700",
  outline: "border border-line-strong bg-surface text-heading hover:border-line-strong hover:bg-tint",
  ghost: "text-heading hover:bg-tint",
  light: "bg-white text-navy-900 hover:bg-navy-50",
};

export const buttonClasses = (variant: Variant = "primary", size: "sm" | "md" = "md") =>
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-semibold transition-colors duration-150",
    "focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    size === "md" ? "min-h-11 px-5 text-base" : "min-h-9 px-3.5 text-sm",
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
  leaf: "bg-leaf-50 text-accent ring-line",
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
        "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
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
        "flex gap-3 rounded-sm border border-[#efe0bb] bg-[#fcf8ee] px-4 py-3 text-sm text-[#5f4712] dark:border-[#6b5420] dark:bg-[#251d0d] dark:text-[#f1d796]",
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
