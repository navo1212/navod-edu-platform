// 'use client';
// import { createContext, useContext, useState } from 'react';

// type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
// };

// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
// };

// const CartContext = createContext<CartContextType | null>(null);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const addToCart = (item: CartItem) => setCart((prev) => [...prev, item]);
//   const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c._id !== id));

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error('useCart must be used inside CartProvider');
//   return ctx;
// };







'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type CartItem = { _id: string; title: string; price: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => setCart((prev) => [...prev, item]);
  const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c._id !== id));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
