// // frontend/src/middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   const access = req.cookies.get('access_token')?.value;

//   const { pathname } = req.nextUrl;

//   // Protect these routes
//   const protectedPaths = ['/admin', '/dashboard'];
//   const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

//   if (isProtected && !access) {
//     const loginUrl = new URL('/login', req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*', '/dashboard/:path*'],
// };

//after add course admin
// frontend/src/middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const access = req.cookies.get('access_token')?.value;

//   // Protect these routes
//   const isAdminRoute = pathname.startsWith('/admin');
//   const isDashboardRoute = pathname.startsWith('/dashboard');

//   // If visiting protected route but not logged in → login
//   if ((isAdminRoute || isDashboardRoute) && !access) {
//     const loginUrl = new URL('/login', req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // If logged in and on an admin route, verify role
//   if (isAdminRoute && access) {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
//         headers: { Authorization: `Bearer ${access}` },
//         credentials: 'include',
//       });

//       if (!res.ok) throw new Error('Unauthorized');
//       const user = await res.json();

//       if (user.role !== 'admin') {
//         // redirect non-admins to dashboard
//         const dashUrl = new URL('/dashboard', req.url);
//         return NextResponse.redirect(dashUrl);
//       }
//     } catch {
//       const loginUrl = new URL('/login', req.url);
//       return NextResponse.redirect(loginUrl);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*', '/dashboard/:path*'],
// };

//after user course

// frontend/src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = {
  admin: ['/admin'],
  user: ['/dashboard'],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPath = protectedPaths.admin.some((path) =>
    pathname.startsWith(path),
  );
  const isUserPath = protectedPaths.user.some((path) =>
    pathname.startsWith(path),
  );

  if (isAdminPath || isUserPath) {
    const accessToken = req.cookies.get('access_token')?.value;

    // 🚫 No token → redirect to login
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // ✅ Verify user role by calling backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Unauthorized');
      const user = await res.json();

      // 🔹 If user is not admin but tries admin route
      if (isAdminPath && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      // 🔹 If somehow role is invalid for user dashboard
      if (isUserPath && !['admin', 'user'].includes(user.role)) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // ✅ Otherwise, allow request
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Not a protected route → allow
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
