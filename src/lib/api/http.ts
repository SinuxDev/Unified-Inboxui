import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ApiError } from '@/lib/api/nest';

export function jsonError(error: unknown, fallbackStatus = 500) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  }
  if (error instanceof ZodError) {
    const message = error.issues.map((issue) => issue.message).join(', ');
    return NextResponse.json({ error: message }, { status: 400 });
  }
  const message =
    error instanceof Error ? error.message : 'Unexpected server error';
  return NextResponse.json({ error: message }, { status: fallbackStatus });
}
