'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { OrganizationMe } from '@/lib/api/types';
import { clientFetchJson } from '@/lib/query/client-fetch';
import { queryKeys } from '@/lib/query/keys';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/teams', label: 'Teams' },
];

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const orgQuery = useQuery({
    queryKey: queryKeys.orgMe,
    queryFn: () => clientFetchJson<OrganizationMe>('/api/organizations/me'),
  });

  const logout = useMutation({
    mutationFn: () =>
      clientFetchJson<{ ok: boolean }>('/api/auth/logout', { method: 'POST' }),
    onSuccess: async () => {
      await queryClient.clear();
      router.replace('/login');
      router.refresh();
    },
  });

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold tracking-tight">
            Unified Inbox
          </Link>
          <nav className="flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground',
                  pathname === item.href && 'bg-muted text-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {orgQuery.isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : orgQuery.data ? (
            <p className="hidden text-sm text-muted-foreground sm:block">
              {orgQuery.data.organizationName} · {orgQuery.data.role}
            </p>
          ) : null}
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
