import React from "react";
import { useCart } from "../../contexts/CartContext.jsx";

export default function CartPage({ onCompra }) {
  const { items, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();

  if (items.length === 0) {
    return <p className="p-4 text-center text-gray-500">Tu carrito está vacío.</p>;
  }

  const handleCompra = () => {
    // Aquí puedes enviar a backend o WhatsApp
    alert("Compra realizada!");
    clearCart();
    onCompra();
  };

  return (
    <aside className="bg-white p-4 rounded-2xl shadow max-w-md mx-auto space-y-4">
      <ul className="space-y-3">
        {items.map(item => (
          <li key={item.productId + (item.variant ?? "")} className="flex items-center justify-between border rounded p-3">
            <div>
              <div className="font-medium">{item.name}</div>
              {item.variant && <div className="text-sm text-gray-500">{item.variant}</div>}
              <div className="text-sm text-gray-500">S/ {item.price} · {item.quantity}u</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variant)} className="px-2 py-1 rounded bg-gray-100">-</button>
              <button onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant)} className="px-2 py-1 rounded bg-gray-100">+</button>
              <button onClick={() => removeFromCart(item.productId, item.variant)} className="px-2 py-1 text-red-500">✕</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>S/ {getTotal()}</span>
      </div>

      <button
        onClick={handleCompra}
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
      >
        🛒 Realizar compra
      </button>

      <button
        onClick={clearCart}
        className="mt-2 w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
      >
        Vaciar carrito
      </button>
    </aside>
  );
}
