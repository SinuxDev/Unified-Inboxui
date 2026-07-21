export type ApiSuccessResponse<T = unknown> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  data: null;
  errors?: Record<string, string[]>;
};

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export function isApiErrorResponse(body: unknown): body is ApiErrorResponse {
  return (
    typeof body === 'object' &&
    body !== null &&
    'success' in body &&
    (body as ApiErrorResponse).success === false
  );
}

export function isApiSuccessResponse<T>(
  body: unknown,
): body is ApiSuccessResponse<T> {
  return (
    typeof body === 'object' &&
    body !== null &&
    'success' in body &&
    (body as ApiSuccessResponse<T>).success === true
  );
}

export function messageFromBody(body: unknown, fallback: string): string {
  if (isApiErrorResponse(body)) {
    return body.message;
  }
  if (
    typeof body === 'object' &&
    body !== null &&
    'message' in body &&
    (typeof (body as { message: unknown }).message === 'string' ||
      Array.isArray((body as { message: unknown }).message))
  ) {
    return Array.isArray((body as { message: unknown }).message)
      ? (body as { message: string[] }).message.join(', ')
      : (body as { message: string }).message;
  }
  if (
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof (body as { error: unknown }).error === 'string'
  ) {
    return (body as { error: string }).error;
  }
  return fallback;
}
