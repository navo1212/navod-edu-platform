// // src/components/forms/RegisterForm.tsx
// 'use client';
// import { useState } from 'react';
// import { api } from '@/lib/api-client';

// export default function RegisterForm() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [ok, setOk] = useState(false);
//   const [error, setError] = useState<string>();

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); 
//     setError(undefined);
//     try {
//       await api(`/auth/register`, {
//         method: 'POST',
//         body: JSON.stringify({ name, email, password }),
//       });
//       setOk(true);
//     } catch (err: any) {
//       setError(err.message || 'Registration failed');
//     }
//   };

//   if (ok) {
//     return (
//       <div className="space-y-4 text-center">
//         <p className="text-green-600 font-medium">
//           ✅ Account created successfully!
//         </p>
//         <a href="/login" className="btn inline-block">
//           Go to Login
//         </a>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={onSubmit} className="space-y-3 max-w-sm">
//       <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//       <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       <button className="btn w-full">Register</button>

//       {/* Always-visible Login button */}
//       <p className="text-sm text-center">
//         Already have an account?{' '}
//         <a href="/login" className="text-blue-600 underline">
//           Go to Login
//         </a>
//       </p>
//     </form>
//   );
// }
 //after ui added

"use client"

import type React from "react"

import { useState } from "react"
import { api } from "@/lib/api-client"
import { User, Mail, Lock, CheckCircle2, ArrowRight } from "lucide-react"

export default function EnhancedRegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setIsLoading(true)

    try {
      await api(`/auth/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      })
      setOk(true)
    } catch (err: any) {
      setError(err.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  if (ok) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="w-full max-w-md">
          <div className="bg-card/95 backdrop-blur-sm border border-border/60 rounded-2xl shadow-xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[oklch(0.55_0.12_150)]/10 animate-in zoom-in duration-500 delay-150">
                <CheckCircle2 className="w-8 h-8 text-[oklch(0.55_0.12_150)]" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">Account Created!</h2>
                <p className="text-muted-foreground text-balance">
                  Your account has been successfully created. You can now sign in to continue.
                </p>
              </div>
            </div>

            <a
              href="/login"
              className="group flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-xl px-6 py-3 font-medium transition-all hover:bg-accent hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Go to Login
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance">Create Account</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">Join us today and start your journey</p>
        </div>

        <div className="bg-card/95 backdrop-blur-sm border border-border/60 rounded-2xl shadow-xl p-8 space-y-6">
          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <div className="relative group">
                <User
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                    focusedField === "name" ? "text-accent" : "text-muted-foreground"
                  }`}
                />
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground/60 transition-all focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent hover:border-muted-foreground/40"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                    focusedField === "email" ? "text-accent" : "text-muted-foreground"
                  }`}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground/60 transition-all focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent hover:border-muted-foreground/40"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                    focusedField === "password" ? "text-accent" : "text-muted-foreground"
                  }`}
                />
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground/60 transition-all focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent hover:border-muted-foreground/40"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 animate-in fade-in slide-in-from-top-1 duration-300">
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground rounded-xl px-6 py-3 h-12 font-medium transition-all hover:bg-accent hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center pt-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-foreground font-medium hover:text-accent transition-colors duration-200 underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-accent"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
