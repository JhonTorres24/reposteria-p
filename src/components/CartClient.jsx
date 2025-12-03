import React from "react";
import { CartProvider } from "../../contexts/CartContext.jsx";
import CartPage from "./CartPage.jsx";

export default function CartClient() {
  return (
    <CartProvider>
      <CartPage />
    </CartProvider>
  );
}
