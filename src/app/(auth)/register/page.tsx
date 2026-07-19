import { QueryProvider } from '@/lib/query/provider';
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <QueryProvider>
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <RegisterForm />
      </main>
    </QueryProvider>
  );
}
