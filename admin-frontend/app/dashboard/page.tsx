// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { api, setAccessToken } from '@/lib/api-client';

export default function Dashboard() {
  const [me, setMe] = useState<any>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        // 🔄 Force refresh first (cold start fix)
        const refresh = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          { method: 'POST', credentials: 'include' }
        );

        if (refresh.ok) {
          const { accessToken } = await refresh.json();
          setAccessToken(accessToken);
        } else {
          // if refresh fails, redirect to login
          window.location.href = '/login';
          return;
        }

        // ✅ Now safely call /me
        const user = await api('/me');
        setMe(user);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard');
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">User Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {me && <p>Welcome, {me.name || me.email}!</p>}
    </div>
  );
}
