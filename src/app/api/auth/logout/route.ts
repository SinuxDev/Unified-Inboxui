import { clearAuthCookies } from '@/lib/api/cookies';
import { jsonError, jsonSuccess } from '@/lib/api/http';
import { nestFetch } from '@/lib/api/nest';
import { assertAllowedOrigin } from '@/lib/api/origin';

export async function POST(request: Request) {
  try {
    assertAllowedOrigin(request);
    try {
      await nestFetch<null>(
        '/auth/logout',
        { method: 'POST' },
        { auth: false, skipRefresh: true },
      );
    } catch {
      // Best-effort Nest ack; always clear cookies locally.
    }
    await clearAuthCookies();
    return jsonSuccess(null);
  } catch (error) {
    return jsonError(error, 403);
  }
}
