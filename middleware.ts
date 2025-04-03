
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAdminAuthenticated } from './lib/admin-auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect admin routes except login
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const isAuth = await isAdminAuthenticated();
    
    if (!isAuth) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}