import { QueryProvider } from '@/lib/query/provider';
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <QueryProvider>
      <RegisterForm />
    </QueryProvider>
  );
}
