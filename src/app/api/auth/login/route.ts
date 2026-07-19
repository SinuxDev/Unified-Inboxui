import { NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/api/cookies';
import { jsonError } from '@/lib/api/http';
import { nestFetch } from '@/lib/api/nest';
import { assertAllowedOrigin } from '@/lib/api/origin';
import type { AuthSessionPayload, NestAuthResponse } from '@/lib/api/types';
import { loginSchema } from '@/lib/validation/auth';

export async function POST(request: Request) {
  try {
    assertAllowedOrigin(request);
    const body = loginSchema.parse(await request.json());
    const result = await nestFetch<NestAuthResponse>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify(body) },
      { auth: false },
    );

    await setAuthCookies(result.accessToken, result.refreshToken);

    const payload: AuthSessionPayload = {
      user: result.user,
      organization: result.organization,
    };
    return NextResponse.json(payload);
  } catch (error) {
    return jsonError(error, 400);
  }
}
