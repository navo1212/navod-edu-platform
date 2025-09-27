'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';

export default function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get('token');
    if (t) setToken(t);
  }, []);

  const request = async (e: React.FormEvent) => {
    e.preventDefault();
    await api(`/auth/request-password-reset`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    setSent(true);
  };

  const reset = async (e: React.FormEvent) => {
    e.preventDefault();
    await api(`/auth/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
    alert('Password reset. You can login now.');
    window.location.href = '/login';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <form onSubmit={request} className="space-y-3">
        <h2 className="font-semibold">Request reset link</h2>
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn">Send link</button>
        {sent && (
          <p className="text-green-600">
            If that email exists, a link was sent.
          </p>
        )}
      </form>

      <form onSubmit={reset} className="space-y-3">
        <h2 className="font-semibold">Set new password</h2>
        <input
          className="input"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn">Reset</button>
      </form>
    </div>
  );
}
