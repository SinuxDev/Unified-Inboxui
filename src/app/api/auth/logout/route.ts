import { NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/api/cookies';
import { nestFetch } from '@/lib/api/nest';

export async function POST() {
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
}
