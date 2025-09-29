'use client';
import { useCart } from '@/components/context/CartContext';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function CheckoutPage() {
  const { cart } = useCart();

  const handleCheckout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'current-user-id', // replace with logged-in user
        courseId: cart[0]._id,
        price: cart[0].price,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Checkout</h1>
      {cart.map((c: { _id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
        <div key={c._id} className="border p-2 rounded">
          <p>{c.title}</p>
          <p>${c.price}</p>
        </div>
      ))}
      <button onClick={handleCheckout} className="btn">Pay with Stripe</button>
    </div>
  );
}
