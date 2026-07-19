import {
  clearAuthCookies,
  getAccessToken,
  getRefreshToken,
  setAuthCookies,
} from './cookies';
import type { NestAuthResponse } from './types';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function getApiUrl(): string {
  const url = process.env.API_URL;
  if (!url) {
    throw new Error('API_URL is not configured');
  }
  return url.replace(/\/$/, '');
}

function errorMessage(body: unknown, fallback: string): string {
  if (
    typeof body === 'object' &&
    body !== null &&
    'message' in body &&
    (typeof (body as { message: unknown }).message === 'string' ||
      Array.isArray((body as { message: unknown }).message))
  ) {
    return Array.isArray((body as { message: unknown }).message)
      ? (body as { message: string[] }).message.join(', ')
      : (body as { message: string }).message;
  }
  return fallback;
}

async function rawNestFetch(
  path: string,
  init: RequestInit,
  accessToken?: string,
): Promise<Response> {
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return fetch(`${getApiUrl()}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });
}

async function tryRefreshAccessToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  const res = await rawNestFetch(
    '/auth/refresh',
    {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    },
    undefined,
  );

  if (!res.ok) {
    await clearAuthCookies();
    return null;
  }

  const data = (await res.json()) as NestAuthResponse;
  await setAuthCookies(data.accessToken, data.refreshToken);
  return data.accessToken;
}

export async function nestFetch<T>(
  path: string,
  init: RequestInit = {},
  options?: { auth?: boolean; skipRefresh?: boolean },
): Promise<T> {
  const useAuth = options?.auth !== false;
  const token = useAuth ? await getAccessToken() : undefined;

  let res = await rawNestFetch(path, init, token);

  if (res.status === 401 && useAuth && !options?.skipRefresh) {
    const nextAccess = await tryRefreshAccessToken();
    if (nextAccess) {
      res = await rawNestFetch(path, init, nextAccess);
    }
  }

  if (!res.ok) {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = await res.text().catch(() => undefined);
    }
    throw new ApiError(
      errorMessage(body, res.statusText || 'Request failed'),
      res.status,
      body,
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}
