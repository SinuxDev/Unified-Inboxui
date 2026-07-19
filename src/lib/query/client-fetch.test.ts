import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { clientFetchJson, ClientApiError } from '@/lib/query/client-fetch';

describe('clientFetchJson refresh', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('retries once after a successful refresh on 401', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ organizationName: 'Acme' }), {
          status: 200,
        }),
      );

    vi.stubGlobal('fetch', fetchMock);

    const data = await clientFetchJson<{ organizationName: string }>(
      '/api/organizations/me',
    );

    expect(data.organizationName).toBe('Acme');
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(String(fetchMock.mock.calls[1][0])).toContain('/api/auth/refresh');
  });

  it('throws when refresh fails', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'No refresh' }), { status: 401 }),
      );

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      clientFetchJson('/api/organizations/me'),
    ).rejects.toBeInstanceOf(ClientApiError);
  });
});
