// src/lib/api-client.ts
let accessToken: string | null = null;
export const setAccessToken = (t: string | null) => { accessToken = t; };

export async function api<T = any>(path: string, init: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;

  // Ensure we have an access token before first request
  if (!accessToken) {
    const r = await fetch(`${base}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (r.ok) {
      const { accessToken: newAcc } = await r.json();
      setAccessToken(newAcc);
    }
  }

  const doFetch = async () =>
    fetch(`${base}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(init.headers || {}),
      },
      credentials: 'include',
    });

  let res = await doFetch();

  // If still unauthorized, try one more refresh
  if (res.status === 401) {
    const r = await fetch(`${base}/auth/refresh`, { method: 'POST', credentials: 'include' });
    if (r.ok) {
      const { accessToken: newAcc } = await r.json();
      setAccessToken(newAcc);
      res = await doFetch();
    }
  }

  if (!res.ok) throw new Error(await res.text());
  try {
    return (await res.json()) as T;
  } catch {
    return undefined as T;
  }
}
