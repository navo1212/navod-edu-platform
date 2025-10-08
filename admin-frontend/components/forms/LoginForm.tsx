// // src/components/forms/LoginForm.tsx
// 'use client';
// import { useState } from 'react';
// import { api, setAccessToken } from '@/lib/api-client';

// export default function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string>();
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); setLoading(true); setError(undefined);
//     try {
//       const { accessToken, role } = await api<{ accessToken: string; role: string }>(
//         `/auth/login`,
//         { method: 'POST', body: JSON.stringify({ email, password }) }
//       );

//       // Store access token in cookie for middleware to detect
//       document.cookie = `access_token=${accessToken}; path=/; SameSite=Lax`;

//       setAccessToken(accessToken);
//       window.location.href = role === 'admin' ? '/admin' : '/dashboard';
//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-3 max-w-sm">
//       <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       <button className="btn w-full" disabled={loading}>
//         {loading ? 'Logging in…' : 'Login'}
//       </button>
//       <p className="text-sm text-center">
//         Don&apos;t have an account?{' '}
//         <a href="/register" className="text-blue-600 underline">
//           Register Now
//         </a>
//       </p>
//     </form>
//   );
// }

//after ui added

"use client"

import type React from "react"

import { useState } from "react"
import { login } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { AlertCircle, ArrowRight, Lock, Mail } from "lucide-react"

export default function EnhancedLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(undefined)

    try {
      const { role } = await login(email, password)
      window.location.href = role === "admin" ? "/admin" : "/dashboard"
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance">Welcome back</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">Sign in to continue to your account</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-xl border-border/60 backdrop-blur-sm bg-card/95">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </Label>
              <div className="relative group">
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                    focusedField === "email" ? "text-accent" : "text-muted-foreground"
                  }`}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="pl-11 h-12 text-base transition-all duration-200 border-input focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <a
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <Lock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                    focusedField === "password" ? "text-accent" : "text-muted-foreground"
                  }`}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="pl-11 h-12 text-base transition-all duration-200 border-input focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 animate-in fade-in slide-in-from-top-1 duration-300">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive leading-relaxed">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-medium bg-primary hover:bg-accent text-primary-foreground transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign in
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-foreground font-medium hover:text-accent transition-colors duration-200 underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-accent"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
