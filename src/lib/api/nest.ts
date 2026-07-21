import { isApiSuccessResponse, messageFromBody } from './api-response';
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

  const body: unknown = await res.json();
  if (!isApiSuccessResponse<NestAuthResponse>(body)) {
    await clearAuthCookies();
    return null;
  }

  await setAuthCookies(body.data.accessToken, body.data.refreshToken);
  return body.data.accessToken;
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
      messageFromBody(body, res.statusText || 'Request failed'),
      res.status,
      body,
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const body: unknown = await res.json();
  if (isApiSuccessResponse<T>(body)) {
    return body.data;
  }

  return body as T;
}
