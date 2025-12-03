import React, { useState } from "react";
import { CartProvider } from "../../contexts/CartContext.jsx";
import CartPage from "./CartPage.jsx";
import { useCart } from "../../contexts/CartContext.jsx";

export default function CartClient() {
  const [compraRealizada, setCompraRealizada] = useState(false);

  return (
    <CartProvider>
      {compraRealizada ? (
        <div className="text-center p-8 bg-green-100 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-green-700">✅ Compra realizada</h2>
          <p>Gracias por tu pedido, te contactaremos por WhatsApp para confirmar.</p>
          <button
            onClick={() => setCompraRealizada(false)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Volver al carrito
          </button>
        </div>
      ) : (
        <CartPage onCompra={() => setCompraRealizada(true)} />
      )}
    </CartProvider>
  );
}
