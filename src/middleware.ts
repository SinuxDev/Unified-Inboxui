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
  const isAppPage = pathname === '/' || pathname.startsWith('/teams');

  if (!signedIn && isAppPage) {
    const login = new URL('/login', request.url);
    login.searchParams.set('next', pathname);
    return NextResponse.redirect(login);
  }

  if (signedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/teams/:path*'],
};
