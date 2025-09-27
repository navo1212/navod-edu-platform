// src/components/forms/LoginForm.tsx
'use client';
import { useState } from 'react';
import { api, setAccessToken } from '@/lib/api-client';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(undefined);
    try {
      const { accessToken, role } = await api<{ accessToken: string; role: string }>(
        `/auth/login`,
        { method: 'POST', body: JSON.stringify({ email, password }) }
      );

      // Store access token in cookie for middleware to detect
      document.cookie = `access_token=${accessToken}; path=/; SameSite=Lax`;

      setAccessToken(accessToken);
      window.location.href = role === 'admin' ? '/admin' : '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm">
      <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className="btn w-full" disabled={loading}>
        {loading ? 'Logging in…' : 'Login'}
      </button>
      <p className="text-sm text-center">
        Don&apos;t have an account?{' '}
        <a href="/register" className="text-blue-600 underline">
          Register Now
        </a>
      </p>
    </form>
  );
}
