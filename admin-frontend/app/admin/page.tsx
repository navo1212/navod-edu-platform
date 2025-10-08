// // src/app/admin/page.tsx
// 'use client';
// import { useEffect, useState } from 'react';
// import { api } from '@/lib/api-client';

// export default function AdminPage() {
//   const [me, setMe] = useState<any>();
//   const [error, setError] = useState<string>();

//   useEffect(() => {
//     api('/me').then(setMe).catch((e) => setError(String(e)));
//   }, []);

//   return (
//     <div className="space-y-4">
//       <h1 className="text-xl font-semibold">Admin Dashboard</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       {me && <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(me, null, 2)}</pre>}
//     </div>
//   );
// }


//after ui added

"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api-client"
import { Users, BookOpen, DollarSign, TrendingUp, Settings, FileText, Shield, Loader2 } from "lucide-react"

interface AdminStats {
  totalUsers?: number
  totalCourses?: number
  totalRevenue?: number
  activeEnrollments?: number
}

export default function AdminPage() {
  const [me, setMe] = useState<any>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api("/me")
      .then(setMe)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center mx-auto">
            <Shield className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Access Error</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const stats: AdminStats = {
    totalUsers: 1234,
    totalCourses: 45,
    totalRevenue: 89750,
    activeEnrollments: 3456,
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers?.toLocaleString() || "0",
      icon: Users,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Total Courses",
      value: stats.totalCourses?.toString() || "0",
      icon: BookOpen,
      trend: "+3 new",
      trendUp: true,
    },
    {
      title: "Revenue",
      value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      trend: "+18.2%",
      trendUp: true,
    },
    {
      title: "Enrollments",
      value: stats.activeEnrollments?.toLocaleString() || "0",
      icon: TrendingUp,
      trend: "+24.3%",
      trendUp: true,
    },
  ]

  const quickActions = [
    { title: "Manage Users", icon: Users, href: "/admin/users" },
    { title: "Manage Courses", icon: BookOpen, href: "/admin/courses" },
    { title: "View Reports", icon: FileText, href: "/admin/reports" },
    { title: "Settings", icon: Settings, href: "/admin/settings" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground text-balance">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">Welcome back, {me?.name || me?.email || "Administrator"}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <span className={`text-sm font-medium ${stat.trendUp ? "text-green-600" : "text-red-600"}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center p-6 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
              >
                <action.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
                <span className="text-sm font-medium text-foreground">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {me && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Admin Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="text-base font-medium text-foreground">{me.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="text-base font-medium text-foreground">{me.email || "N/A"}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Role</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {me.role || "admin"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">User ID</p>
                  <p className="text-base font-mono text-foreground">{me.id || "N/A"}</p>
                </div>
              </div>
            </div>

            <details className="mt-6">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                View Raw Data
              </summary>
              <pre className="mt-3 bg-muted/50 border border-border rounded-lg p-4 text-xs overflow-x-auto">
                {JSON.stringify(me, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}
