// src/app/layout.tsx
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { cookies } from 'next/headers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get('access_token');

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {hasAccess && <Navbar />}
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
