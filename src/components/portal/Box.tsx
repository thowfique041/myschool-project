import Link from "@/components/i18n/Link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BoxProps = {
  id: string;
  title: string;
  /** Heading level of the box title. */
  as?: "h2" | "h3";
  /** Optional "see all" link in the header. */
  href?: string;
  linkLabel?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

/** A bordered section with a coloured header bar: the basic unit of the portal layout. */
export function Box({ id, title, as: H = "h2", href, linkLabel, children, className, bodyClassName }: BoxProps) {
  return (
    <section aria-labelledby={id} className={cn("box border border-line bg-surface", className)}>
      <div className="box-head flex items-center justify-between gap-3 bg-navy-800 px-4 py-2 text-white">
        <H id={id} className="text-[1.05rem] font-semibold">
          {title}
        </H>
        {href && linkLabel && (
          <Link href={href} className="shrink-0 text-sm text-white/90 underline underline-offset-4 hover:text-white">
            {linkLabel}
          </Link>
        )}
      </div>
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </section>
  );
}
