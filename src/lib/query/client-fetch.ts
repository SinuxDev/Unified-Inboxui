import { isApiSuccessResponse, messageFromBody } from '@/lib/api/api-response';

export class ClientApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ClientApiError';
  }
}

let refreshInFlight: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      return res.ok;
    })().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

export async function clientFetchJson<T>(
  path: string,
  init: RequestInit = {},
  options?: { skipRefresh?: boolean },
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }

  const doFetch = () =>
    fetch(path, {
      ...init,
      headers,
      credentials: 'include',
    });

  let res = await doFetch();

  const isAuthEndpoint =
    path.startsWith('/api/auth/login') ||
    path.startsWith('/api/auth/register') ||
    path.startsWith('/api/auth/refresh') ||
    path.startsWith('/api/auth/logout');

  if (res.status === 401 && !options?.skipRefresh && !isAuthEndpoint) {
    const refreshed = await refreshSession();
    if (refreshed) {
      res = await doFetch();
    }
  }

  if (!res.ok) {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = undefined;
    }
    throw new ClientApiError(
      messageFromBody(body, res.statusText || 'Request failed'),
      res.status,
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
