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







// 'use client';
// import { createContext, useContext, useEffect, useState } from 'react';

// type CartItem = { _id: string; title: string; price: number };

// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
// };

// const CartContext = createContext<CartContextType | null>(null);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // Load from localStorage on first render
//   useEffect(() => {
//     const saved = localStorage.getItem('cart');
//     if (saved) setCart(JSON.parse(saved));
//   }, []);

//   // Save to localStorage whenever cart changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

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


//after ui added

"use client"

import type React from "react"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"

export type CartItem = {
  description: ReactNode
  _id: string
  title: string
  price: number
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (id: string) => number
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart")
      if (saved) {
        const parsed = JSON.parse(saved)
        setCart(parsed)
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save to localStorage whenever cart changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart))
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error)
      }
    }
  }, [cart, isLoaded])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existingItem = prev.find((c) => c._id === item._id)
      if (existingItem) {
        // Increment quantity if item already exists
        return prev.map((c) =>
          c._id === item._id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      }
      // Add new item with quantity 1
      return [
        ...prev,
        {
          _id: item._id,
          title: item.title,
          price: item.price,
          description: item.description,
          quantity: 1,
        },
      ]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c._id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) => prev.map((c) => (c._id === id ? { ...c, quantity } : c)))
  }

  const clearCart = () => {
    setCart([])
  }

  const getItemQuantity = (id: string) => {
    const item = cart.find((c) => c._id === id)
    return item?.quantity || 0
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
