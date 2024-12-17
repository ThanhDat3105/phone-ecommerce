import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/cart", "/order-list", "/profile", "/verify-register"];

const authPaths = ["/sign_in", "/sign_up"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const accessToken = request.cookies.get("accessToken")?.value;

  let pathName = request.nextUrl.pathname;

  if (
    privatePaths.some((path: string) =>
      request.nextUrl.pathname.startsWith(path)
    ) &&
    !accessToken
  ) {
    if (pathName.startsWith("/")) {
      pathName = pathName.split("/").join("");
    }

    const response = NextResponse.redirect(new URL(`/sign_in`, request.url));

    response.cookies.set("prevPath", pathName);

    return response;
  }

  // Logged in, block /sign_in and /sign_up
  if (
    authPaths.some((path: string) =>
      request.nextUrl.pathname.startsWith(path)
    ) &&
    accessToken
  ) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/cart",
    "/product",
    "/news",
    "/forgot-password",
    "/order-list",
    "/profile",
    "/verify-register",
    "/sign_in",
    "/sign_up",
  ],
};
