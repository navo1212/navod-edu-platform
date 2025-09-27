'use client';
import { useAuth } from '@/lib/auth-context';
import LoadingScreen from '@/components/forms/LoadingScreen';

export default function AdminPage() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user || user.role !== 'admin') return <p>Forbidden</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <p>Only admins can see this.</p>
    </div>
  );
}
