"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { api } from "@/lib/api-client"
import { CheckCircle, Loader2, XCircle } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      setStatus("error")
      setMessage("No payment session found.")
      return
    }

    const verifyPayment = async () => {
      try {
        // Get current user
        const me = await api("/me")

        if (!me || !me._id) {
          setStatus("error")
          setMessage("Could not verify user. Please log in again.")
          return
        }

        // Verify the payment session with your backend
        // Your backend should verify with Stripe and create the enrollment
        const result = await api(`/payments/verify?session_id=${sessionId}`)

        if (result.success) {
          setStatus("success")
          setMessage("Payment successful! Your course has been added to your dashboard.")

          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        } else {
          setStatus("error")
          setMessage("Payment verification failed. Please contact support.")
        }
      } catch (err: any) {
        console.error("[v0] Payment verification error:", err)
        setStatus("error")
        setMessage(err.message || "Failed to verify payment. Please contact support.")
      }
    }

    verifyPayment()
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-card border rounded-xl p-8 shadow-lg text-center space-y-6">
          {status === "loading" && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
              <h1 className="text-2xl font-bold">Processing Payment...</h1>
              <p className="text-muted-foreground">
                Please wait while we verify your payment and set up your course access.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">Payment Successful!</h1>
              <p className="text-muted-foreground">{message}</p>
              <div className="pt-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Go to Dashboard
                </Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto">
                <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Payment Error</h1>
              <p className="text-muted-foreground">{message}</p>
              <div className="pt-4 space-y-3">
                <Link
                  href="/checkout"
                  className="block w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Try Again
                </Link>
                <Link
                  href="/courses"
                  className="block w-full px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  Browse Courses
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
