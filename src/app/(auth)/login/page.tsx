import { QueryProvider } from '@/lib/query/provider';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <QueryProvider>
      <LoginForm />
    </QueryProvider>
  );
}
