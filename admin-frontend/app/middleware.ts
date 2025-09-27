import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('refresh_token');
  const url = req.nextUrl.clone();

  // Protect /dashboard and /admin
  if ((url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/admin')) && !token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
