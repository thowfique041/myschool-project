import { NextResponse, type NextRequest } from "next/server";

/**
 * Language routing. Bangla is the default and is served at the site root
 * (/notices); English lives under /en (/en/notices). Internally both are in
 * app/[lang]/…, so root requests are rewritten to /bn/…, and the old /bn/…
 * URLs redirect permanently to the root.
 */
const strip = (path: string, prefix: string) => path.slice(prefix.length) || "/";

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/bn" || pathname.startsWith("/bn/")) {
    const url = req.nextUrl.clone();
    url.pathname = strip(pathname, "/bn");
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = `/bn${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, metadata routes and any file with an extension.
  matcher: ["/((?!_next/|api/|sitemap\\.xml|robots\\.txt|.*\\.[a-zA-Z0-9]{2,5}$).*)"],
};
