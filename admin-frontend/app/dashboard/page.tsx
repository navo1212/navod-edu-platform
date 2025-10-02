// // src/app/dashboard/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { api, setAccessToken } from '@/lib/api-client';

// export default function Dashboard() {
//   const [me, setMe] = useState<any>();
//   const [error, setError] = useState<string>();

//   useEffect(() => {
//     (async () => {
//       try {
//         // 🔄 Force refresh first (cold start fix)
//         const refresh = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
//           { method: 'POST', credentials: 'include' }
//         );

//         if (refresh.ok) {
//           const { accessToken } = await refresh.json();
//           setAccessToken(accessToken);
//         } else {
//           // if refresh fails, redirect to login
//           window.location.href = '/login';
//           return;
//         }

//         // ✅ Now safely call /me
//         const user = await api('/me');
//         setMe(user);
//       } catch (err: any) {
//         setError(err.message || 'Failed to load dashboard');
//       }
//     })();
//   }, []);

//   return (
//     <div className="space-y-4">
//       <h1 className="text-xl font-semibold">User Dashboard</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       {me && <p>Welcome, {me.name || me.email}!</p>}
//     </div> 
//   );
// }
// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { api, setAccessToken } from '@/lib/api-client';

export default function Dashboard() {
  const [me, setMe] = useState<any>();
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        // 🔄 Refresh token first
        const refresh = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          { method: 'POST', credentials: 'include' }
        );

        if (refresh.ok) {
          const { accessToken } = await refresh.json();
          setAccessToken(accessToken);
        } else {
          window.location.href = '/login';
          return;
        }

        // ✅ Fetch user profile
        const user = await api('/me');
        setMe(user);

        // ✅ Fetch enrolled courses
        const enrolled = await api('/enrollments/my-courses');
        setCourses(enrolled);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard');
      }
    })();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold">User Dashboard</h1>

      {error && <p className="text-red-500">{error}</p>}

      {me && (
        <div className="p-4 border rounded bg-gray-50">
          <p>
            <span className="font-medium">Welcome,</span>{' '}
            {me.name || me.email}!
          </p>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-3">My Courses</h2>
        {courses.length === 0 ? (
          <p className="text-gray-500">You are not enrolled in any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((c) => (
              <a
                key={c._id}
                href={`/dashboard/courses/${c._id}`}
                className="border p-4 rounded shadow-sm hover:shadow-md"
              >
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
