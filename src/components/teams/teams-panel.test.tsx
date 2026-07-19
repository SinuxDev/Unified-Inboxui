import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { TeamsPanel } from '@/components/teams/teams-panel';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

function renderTeams() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <TeamsPanel />
    </QueryClientProvider>,
  );
}

describe('TeamsPanel', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo) => {
        const url = String(input);
        if (url.includes('/api/organizations/me')) {
          return Response.json({
            organizationId: 'org-1',
            organizationName: 'Acme',
            role: 'member',
            userId: 'u-1',
            email: 'm@example.com',
          });
        }
        if (url.includes('/api/teams')) {
          return Response.json([
            {
              id: 't-1',
              name: 'Support',
              organizationId: 'org-1',
              createdAt: '2026-01-01',
            },
          ]);
        }
        return new Response('not found', { status: 404 });
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('hides create team for members', async () => {
    renderTeams();
    expect(await screen.findByText('Support')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /create team/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/cannot create teams/i)).toBeInTheDocument();
  });
});
