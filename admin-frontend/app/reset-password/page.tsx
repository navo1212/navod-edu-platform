// src/app/reset-password/page.tsx
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Reset Password</h1>
      <ResetPasswordForm />
    </div>
  );
}
