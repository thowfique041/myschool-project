import Link from "@/components/i18n/Link";
import { ButtonLink } from "@/components/ui/primitives";
import { LogoMark } from "@/components/brand/Logo";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { getI18n } from "@/i18n/server";

export default async function NotFound() {
  const { t, lang } = await getI18n();
  const links = t.notFound.links;
  return (
    <SiteFrame>
    <section className="py-20 sm:py-28">
      <div className="container-page max-w-2xl text-center">
        <LogoMark className="mx-auto h-16 w-auto" />
        <p className="mt-6 font-serif text-6xl font-semibold text-navy-200">404</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-heading">{t.notFound.title}</h1>
        <p className="mt-3 text-muted">{t.notFound.text}</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold text-heading hover:border-line-strong">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/" className="mt-8">
          {t.notFound.back}
        </ButtonLink>
      </div>
    </section>
    </SiteFrame>
  );
}
