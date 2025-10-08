// 'use client';
// import { useCart } from '@/context/CartContext';
// import { useRouter } from 'next/navigation';

// export default function CheckoutPage() {
//   const { cart } = useCart();
//   const router = useRouter();

//   const handleCheckout = async () => {
//     if (cart.length === 0) return;

//     // TODO: get logged-in userId from auth context or API
//     const userId = 'current-user-id';

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/checkout`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         userId :'current-user-id',
//         courseId: cart[0]._id,
//         price: cart[0].price,
//       }),
//     });

//     const data = await res.json();

//     if (data.url) {
//       window.location.href = data.url; // ✅ Redirect to Stripe Checkout
//     } else {
//       alert('Payment session failed.');
//     }
//   };

//   return (
//     <div className="space-y-4 p-6">
//       <h1 className="text-xl font-bold">Checkout</h1>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul className="space-y-2">
//           {cart.map((c) => (
//             <li key={c._id} className="border p-2 rounded flex justify-between">
//               <span>{c.title} - ${c.price}</span>
//             </li>
//           ))}
//         </ul>
//       )}

//       {cart.length > 0 && (
//         <button
//           onClick={handleCheckout}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Pay with Stripe
//         </button>
//       )}
//     </div>
//   );
// }





// // // // src/app/checkout/page.tsx
// 'use client';
// import { useCart } from '@/context/CartContext';
// import { useRouter } from 'next/navigation';

// export default function CheckoutPage() {
//   const { cart, removeFromCart } = useCart();
//   const router = useRouter();

//   const handleCheckout = async () => {
//     if (cart.length === 0) return;

//     // ⚠️ TODO: Replace with logged-in user id from /me
//     const userId = 'current-user-id';

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/checkout`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         userId,
//         courseId: cart[0]._id,
//         price: cart[0].price,
//       }),
//     });

//     const data = await res.json();

//     if (data.url) {
//       window.location.href = data.url; // ✅ Redirect to Stripe Checkout
//     } else {
//       alert('Payment session failed.');
//     }
//   };



//   return (
//     <div className="space-y-4 p-6">
//       <h1 className="text-xl font-bold">Checkout</h1>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul className="space-y-2">
//           {cart.map((c) => (
//             <li
//               key={c._id}
//               className="border p-2 rounded flex justify-between items-center"
//             >
//               <span>{c.title} - ${c.price}</span>
//               <button
//                 onClick={() => removeFromCart(c._id)}
//                 className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {cart.length > 0 && (
//         <button
//           onClick={handleCheckout}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Pay with Stripe
//         </button>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useCart } from '@/context/CartContext';
// import { useRouter } from 'next/navigation';
// import { api } from '@/lib/api-client';
// import { useState } from 'react';

// export default function CheckoutPage() {
//   const { cart, removeFromCart } = useCart();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleCheckout = async () => {
//     if (cart.length === 0) return;

//     setLoading(true);

//     try {
//       // ✅ Always go through api (it handles refresh + token)
//       const me = await api('/me');

//       if (!me || !me._id) {
//         alert("Could not get user. Please log in again.");
//         router.push('/login');
//         return;
//       }

//       // ✅ Create checkout session
//       const checkout = await api('/payments/checkout', {
//         method: 'POST',
//         body: JSON.stringify({
//           userId: me._id,
//           courseId: cart[0]._id,
//           price: cart[0].price,
//         }),
//       });

//       if (checkout.url) {
//         window.location.href = checkout.url;
//       } else {
//         alert('Payment session failed.');
//       }
//     } catch (err: any) {
//       alert(err.message || 'Checkout failed');
//       router.push('/login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-4 p-6">
//       <h1 className="text-xl font-bold">Checkout</h1>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul className="space-y-2">
//           {cart.map((c) => (
//             <li key={c._id} className="border p-2 rounded flex justify-between items-center">
//               <span>{c.title} - ${c.price}</span>
//               <button
//                 onClick={() => removeFromCart(c._id)}
//                 className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {cart.length > 0 && (
//         <button
//           onClick={handleCheckout}
//           disabled={loading}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? 'Processing...' : 'Pay with Stripe'}
//         </button>
//       )}
//     </div>
//   );
// }


//after ui added
"use client"

import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api-client"
import { useState } from "react"
import { ShoppingCart, Trash2, CreditCard, Loader2, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const { cart, removeFromCart, getTotalPrice } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (cart.length === 0) return

    setLoading(true)

    try {
      console.log("[v0] Starting checkout process...")

      let me
      try {
        me = await api("/me")
        console.log("[v0] User data received:", me)
      } catch (meError: any) {
        console.error("[v0] Error fetching user:", meError)
        console.error("[v0] Error details:", {
          message: meError.message,
          status: meError.status,
          response: meError.response,
        })
        alert(`Could not get user: ${meError.message}. Please log in again.`)
        router.push("/login")
        return
      }

      if (!me || !me._id) {
        console.error("[v0] User data invalid:", me)
        alert("Could not get user. Please log in again.")
        router.push("/login")
        return
      }

      console.log("[v0] Creating checkout session for user:", me._id)

      const checkout = await api("/payments/checkout", {
        method: "POST",
        body: JSON.stringify({
          userId: me._id,
          courseId: cart[0]._id,
          price: cart[0].price,
          successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/checkout`,
        }),
      })

      console.log("[v0] Checkout response:", checkout)

      if (checkout.url) {
        window.location.href = checkout.url
      } else {
        alert("Payment session failed.")
      }
    } catch (err: any) {
      console.error("[v0] Checkout error:", err)
      alert(err.message || "Checkout failed")
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-primary" />
            Checkout
          </h1>
          <p className="text-muted-foreground">Review your cart and complete your purchase.</p>
        </div>

        {cart.length === 0 ? (
          /* Enhanced empty state */
          <div className="text-center py-16 bg-muted/30 rounded-xl border border-dashed">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some courses to get started with your learning journey.</p>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold">Cart Items</h2>
              <div className="space-y-3">
                {cart.map((c) => (
                  <div
                    key={c._id}
                    className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg">{c.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                        <div className="flex items-baseline gap-2 pt-2">
                          <span className="text-xl font-bold text-primary">${c.price}</span>
                          <span className="text-sm text-muted-foreground">USD</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(c._id)}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-6 space-y-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <div className="space-y-3 py-4 border-y">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold">Total</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${getTotalPrice().toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">USD</div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Pay with Stripe
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground">Secure payment powered by Stripe</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
