// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// const ADMIN_AUTH_ROUTES = ["/admin/auth/login", "/admin/auth/error"];
// const PROTECTED_ADMIN_ROUTES = ["/admin", "/admin/dashboard"]; // Add all admin routes here

// export async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
//   const isAdminAuthRoute = ADMIN_AUTH_ROUTES.some((route) =>
//     pathname.startsWith(route)
//   );
//   const isProtectedAdminRoute = PROTECTED_ADMIN_ROUTES.some((route) =>
//     pathname.startsWith(route)
//   );

//   // 1. Handle admin routes
//   if (isProtectedAdminRoute || isAdminAuthRoute) {
//     const token = await getToken({
//       req: request,
//       secret: process.env.NEXTAUTH_SECRET,
//     });

//     // Redirect to login if trying to access protected route without session
//     if (isProtectedAdminRoute && !token) {
//       return NextResponse.redirect(
//         new URL("/admin/auth/login", request.nextUrl.origin)
//       );
//     }

//     // Redirect to dashboard if logged-in admin tries to access auth routes
//     if (isAdminAuthRoute && token) {
//       return NextResponse.redirect(
//         new URL("/admin/dashboard", request.nextUrl.origin)
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - images - .svg, .png, .jpg, etc.
//      */
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };


// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt'

// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET
//   })

//   // 1. Protect admin routes
//   if (request.nextUrl.pathname.startsWith('/admin') && 
//       !request.nextUrl.pathname.startsWith('/admin/auth') && 
//       !token) {
//     return NextResponse.redirect(new URL('auth/login', request.url))
//   }

//   // 2. Redirect authenticated users away from auth pages
//   if (request.nextUrl.pathname.startsWith('/admin/auth') && token) {
//     return NextResponse.redirect(new URL('/admin/dashboard', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/admin/:path*']
// }



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // TEMPORARY: Comment out auth check - START
  /*
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const LOGIN_PATH = "/auth/login";

  if (request.nextUrl.pathname.startsWith("/admin") && !token) {
    const callbackUrl = request.nextUrl.pathname;
    const redirectUrl = new URL(LOGIN_PATH, request.url);
    redirectUrl.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(redirectUrl);
  }
  */
  // TEMPORARY: Comment out auth check - END

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};