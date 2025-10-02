'use client';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    // TODO: get logged-in userId from auth context or API
    const userId = 'current-user-id';

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId :'current-user-id',
        courseId: cart[0]._id,
        price: cart[0].price,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // ✅ Redirect to Stripe Checkout
    } else {
      alert('Payment session failed.');
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
            <li key={c._id} className="border p-2 rounded flex justify-between">
              <span>{c.title} - ${c.price}</span>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <button
          onClick={handleCheckout}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Pay with Stripe
        </button>
      )}
    </div>
  );
}
