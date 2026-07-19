'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          Register your organization on Unified Inbox.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <FieldGroup>
            {serverError ? (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            ) : null}
            <Field data-invalid={!!fieldErrors.organizationName || undefined}>
              <FieldLabel htmlFor="organizationName">Organization</FieldLabel>
              <Input
                id="organizationName"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!fieldErrors.password || undefined}
              />
              <FieldError>{fieldErrors.password}</FieldError>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Creating…' : 'Create account'}
          </Button>
          <p className="text-sm text-muted-foreground">
            Already registered?{' '}
            <Link href="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
