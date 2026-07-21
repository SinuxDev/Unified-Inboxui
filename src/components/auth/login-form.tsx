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
import { ClientApiError, clientFetchJson } from '@/lib/query/client-fetch';
import type { AuthSessionPayload } from '@/lib/api/types';
import { loginSchema } from '@/lib/validation/auth';
import { AuthSubmitButton } from '@/components/auth/auth-submit-button';

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      clientFetchJson<AuthSessionPayload>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: async () => {
      await queryClient.clear();
      router.replace('/app');
      router.refresh();
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
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
        ? 'Login failed'
        : null;

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Sign in
        </h1>
        <p className="text-sm text-muted-foreground">
          Access your organization.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <FieldGroup className="gap-4">
          {serverError ? (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          ) : null}
          <Field data-invalid={!!fieldErrors.email || undefined}>
            <FieldLabel htmlFor="email" className="text-foreground">
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              className="h-10 border-border bg-card shadow-sm dark:border-border dark:bg-card"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!fieldErrors.email || undefined}
            />
            <FieldError>{fieldErrors.email}</FieldError>
          </Field>
          <Field data-invalid={!!fieldErrors.password || undefined}>
            <FieldLabel htmlFor="password" className="text-foreground">
              Password
            </FieldLabel>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              className="h-10 border-border bg-card shadow-sm dark:border-border dark:bg-card"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!fieldErrors.password || undefined}
            />
            <FieldError>{fieldErrors.password}</FieldError>
          </Field>
        </FieldGroup>
        <div className="flex flex-col gap-3 pt-0.5">
          <AuthSubmitButton disabled={mutation.isPending}>
            {mutation.isPending ? 'Signing in…' : 'Sign in'}
          </AuthSubmitButton>
          <p className="text-sm text-muted-foreground">
            No account?{' '}
            <Link
              href="/register"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
