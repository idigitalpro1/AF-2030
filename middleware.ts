import { NextResponse } from "next/server";
import { auth } from "@/auth";

const BASE_PATH = "/dev";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Note: `req.nextUrl.pathname` has the `basePath` ("/dev") stripped, so
  // these checks must use basePath-relative paths.
  const isLogin = pathname === "/login";
  const isAuthApi = pathname.startsWith("/api/auth");

  if (isLogin || isAuthApi) {
    if (isLogin && req.auth) {
      return NextResponse.redirect(new URL(`${BASE_PATH}/`, req.url));
    }
    return NextResponse.next();
  }

  if (!req.auth) {
    const login = new URL(`${BASE_PATH}/login`, req.url);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
});

export const config = {
  // Do NOT include the `basePath` ("/dev") here: Next.js automatically
  // prepends `basePath` to middleware matcher sources at build time. Adding
  // it manually would produce a `/dev/dev/...` matcher that never matches.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
