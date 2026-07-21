import {
  clearAuthCookies,
  getRefreshToken,
  setAuthCookies,
} from '@/lib/api/cookies';
import { jsonError, jsonSuccess } from '@/lib/api/http';
import { nestFetch } from '@/lib/api/nest';
import { assertAllowedOrigin } from '@/lib/api/origin';
import type { AuthSessionPayload, NestAuthResponse } from '@/lib/api/types';

export async function POST(request: Request) {
  try {
    assertAllowedOrigin(request);
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      await clearAuthCookies();
      return jsonError(new Error('No refresh token'), 401);
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
    return jsonSuccess(payload);
  } catch (error) {
    await clearAuthCookies();
    return jsonError(error, 401);
  }
}
