import { describe, expect, it, afterEach } from 'vitest';
import { assertAllowedOrigin, OriginError } from '@/lib/api/origin';

describe('assertAllowedOrigin', () => {
  const prevAllowed = process.env.ALLOWED_ORIGINS;
  const prevApp = process.env.APP_ORIGIN;

  afterEach(() => {
    if (prevAllowed === undefined) {
      Reflect.deleteProperty(process.env, 'ALLOWED_ORIGINS');
    } else {
      process.env.ALLOWED_ORIGINS = prevAllowed;
    }
    if (prevApp === undefined) {
      Reflect.deleteProperty(process.env, 'APP_ORIGIN');
    } else {
      process.env.APP_ORIGIN = prevApp;
    }
  });

  it('allows matching Origin', () => {
    process.env.ALLOWED_ORIGINS = 'http://localhost:3000';
    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    });
    expect(() => assertAllowedOrigin(request)).not.toThrow();
  });

  it('rejects mismatched Origin', () => {
    process.env.ALLOWED_ORIGINS = 'http://localhost:3000';
    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { origin: 'https://evil.example' },
    });
    expect(() => assertAllowedOrigin(request)).toThrow(OriginError);
  });
});
