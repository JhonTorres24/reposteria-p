import React, { createContext, useContext, useEffect, useState } from "react";

// localStorage key
const STORAGE_KEY = "rr_cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Cargar del localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setItems(JSON.parse(raw));
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, qty = 1, variant = null) => {
    const pid = product.id;
    setItems(prev => {
      const copy = [...prev];
      const idx = copy.findIndex(it => it.productId === pid && it.variant === variant);
      if (idx > -1) {
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
      } else {
        copy.push({
          productId: pid,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: qty,
          variant,
        });
      }
      return copy;
    });
  };

  const updateQuantity = (productId, quantity, variant = null) => {
    setItems(prev => prev.map(it =>
      it.productId === productId && (variant ? it.variant === variant : true)
        ? { ...it, quantity: Math.max(1, quantity) }
        : it
    ));
  };

  const removeFromCart = (productId, variant = null) => {
    setItems(prev => prev.filter(it => !(it.productId === productId && (variant ? it.variant === variant : true))));
  };

  const clearCart = () => setItems([]);

  const getTotal = () => items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
