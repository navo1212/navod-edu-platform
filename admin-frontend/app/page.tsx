'use client';
import { useAuth } from '@/lib/auth-context';
import LoadingScreen from '@/components/forms/LoadingScreen';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Welcome</h1>
        <a className="btn" href="/login">Login</a>
        <a className="btn" href="/register">Create Account</a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Hello, {user.email}</h1>
      <p>Your role: {user.role}</p>
      <a className="btn" href="/dashboard">Go to Dashboard</a>
      {user.role === 'admin' && (
        <a className="btn" href="/admin">Go to Admin Page</a>
      )}
    </div>
  );
}
