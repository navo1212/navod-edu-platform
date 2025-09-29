'use client';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cart } = useCart();

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'current-user-id', // TODO: replace with logged-in user ID
        courseId: cart[0]._id,
        price: cart[0].price,
      }),
    });

    const data = await res.json();
    window.location.href = data.url; // redirect to Stripe Checkout
  };

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-xl font-bold">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((c) => (
          <div key={c._id} className="border p-2 rounded">
            <p>{c.title}</p>
            <p>${c.price}</p>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <button onClick={handleCheckout} className="btn">Pay with Stripe</button>
      )}
    </div>
  );
}
