import { QueryProvider } from '@/lib/query/provider';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <QueryProvider>
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <LoginForm />
      </main>
    </QueryProvider>
  );
}
