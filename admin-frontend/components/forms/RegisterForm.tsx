'use client';
import { useState } from 'react';
import { api } from '@/lib/api-client';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    try {
      await api(`/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
      });
      setOk(true);
    } catch (err: any) {
      setError(err.message || 'Register failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm space-y-3">
      <input
        className="input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className="btn">Create account</button>
      {ok && (
        <p className="text-green-600">Account created. You can login now.</p>
      )}
    </form>
  );
}
