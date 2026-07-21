import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME ?? 'inbox_session';
const REFRESH_COOKIE = process.env.REFRESH_COOKIE_NAME ?? 'inbox_refresh';

export function middleware(request: NextRequest) {
  const access = request.cookies.get(SESSION_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  const signedIn = Boolean(access || refresh);
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isMarketingHome = pathname === '/';
  const isProtectedApp =
    pathname === '/app' ||
    pathname.startsWith('/app/') ||
    pathname.startsWith('/teams');

  if (!signedIn && isProtectedApp) {
    const login = new URL('/login', request.url);
    login.searchParams.set('next', pathname);
    return NextResponse.redirect(login);
  }

  if (signedIn && isMarketingHome) {
    return NextResponse.redirect(new URL('/app', request.url));
  }

  if (signedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/app', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/app', '/app/:path*', '/login', '/register', '/teams/:path*'],
};
