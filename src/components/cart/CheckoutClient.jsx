import { useCart } from "../../contexts/CartContext";
import { supabase } from "../../lib/supabase";

export default function CheckoutClient() {
  const { cart, clearCart } = useCart();

  async function finishOrder() {
    if (cart.items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    // Obtener usuario autenticado
    const { data: { user } } = await supabase.auth.getUser();

    // Adjuntar user_id al carrito antes de enviarlo
    const fullCart = {
      ...cart,
      user_id: user?.id ?? null
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullCart),
    });

    const data = await res.json();

    if (res.ok) {
      clearCart();
      alert("Pedido creado correctamente: " + data.orderId);
      window.location.href = "/historial";
    } else {
      alert("Error: " + data.error);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

      {cart.items.map(item => (
        <div key={item.id} className="mb-2">
          {item.name} — {item.quantity} × S/{item.price}
        </div>
      ))}

      <p className="font-bold mt-4">Total: S/{cart.total}</p>

      <button
        onClick={finishOrder}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Confirmar pedido
      </button>
    </div>
  );
}
