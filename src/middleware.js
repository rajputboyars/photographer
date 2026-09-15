import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/admin-auth";

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  if (!(await verifySession(request.cookies.get(SESSION_COOKIE)?.value))) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
