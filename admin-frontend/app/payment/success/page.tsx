// export default function SuccessPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-xl text-green-600">✅ Payment Successful!</h1>
//       <p>Your course has been added to your dashboard.</p>
//     </div>
//   );
// }


//after ui added



"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Loader2, XCircle } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api-client"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Verifying your payment...")

  useEffect(() => {
    if (!sessionId) {
      setStatus("error")
      setMessage("No payment session found")
      return
    }

    const verifyPayment = async () => {
      try {
        console.log("[v0] Verifying payment with session:", sessionId)

        const result = await api("/payments/verify", {
          method: "POST",
          body: JSON.stringify({ sessionId }),
        })

        console.log("[v0] Verification result:", result)

        if (result.success) {
          setStatus("success")
          setMessage("Payment successful! Your enrollment has been confirmed.")

          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        } else {
          setStatus("error")
          setMessage(result.message || "Payment verification failed")
        }
      } catch (error) {
        console.error("[v0] Verification error:", error)
        setStatus("error")
        setMessage("Failed to verify payment. Please contact support.")
      }
    }

    verifyPayment()
  }, [sessionId, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-md w-full bg-card border rounded-xl p-8 shadow-lg text-center space-y-6">
        {status === "loading" && (
          <>
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
              <p className="text-muted-foreground">{message}</p>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto animate-in zoom-in-50">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 text-green-600">Payment Successful!</h2>
              <p className="text-muted-foreground">{message}</p>
            </div>
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
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 text-destructive">Payment Failed</h2>
              <p className="text-muted-foreground">{message}</p>
            </div>
            <div className="pt-4 space-y-3">
              <Link
                href="/checkout"
                className="block w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Try Again
              </Link>
              <Link
                href="/dashboard"
                className="block w-full px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors font-medium"
              >
                Back to Dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
