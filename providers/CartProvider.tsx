"use client";

import React, { createContext, useContext, useState } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";

export interface CartItem {
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  addToCart: (title: string, price: number) => void;
  updateQuantity: (title: string, delta: number) => void;
  toggleCart: (open: boolean) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Shared, reference-counted so it can't fight the mobile menu's lock.
  useScrollLock(isOpen);

  const addToCart = (title: string, price: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.title === title);
      if (existingItem) {
        return prevCart.map((item) =>
          item.title === title ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { title, price, quantity: 1 }];
    });
    setIsOpen(true); // Automatically slide open cart drawer
  };

  const updateQuantity = (title: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.title === title ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleCart = (open: boolean) => {
    setIsOpen(open);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        addToCart,
        updateQuantity,
        toggleCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
