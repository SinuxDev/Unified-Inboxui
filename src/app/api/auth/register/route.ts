import { NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/api/cookies';
import { jsonError } from '@/lib/api/http';
import { nestFetch } from '@/lib/api/nest';
import type { AuthSessionPayload, NestAuthResponse } from '@/lib/api/types';
import { registerSchema } from '@/lib/validation/auth';

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const body = registerSchema.parse({
      ...raw,
      displayName:
        typeof raw.displayName === 'string' && raw.displayName.trim() === ''
          ? undefined
          : raw.displayName,
    });
    const result = await nestFetch<NestAuthResponse>(
      '/auth/register',
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
