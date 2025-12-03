// src/components/cart/CartItem.jsx
import React from "react";
import { useCart } from "./CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 items-center p-3 border-b">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        {item.variant && <div className="text-sm text-gray-500">Var: {item.variant}</div>}
        <div className="text-sm">S/ {Number(item.price).toFixed(2)}</div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.productId, Number(e.target.value), item.variant)}
          className="w-16 p-1 border rounded"
        />
        <div className="font-semibold">S/ {(item.price * item.quantity).toFixed(2)}</div>
        <button onClick={() => removeFromCart(item.productId, item.variant)} className="px-2 py-1 bg-red-500 text-white rounded">
          Eliminar
        </button>
      </div>
    </div>
  );
}
