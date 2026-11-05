import { NextResponse, type NextRequest } from "next/server";

/**
 * Language routing. English is served at the site root (/about) and Bangla
 * under /bn (/bn/about). Internally both live in app/[lang]/…, so English
 * requests are rewritten to /en/…; a direct /en/… URL redirects to the
 * clean English URL.
 */
export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/bn" || pathname.startsWith("/bn/")) return NextResponse.next();
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, metadata routes and any file with an extension.
  matcher: ["/((?!_next/|api/|sitemap\\.xml|robots\\.txt|.*\\.[a-zA-Z0-9]{2,5}$).*)"],
};
