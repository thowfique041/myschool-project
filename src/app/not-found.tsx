import Link from "next/link";
import { ButtonLink } from "@/components/ui/primitives";
import { LogoMark } from "@/components/brand/Logo";

export default function NotFound() {
  const links = [
    { href: "/notices", label: "Notice board" },
    { href: "/admission", label: "Admission 2027" },
    { href: "/results", label: "Result search" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page max-w-2xl text-center">
        <LogoMark className="mx-auto h-16 w-auto" />
        <p className="mt-6 font-serif text-6xl font-semibold text-navy-200">404</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-navy-900">This page could not be found</h1>
        <p lang="bn" className="mt-2 text-muted">দুঃখিত, আপনি যে পাতাটি খুঁজছেন সেটি পাওয়া যায়নি।</p>
        <p className="mt-3 text-muted">The link may be old or mistyped. Try one of these instead:</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-10 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-navy-800 hover:border-navy-300">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/" className="mt-8">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
