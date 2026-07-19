'use client';

import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { OrganizationMe } from '@/lib/api/types';
import { ClientApiError, clientFetchJson } from '@/lib/query/client-fetch';
import { queryKeys } from '@/lib/query/keys';

export function OrgHome() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.orgMe,
    queryFn: () => clientFetchJson<OrganizationMe>('/api/organizations/me'),
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    const message =
      error instanceof ClientApiError
        ? error.message
        : 'Failed to load organization';
    return (
      <Alert variant="destructive">
        <AlertTitle>Could not load organization</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.organizationName}</CardTitle>
        <CardDescription>
          Phase 0 foundation — auth, org context, and teams.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        <p>
          <span className="text-muted-foreground">Role:</span> {data.role}
        </p>
        <p>
          <span className="text-muted-foreground">Signed in as:</span>{' '}
          {data.email}
        </p>
      </CardContent>
    </Card>
  );
}
