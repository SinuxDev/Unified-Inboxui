import { describe, expect, it } from 'vitest';
import {
  createTeamSchema,
  loginSchema,
  registerSchema,
} from '@/lib/validation/auth';

describe('auth schemas', () => {
  it('rejects short passwords on login', () => {
    const result = loginSchema.safeParse({
      email: 'a@example.com',
      password: 'short',
    });
    expect(result.success).toBe(false);
  });

  it('accepts valid login', () => {
    const result = loginSchema.safeParse({
      email: 'a@example.com',
      password: 'password1',
    });
    expect(result.success).toBe(true);
  });

  it('requires organization name on register', () => {
    const result = registerSchema.safeParse({
      email: 'a@example.com',
      password: 'password1',
      organizationName: 'A',
    });
    expect(result.success).toBe(false);
  });
});

describe('createTeamSchema', () => {
  it('requires a name of at least 2 characters', () => {
    expect(createTeamSchema.safeParse({ name: 'x' }).success).toBe(false);
    expect(createTeamSchema.safeParse({ name: 'Ops' }).success).toBe(true);
  });
});
