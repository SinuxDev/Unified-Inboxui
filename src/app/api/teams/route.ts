import { jsonError, jsonSuccess } from '@/lib/api/http';
import { nestFetch } from '@/lib/api/nest';
import { assertAllowedOrigin } from '@/lib/api/origin';
import type { Team } from '@/lib/api/types';
import { createTeamSchema } from '@/lib/validation/auth';

export async function GET() {
  try {
    const data = await nestFetch<Team[]>('/teams');
    return jsonSuccess(data);
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    assertAllowedOrigin(request);
    const body = createTeamSchema.parse(await request.json());
    const data = await nestFetch<Team>('/teams', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return jsonSuccess(data, 201);
  } catch (error) {
    return jsonError(error, 400);
  }
}
