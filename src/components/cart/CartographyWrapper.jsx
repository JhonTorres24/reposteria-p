import React from "react";
import { CartProvider } from "../../contexts/CartContext.jsx";

export default function CartographyWrapper({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
