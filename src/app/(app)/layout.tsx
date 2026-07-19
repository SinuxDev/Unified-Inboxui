import { AppHeader } from '@/components/app/app-header';
import { QueryProvider } from '@/lib/query/provider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
    </QueryProvider>
  );
}
