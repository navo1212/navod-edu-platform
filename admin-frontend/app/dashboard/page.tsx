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
// 'use client';

// import { useEffect, useState } from 'react';
// import { api, setAccessToken } from '@/lib/api-client';

// export default function Dashboard() {
//   const [me, setMe] = useState<any>();
//   const [courses, setCourses] = useState<any[]>([]);
//   const [error, setError] = useState<string>();

//   useEffect(() => {
//     (async () => {
//       try {
//         // 🔄 Refresh token first
//         const refresh = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
//           { method: 'POST', credentials: 'include' }
//         );

//         if (refresh.ok) {
//           const { accessToken } = await refresh.json();
//           setAccessToken(accessToken);
//         } else {
//           window.location.href = '/login';
//           return;
//         }

//         // ✅ Fetch user profile
//         const user = await api('/me');
//         setMe(user);

//         // ✅ Fetch enrolled courses
//         const enrolled = await api('/enrollments/my-courses');
//         setCourses(enrolled);
//       } catch (err: any) {
//         setError(err.message || 'Failed to load dashboard');
//       }
//     })();
//   }, []);

//   return (
//     <div className="space-y-8">
//       <h1 className="text-xl font-semibold">User Dashboard</h1>

//       {error && <p className="text-red-500">{error}</p>}

//       {me && (
//         <div className="p-4 border rounded bg-gray-50">
//           <p>
//             <span className="font-medium">Welcome,</span>{' '}
//             {me.name || me.email}!
//           </p>
//         </div>
//       )}

//       <div>
//         <h2 className="text-lg font-semibold mb-3">My Courses</h2>
//         {courses.length === 0 ? (
//           <p className="text-gray-500">You are not enrolled in any courses yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {courses.map((c) => (
//               <a
//                 key={c._id}
//                 href={`/dashboard/courses/${c._id}`}
//                 className="border p-4 rounded shadow-sm hover:shadow-md"
//               >
//                 <h3 className="font-semibold text-lg">{c.title}</h3>
//                 <p className="text-sm text-gray-600">{c.description}</p>
//               </a>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


//after ui added

"use client"

import { useEffect, useState } from "react"
import { api, setAccessToken } from "@/lib/api-client"
import { BookOpen, User, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [me, setMe] = useState<any>()
  const [courses, setCourses] = useState<any[]>([])
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const refresh = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        })

        if (refresh.ok) {
          const { accessToken } = await refresh.json()
          setAccessToken(accessToken)
        } else {
          window.location.href = "/login"
          return
        }

        const user = await api("/me")
        setMe(user)

        const enrolled = await api("/enrollments/my-courses")
        setCourses(enrolled)
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your learning progress.</p>
      </div>

      {me && (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{me.name || "Student"}</h2>
              <p className="text-muted-foreground">{me.email}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            My Courses
          </h2>
          <Link href="/courses" className="text-sm text-primary hover:underline font-medium">
            Browse all courses
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => (
              <Link
                key={c._id}
                href={`/dashboard/courses/${c._id}`}
                className="group bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/50"
              >
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{c.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-sm text-primary font-medium">Continue learning →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
