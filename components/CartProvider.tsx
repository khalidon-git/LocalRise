"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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

  // Sync scroll lock on body when cart drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
