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

'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setLoading(true);

    try {
      // ✅ Always go through api (it handles refresh + token)
      const me = await api('/me');

      if (!me || !me._id) {
        alert("Could not get user. Please log in again.");
        router.push('/login');
        return;
      }

      // ✅ Create checkout session
      const checkout = await api('/payments/checkout', {
        method: 'POST',
        body: JSON.stringify({
          userId: me._id,
          courseId: cart[0]._id,
          price: cart[0].price,
        }),
      });

      if (checkout.url) {
        window.location.href = checkout.url;
      } else {
        alert('Payment session failed.');
      }
    } catch (err: any) {
      alert(err.message || 'Checkout failed');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-xl font-bold">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((c) => (
            <li key={c._id} className="border p-2 rounded flex justify-between items-center">
              <span>{c.title} - ${c.price}</span>
              <button
                onClick={() => removeFromCart(c._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay with Stripe'}
        </button>
      )}
    </div>
  );
}
