// src/components/layout/Navbar.tsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';

export default function Navbar() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    api('/me')
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  if (!user) return null; // ⛔ Nothing before login

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">
        <Link href="/">EduPlatform</Link>
      </div>
      <div className="flex gap-4">
        {user.role === 'user' && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/courses">Courses</Link>
          </>
        )}
        {user.role === 'admin' && (
          <>
            <Link href="/admin">Admin Dashboard</Link>
            <Link href="/admin/courses">Manage Courses</Link>
          </>
        )}
        <button
          onClick={async () => {
            await api('/auth/logout', { method: 'POST' });
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
