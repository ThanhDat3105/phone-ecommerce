import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/cart", "/order-list", "/profile", "/verify-register"];

const authPaths = ["/sign_in", "/sign_up"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log(accessToken);
  console.log("test Refresh", accessToken);
  if (
    privatePaths.some((path: string) =>
      request.nextUrl.pathname.startsWith(path)
    ) &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL("/sign_in", request.url));
  }

  if (
    authPaths.some((path: string) =>
      request.nextUrl.pathname.startsWith(path)
    ) &&
    accessToken
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/forgot-password",
    "/order-list",
    "/profile",
    "/verify-register",
    "/sign_in",
    "/sign_up",
  ],
};
