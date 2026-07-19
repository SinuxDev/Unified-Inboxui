export class OriginError extends Error {
  constructor(message = 'Origin not allowed') {
    super(message);
    this.name = 'OriginError';
  }
}

function allowedOrigins(): string[] {
  const raw =
    process.env.ALLOWED_ORIGINS ??
    process.env.APP_ORIGIN ??
    'http://localhost:3000';
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

/** Validate Origin/Referer on browser-initiated mutating requests. */
export function assertAllowedOrigin(request: Request): void {
  const allowed = allowedOrigins();
  const origin = request.headers.get('origin');
  if (origin) {
    if (!allowed.includes(origin)) {
      throw new OriginError();
    }
    return;
  }

  // Same-origin navigations / some clients may omit Origin; accept Referer host match.
  const referer = request.headers.get('referer');
  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (allowed.includes(refererOrigin)) {
        return;
      }
    } catch {
      throw new OriginError();
    }
    throw new OriginError();
  }

  // No Origin/Referer: allow server-to-server and same-machine tooling in development only.
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  throw new OriginError();
}
