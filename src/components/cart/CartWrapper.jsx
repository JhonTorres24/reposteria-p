import React from "react";
import { CartProvider } from "../../contexts/CartContext.jsx";

export default function CartWrapper({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
