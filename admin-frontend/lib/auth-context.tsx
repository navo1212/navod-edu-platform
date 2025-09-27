'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { api, setAccessToken } from './api-client';

type User = { id: string; email: string; role: 'admin' | 'user' };

const AuthCtx = createContext<{
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}>({ user: null, loading: true, login: async () => {}, logout: async () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate session on load
  useEffect(() => {
    api<User>('/me')
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { accessToken } = await api<{ accessToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAccessToken(accessToken);
    const u = await api<User>('/me');
    setUser(u);
  };

  const logout = async () => {
    await api('/auth/logout', { method: 'POST' });
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthCtx.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => useContext(AuthCtx);
