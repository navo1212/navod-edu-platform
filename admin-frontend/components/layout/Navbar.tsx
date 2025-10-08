// // src/components/layout/Navbar.tsx
// 'use client';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { api } from '@/lib/api-client';

// export default function Navbar() {
//   const [user, setUser] = useState<any | null>(null);

//   useEffect(() => {
//     api('/me')
//       .then(setUser)
//       .catch(() => setUser(null));
//   }, []);

//   if (!user) return null; // ⛔ Nothing before login

//   return (
//     <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
//       <div className="text-lg font-bold">
//         <Link href="/">EduPlatform</Link>
//       </div>
//       <div className="flex gap-4">
//         {user.role === 'user' && (
//           <>
//             <Link href="/dashboard">Dashboard</Link>
//             <Link href="/dashboard/courses">Courses</Link>
//           </>
//         )}
//         {user.role === 'admin' && (
//           <>
//             <Link href="/admin">Admin Dashboard</Link>
//             <Link href="/admin/courses">Manage Courses</Link>
//           </>
//         )}
//         <button
//           onClick={async () => {
//             await api('/auth/logout', { method: 'POST' });
//             window.location.href = '/login';
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }


//after ui added

"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { api, logout } from "@/lib/api-client"
import { useCart } from "@/context/CartContext"
import { ShoppingCart, LayoutDashboard, BookOpen, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EnhancedNavbar() {
  const [user, setUser] = useState<any | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { getTotalItems } = useCart()
  const cartItemCount = getTotalItems()

  useEffect(() => {
    api("/me")
      .then(setUser)
      .catch(() => setUser(null))
  }, [])

  const handleLogout = async () => {
    await logout()
    window.location.href = "/login"
  }

  if (!user) return null

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
            EduPlatform
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user.role === "user" && (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/courses"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Courses
                </Link>
                <Link
                  href="/checkout"
                  className="relative flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Checkout
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-in zoom-in-50">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </>
            )}
            {user.role === "admin" && (
              <>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Admin Dashboard
                </Link>
                <Link
                  href="/admin/courses"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Manage Courses
                </Link>
              </>
            )}
            <Button onClick={handleLogout} variant="ghost" size="sm" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-3">
              {user.role === "user" && (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/courses"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    Courses
                  </Link>
                  <Link
                    href="/checkout"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="w-4 h-4" />
                      Checkout
                    </div>
                    {cartItemCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </>
              )}
              {user.role === "admin" && (
                <>
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                  <Link
                    href="/admin/courses"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    Manage Courses
                  </Link>
                </>
              )}
              <button
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
