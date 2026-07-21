'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { AuthSessionPayload } from '@/lib/api/types';
import { ClientApiError, clientFetchJson } from '@/lib/query/client-fetch';
import { registerSchema } from '@/lib/validation/auth';
import { AuthStagger, AuthStaggerItem } from '@/components/auth/auth-stagger';
import { AuthSubmitButton } from '@/components/auth/auth-submit-button';

export function RegisterForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (body: {
      email: string;
      password: string;
      organizationName: string;
      displayName?: string;
    }) =>
      clientFetchJson<AuthSessionPayload>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: async () => {
      await queryClient.clear();
      router.replace('/');
      router.refresh();
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = registerSchema.safeParse({
      email,
      password,
      organizationName,
      displayName: displayName.trim() || undefined,
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        if (!next[key]) next[key] = issue.message;
      }
      setFieldErrors(next);
      return;
    }
    setFieldErrors({});
    mutation.mutate(parsed.data);
  }

  const serverError =
    mutation.error instanceof ClientApiError
      ? mutation.error.message
      : mutation.error
        ? 'Registration failed'
        : null;

  return (
    <AuthStagger className="flex w-full flex-col gap-5">
      <AuthStaggerItem className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Create account
        </h1>
        <p className="text-sm text-secondary-foreground">
          Register your organization on Unified Inbox.
        </p>
      </AuthStaggerItem>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <AuthStaggerItem>
          <FieldGroup className="gap-4">
            {serverError ? (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            ) : null}
            <Field data-invalid={!!fieldErrors.organizationName || undefined}>
              <FieldLabel htmlFor="organizationName">Organization</FieldLabel>
              <Input
                id="organizationName"
                className="h-10"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                aria-invalid={!!fieldErrors.organizationName || undefined}
              />
              <FieldError>{fieldErrors.organizationName}</FieldError>
            </Field>
            <Field data-invalid={!!fieldErrors.email || undefined}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                className="h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!fieldErrors.email || undefined}
              />
              <FieldError>{fieldErrors.email}</FieldError>
            </Field>
            <Field data-invalid={!!fieldErrors.displayName || undefined}>
              <FieldLabel htmlFor="displayName">
                Display name (optional)
              </FieldLabel>
              <Input
                id="displayName"
                className="h-10"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <FieldError>{fieldErrors.displayName}</FieldError>
            </Field>
            <Field data-invalid={!!fieldErrors.password || undefined}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                className="h-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!fieldErrors.password || undefined}
              />
              <FieldError>{fieldErrors.password}</FieldError>
            </Field>
          </FieldGroup>
        </AuthStaggerItem>
        <AuthStaggerItem className="flex flex-col gap-3 pt-0.5">
          <AuthSubmitButton disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating…' : 'Create account'}
          </AuthSubmitButton>
          <p className="text-center text-sm text-secondary-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </AuthStaggerItem>
      </form>
    </AuthStagger>
  );
}
