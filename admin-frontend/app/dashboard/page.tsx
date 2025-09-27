'use client';
import { useAuth } from '@/lib/auth-context';
import LoadingScreen from '@/components/forms/LoadingScreen';

export default function Dashboard() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <p>Unauthorized</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold">User Dashboard</h1>
      <p>Welcome back, {user.email}</p>
    </div>
  );
}
