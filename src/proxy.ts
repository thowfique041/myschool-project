import { NextResponse, type NextRequest } from "next/server";

/**
 * Language routing. Bangla is the default and is served at the site root
 * (/notices); English lives under /en (/en/notices). Internally both are in
 * app/[lang]/…, so root requests are rewritten to /bn/…. The old /bn/… URLs
 * redirect permanently to the root, and pages that were merged or removed
 * redirect to their new home in either language.
 */
const MOVED: Record<string, string> = {
  "/about": "/about/history",
  "/academic": "/academic/classes",
  "/calendar": "/academic/calendar",
  "/policies": "/academic/rules",
  "/students-guardians": "/academic/rules",
  "/faq": "/admission/apply",
  "/privacy": "/",
  "/terms": "/",
};

const strip = (path: string, prefix: string) => path.slice(prefix.length) || "/";

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const redirect = (to: string) => {
    const url = req.nextUrl.clone();
    url.pathname = to;
    return NextResponse.redirect(url, 308);
  };

  if (pathname === "/bn" || pathname.startsWith("/bn/")) {
    const rest = strip(pathname, "/bn");
    return redirect(MOVED[rest] ?? rest);
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = strip(pathname, "/en");
    if (MOVED[rest]) return redirect(MOVED[rest] === "/" ? "/en" : `/en${MOVED[rest]}`);
    return NextResponse.next();
  }
  if (MOVED[pathname]) return redirect(MOVED[pathname]);
  const url = req.nextUrl.clone();
  url.pathname = `/bn${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, metadata routes and any file with an extension.
  matcher: ["/((?!_next/|api/|sitemap\\.xml|robots\\.txt|.*\\.[a-zA-Z0-9]{2,5}$).*)"],
};
