import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, PATHS } from "./consts";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

const protectedRoutes = [PATHS.HOME, PATHS.SETTINGS];
const redirectablePublicRoutes = [PATHS.LOGIN];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname === PATHS.BASE) {
    return NextResponse.redirect(new URL(PATHS.LOGIN, req.url));
  }

  const pathIsProtected = protectedRoutes.includes(pathname);
  const pathIsRedirectablePublic = redirectablePublicRoutes.includes(pathname);

  const cookie = (await cookies()).get(COOKIE_NAME.SESSION)?.value;

  const session = await decrypt(cookie);

  if (pathIsProtected && !session?.username) {
    return NextResponse.redirect(new URL(PATHS.LOGIN, req.url));
  }

  if (pathIsRedirectablePublic && session?.username) {
    return NextResponse.redirect(new URL(PATHS.HOME, req.url));
  }
  return NextResponse.next();
}
