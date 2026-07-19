import { cookies } from 'next/headers';

export function getSessionCookieName(): string {
  return process.env.SESSION_COOKIE_NAME ?? 'inbox_session';
}

export function getRefreshCookieName(): string {
  return process.env.REFRESH_COOKIE_NAME ?? 'inbox_refresh';
}

function baseCookieOptions() {
  const secure =
    process.env.SESSION_COOKIE_SECURE === 'true' ||
    process.env.NODE_ENV === 'production';
  return {
    httpOnly: true as const,
    secure,
    sameSite: 'lax' as const,
    path: '/',
  };
}

export function getAccessCookieOptions() {
  return {
    ...baseCookieOptions(),
    maxAge: 60 * 15, // 15m — matches Nest JWT_EXPIRES_IN
  };
}

export function getRefreshCookieOptions() {
  return {
    ...baseCookieOptions(),
    maxAge: 60 * 60 * 24 * 7, // 7d — matches Nest JWT_REFRESH_EXPIRES_IN
  };
}

export async function getAccessToken(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(getSessionCookieName())?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(getRefreshCookieName())?.value;
}

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  const jar = await cookies();
  jar.set(getSessionCookieName(), accessToken, getAccessCookieOptions());
  jar.set(getRefreshCookieName(), refreshToken, getRefreshCookieOptions());
}

export async function clearAuthCookies(): Promise<void> {
  const jar = await cookies();
  jar.delete(getSessionCookieName());
  jar.delete(getRefreshCookieName());
}
