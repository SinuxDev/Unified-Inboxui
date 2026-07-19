import { NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/api/cookies';
import { jsonError } from '@/lib/api/http';
import { nestFetch } from '@/lib/api/nest';
import { assertAllowedOrigin } from '@/lib/api/origin';

export async function POST(request: Request) {
  try {
    assertAllowedOrigin(request);
    try {
      await nestFetch<{ ok: boolean }>(
        '/auth/logout',
        { method: 'POST' },
        { auth: false, skipRefresh: true },
      );
    } catch {
      // Best-effort Nest ack; always clear cookies locally.
    }
    await clearAuthCookies();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return jsonError(error, 403);
  }
}
