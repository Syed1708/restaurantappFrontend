import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  
    console.log("Cookies received in middleware:", req.cookies.getAll());
  const accessToken = req.cookies.get("accessToken")?.value;
  console.log(accessToken);
  
  // const isTokenOk = Boolean(token)
  const url = req.nextUrl.clone();
  const isAdmin = accessToken?.role == "user";
  const isAdminPathName = req.nextUrl.pathname.startsWith("/dashboard/admin");
  const isUserPathName = req.nextUrl.pathname.startsWith("/dashboard");
  if (!accessToken && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (accessToken && url.pathname === "/login") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!accessToken && isUserPathName) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
    );
  }
  if (isAdminPathName && !isAdmin) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard", "/login"], // protect these routes
};