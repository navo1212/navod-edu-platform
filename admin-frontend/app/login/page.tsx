// src/app/login/page.tsx
import LoginForm from '@/components/forms/LoginForm';

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Login</h1>
      <LoginForm />
    </div>
  );
}
