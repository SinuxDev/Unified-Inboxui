import { NextResponse } from 'next/server';
import {
  clearAuthCookies,
  getRefreshToken,
  setAuthCookies,
} from '@/lib/api/cookies';
import { jsonError } from '@/lib/api/http';
import { nestFetch } from '@/lib/api/nest';
import { assertAllowedOrigin } from '@/lib/api/origin';
import type { AuthSessionPayload, NestAuthResponse } from '@/lib/api/types';

export async function POST(request: Request) {
  try {
    assertAllowedOrigin(request);
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      await clearAuthCookies();
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    const result = await nestFetch<NestAuthResponse>(
      '/auth/refresh',
      {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      },
      { auth: false, skipRefresh: true },
    );

    await setAuthCookies(result.accessToken, result.refreshToken);

    const payload: AuthSessionPayload = {
      user: result.user,
      organization: result.organization,
    };
    return NextResponse.json(payload);
  } catch (error) {
    await clearAuthCookies();
    return jsonError(error, 401);
  }
}
