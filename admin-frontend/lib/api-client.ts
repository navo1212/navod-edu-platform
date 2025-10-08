// // src/lib/api-client.ts
// let accessToken: string | null = null;
// export const setAccessToken = (t: string | null) => { accessToken = t; };

// export async function api<T = any>(path: string, init: RequestInit = {}) {
//   const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
//   const doFetch = async () => fetch(`${base}${path}`, {
//     ...init,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
//       ...(init.headers || {}),
//     },
//     credentials: 'include',
//   });

//   let res = await doFetch();
//   if (res.status === 401) {
//     const r = await fetch(`${base}/auth/refresh`, { method: 'POST', credentials: 'include' });
//     if (r.ok) {
//       const { accessToken: newAcc } = await r.json();
//       setAccessToken(newAcc);
//       res = await doFetch();
//     }
//   }
//   if (!res.ok) throw new Error(await res.text());
//   try { return await res.json() as T; } catch { return undefined as T; }
// }

// working user uda code eka



// // src/lib/api-client.ts
// let accessToken: string | null = null;

// // Store in memory only (safer than localStorage)
// export const setAccessToken = (t: string | null) => {
//   accessToken = t;
// };

// export const getAccessToken = async (): Promise<string | null> => {
//   if (accessToken) return accessToken;

//   // Try to refresh if no token in memory
//   const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
//   const res = await fetch(`${base}/auth/refresh`, {
//     method: 'POST',
//     credentials: 'include', // send refresh_token cookie
//   });

//   if (res.ok) {
//     const { accessToken: newAcc } = await res.json();
//     setAccessToken(newAcc);
//     return newAcc;
//   }

//   return null;
// };

// export async function api<T = any>(
//   path: string,
//   init: RequestInit = {}
// ): Promise<T> {
//   const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
//   const token = await getAccessToken();

//   const doFetch = async () =>
//     fetch(`${base}${path}`, {
//       ...init,
//       headers: {
//         'Content-Type': 'application/json',
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         ...(init.headers || {}),
//       },
//       credentials: 'include',
//     });

//   let res = await doFetch();

//   // Auto-refresh if token expired
//   if (res.status === 401) {
//     const refreshed = await getAccessToken();
//     if (refreshed) {
//       res = await doFetch();
//     }
//   }

//   if (!res.ok) {
//     const msg = await res.text();
//     throw new Error(msg || `Request failed: ${res.status}`);
//   }

//   try {
//     return (await res.json()) as T;
//   } catch {
//     return undefined as T;
//   }
// }

// // Optional helpers
// export async function login(email: string, password: string) {
//   const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
//   const res = await fetch(`${base}/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//     body: JSON.stringify({ email, password }),
//   });
//   if (!res.ok) throw new Error(await res.text());
//   const { accessToken: newAcc, role } = await res.json();
//   setAccessToken(newAcc);
//   return { role };
// }

// export async function logout() {
//   const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
//   await fetch(`${base}/auth/logout`, {
//     method: 'POST',
//     credentials: 'include',
//   });
//   setAccessToken(null);
// }


//after ui added

let accessToken: string | null = null

// Store in memory only (safer than localStorage)
export const setAccessToken = (t: string | null) => {
  accessToken = t
}

export const getAccessToken = async (): Promise<string | null> => {
  if (accessToken) return accessToken

  // Try to refresh if no token in memory
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!
  const res = await fetch(`${base}/auth/refresh`, {
    method: "POST",
    credentials: "include", // send refresh_token cookie
  })

  if (res.ok) {
    const { accessToken: newAcc } = await res.json()
    setAccessToken(newAcc)
    return newAcc
  }

  return null
}

export async function api<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!
  const token = await getAccessToken()

  const doFetch = async () =>
    fetch(`${base}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init.headers || {}),
      },
      credentials: "include",
    })

  let res = await doFetch()

  // Auto-refresh if token expired
  if (res.status === 401) {
    const refreshed = await getAccessToken()
    if (refreshed) {
      res = await doFetch()
    }
  }

  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || `Request failed: ${res.status}`)
  }

  try {
    return (await res.json()) as T
  } catch {
    return undefined as T
  }
}

// Optional helpers
export async function login(email: string, password: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!
  const res = await fetch(`${base}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error(await res.text())
  const { accessToken: newAcc, role } = await res.json()
  setAccessToken(newAcc)
  return { role }
}

export async function logout() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!
  await fetch(`${base}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })
  setAccessToken(null)
}
