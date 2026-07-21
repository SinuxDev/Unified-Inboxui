import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '@/lib/api/api-response';
import { ApiError } from '@/lib/api/nest';
import { OriginError } from '@/lib/api/origin';

export function jsonSuccess<T>(
  data: T,
  status = 200,
  message = 'OK',
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function jsonError(
  error: unknown,
  fallbackStatus = 500,
): NextResponse<ApiErrorResponse> {
  if (error instanceof OriginError) {
    return NextResponse.json(
      { success: false, message: error.message, data: null },
      { status: 403 },
    );
  }
  if (error instanceof ApiError) {
    return NextResponse.json(
      { success: false, message: error.message, data: null },
      { status: error.status },
    );
  }
  if (error instanceof ZodError) {
    const message = error.issues.map((issue) => issue.message).join(', ');
    return NextResponse.json(
      { success: false, message, data: null },
      { status: 400 },
    );
  }
  const message =
    error instanceof Error ? error.message : 'Unexpected server error';
  return NextResponse.json(
    { success: false, message, data: null },
    { status: fallbackStatus },
  );
}
