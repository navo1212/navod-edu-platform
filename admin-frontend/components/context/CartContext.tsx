'use client';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (course: any) => setCart((prev) => [...prev, course]);
  const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c._id !== id));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
