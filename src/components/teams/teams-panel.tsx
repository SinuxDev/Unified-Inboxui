'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Skeleton } from '@/components/ui/skeleton';
import type { OrganizationMe, Team } from '@/lib/api/types';
import { ClientApiError, clientFetchJson } from '@/lib/query/client-fetch';
import { queryKeys } from '@/lib/query/keys';
import { createTeamSchema } from '@/lib/validation/auth';

function canCreateTeam(role: OrganizationMe['role']) {
  return role === 'owner' || role === 'admin';
}

export function TeamsPanel() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);

  const orgQuery = useQuery({
    queryKey: queryKeys.orgMe,
    queryFn: () => clientFetchJson<OrganizationMe>('/api/organizations/me'),
  });

  const teamsQuery = useQuery({
    queryKey: queryKeys.teams,
    queryFn: () => clientFetchJson<Team[]>('/api/teams'),
  });

  const createMutation = useMutation({
    mutationFn: (body: { name: string }) =>
      clientFetchJson<Team>('/api/teams', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: async () => {
      setName('');
      setFieldError(null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.teams });
    },
  });

  const allowCreate =
    orgQuery.data != null && canCreateTeam(orgQuery.data.role);

  function onCreate(e: React.FormEvent) {
    e.preventDefault();
    const parsed = createTeamSchema.safeParse({ name });
    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? 'Invalid name');
      return;
    }
    setFieldError(null);
    createMutation.mutate(parsed.data);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Teams</CardTitle>
          <CardDescription>
            Teams belong to your current organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {teamsQuery.isLoading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-40" />
            </div>
          ) : teamsQuery.error ? (
            <Alert variant="destructive">
              <AlertTitle>Could not load teams</AlertTitle>
              <AlertDescription>
                {teamsQuery.error instanceof ClientApiError
                  ? teamsQuery.error.message
                  : 'Request failed'}
              </AlertDescription>
            </Alert>
          ) : teamsQuery.data && teamsQuery.data.length === 0 ? (
            <p className="text-sm text-muted-foreground">No teams yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {teamsQuery.data?.map((team) => (
                <li
                  key={team.id}
                  className="rounded-md border border-border px-3 py-2 text-sm"
                >
                  {team.name}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {allowCreate ? (
        <Card>
          <CardHeader>
            <CardTitle>Create team</CardTitle>
            <CardDescription>
              Owners and admins can create teams.
            </CardDescription>
          </CardHeader>
          <form onSubmit={onCreate}>
            <CardContent>
              <FieldGroup>
                {createMutation.error ? (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {createMutation.error instanceof ClientApiError
                        ? createMutation.error.message
                        : 'Could not create team'}
                    </AlertDescription>
                  </Alert>
                ) : null}
                <Field data-invalid={!!fieldError || undefined}>
                  <FieldLabel htmlFor="teamName">Name</FieldLabel>
                  <Input
                    id="teamName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!fieldError || undefined}
                  />
                  <FieldError>{fieldError}</FieldError>
                </Field>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Creating…' : 'Create team'}
                </Button>
              </FieldGroup>
            </CardContent>
          </form>
        </Card>
      ) : orgQuery.data ? (
        <p className="text-sm text-muted-foreground">
          Your role ({orgQuery.data.role}) cannot create teams.
        </p>
      ) : null}
    </div>
  );
}
