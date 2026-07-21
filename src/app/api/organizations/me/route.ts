import { jsonError, jsonSuccess } from '@/lib/api/http';
import { nestFetch } from '@/lib/api/nest';
import type { OrganizationMe } from '@/lib/api/types';

export async function GET() {
  try {
    const data = await nestFetch<OrganizationMe>('/organizations/me');
    return jsonSuccess(data);
  } catch (error) {
    return jsonError(error);
  }
}
