import { NextResponse } from "next/server";
import { auth } from "@/auth";

const BASE_PATH = "/dev";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isLogin =
    pathname === `${BASE_PATH}/login` || pathname.endsWith("/login");
  const isAuthApi = pathname.startsWith(`${BASE_PATH}/api/auth`);

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
  matcher: ["/dev/:path*", "/dev"],
};
