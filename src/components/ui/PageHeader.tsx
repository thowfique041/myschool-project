import Link from "@/components/i18n/Link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  title: string;
  titleBn?: string;
  description?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  /** Use "p" when the page renders its own <h1> (e.g. article pages). */
  headingAs?: "h1" | "p";
  /** Shown to the right of the title on large screens (e.g. quick facts). */
  aside?: ReactNode;
  /** Gold bottom rule and extra bottom space so the next block can overlap the band. */
  overlap?: boolean;
};

/** Title band used at the top of every inner page. */
export async function PageHeader({ title, description, crumbs = [], children, headingAs = "h1", aside, overlap = false }: PageHeaderProps) {
  const { t } = await getI18n();
  const Heading = headingAs;
  const trail: Crumb[] = [{ label: t.common.home, href: "/" }, ...crumbs, { label: title }];
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <svg
        aria-hidden
        className="absolute inset-y-0 right-0 h-full w-[38rem] max-w-full text-white/[0.06]"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <pattern id="ph-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 4 36 20 20 36 4 20Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </pattern>
          <linearGradient id="ph-fade" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="ph-mask">
            <rect width="400" height="200" fill="url(#ph-fade)" />
          </mask>
        </defs>
        <rect width="400" height="200" fill="url(#ph-pattern)" mask="url(#ph-mask)" />
      </svg>
      <div className={cn("container-page relative grid gap-8 py-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-start", overlap && "pb-24 sm:pb-28")}>
        <div>
        <nav aria-label={t.common.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-1 text-sm text-navy-200">
            {trail.map((c, i) => (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1">
                {i > 0 && <ChevronRight aria-hidden className="size-3.5 opacity-70" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-white hover:underline underline-offset-4">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Heading className="mt-1 font-serif text-3xl font-semibold sm:text-[2.6rem] sm:leading-tight">
          {title}
        </Heading>
        {description && <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy-100">{description}</p>}
        {children}
        </div>
        {aside && <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-80 lg:grid-cols-1">{aside}</div>}
      </div>
      <div aria-hidden className={"h-1 bg-[#e8b84a]"} />
    </section>
  );
}
