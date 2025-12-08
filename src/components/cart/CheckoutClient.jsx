// src/components/cart/CheckoutClient.jsx
import { useCart } from "../../contexts/CartContext";
import { supabase } from "../../lib/supabase";

export default function CheckoutClient() {
  const { items, clearCart, getTotal } = useCart();

  async function finishOrder() {
    if (!items || items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    try {
      // Obtener usuario autenticado
      const { data: { user } } = await supabase.auth.getUser();

      // Preparar carrito completo
      const fullCart = {
        user_id: user?.id ?? null,
        items: items.map(i => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          variant: i.variant || null,
        })),
        total: getTotal(),
      };

      // Llamar al endpoint
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullCart),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart(); // Limpiar carrito
        alert("Pedido realizado correctamente. ID: " + data.pedidoId);
        window.location.href = "/historial"; // Redirigir a historial
      } else {
        alert("Error al crear pedido: " + data.error);
      }
    } catch (err) {
      console.error("🔥 Error en finishOrder:", err);
      alert("Ocurrió un error inesperado");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

      {items.map(item => (
        <div key={item.productId + (item.variant || "")} className="mb-2">
          {item.name} — {item.quantity} × S/ {item.price}
        </div>
      ))}

      <p className="font-bold mt-4">Total: S/ {getTotal()}</p>

      <button
        onClick={finishOrder}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Confirmar pedido
      </button>
    </div>
  );
}
// src/components/cart/CheckoutClient.jsx
import { useCart } from "../../contexts/CartContext";
import { supabase } from "../../lib/supabase";

export default function CheckoutClient() {
  const { items, clearCart, getTotal } = useCart();

  async function finishOrder() {
    if (!items || items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    try {
      // Obtener usuario autenticado
      const { data: { user } } = await supabase.auth.getUser();

      // Preparar carrito completo
      const fullCart = {
        user_id: user?.id ?? null,
        items: items.map(i => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          variant: i.variant || null,
        })),
        total: getTotal(),
      };

      // Llamar al endpoint
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullCart),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart(); // Limpiar carrito
        alert("Pedido realizado correctamente. ID: " + data.pedidoId);
        window.location.href = "/historial"; // Redirigir a historial
      } else {
        alert("Error al crear pedido: " + data.error);
      }
    } catch (err) {
      console.error("🔥 Error en finishOrder:", err);
      alert("Ocurrió un error inesperado");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

      {items.map(item => (
        <div key={item.productId + (item.variant || "")} className="mb-2">
          {item.name} — {item.quantity} × S/ {item.price}
        </div>
      ))}

      <p className="font-bold mt-4">Total: S/ {getTotal()}</p>

      <button
        onClick={finishOrder}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Confirmar pedido
      </button>
    </div>
  );
}
