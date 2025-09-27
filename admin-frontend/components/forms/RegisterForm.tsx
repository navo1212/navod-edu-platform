// src/components/forms/RegisterForm.tsx
'use client';
import { useState } from 'react';
import { api } from '@/lib/api-client';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(undefined);
    try {
      await api(`/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      setOk(true);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  if (ok) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-green-600 font-medium">
          ✅ Account created successfully!
        </p>
        <a href="/login" className="btn inline-block">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm">
      <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className="btn w-full">Register</button>

      {/* Always-visible Login button */}
      <p className="text-sm text-center">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 underline">
          Go to Login
        </a>
      </p>
    </form>
  );
}
