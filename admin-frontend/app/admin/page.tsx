// src/app/admin/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';

export default function AdminPage() {
  const [me, setMe] = useState<any>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    api('/me').then(setMe).catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {me && <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(me, null, 2)}</pre>}
    </div>
  );
}
