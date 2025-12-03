// src/pages/api/update-order-status.js
import { supabaseAdmin } from "../../lib/supabaseAdmin.js"; // ✅ Ruta corregida: 2 niveles arriba

export async function POST({ request }) {
  try {
    const form = await request.formData();
    const order_id = form.get("order_id");
    const status = form.get("status");

    if (!order_id || !status) {
      return new Response("Datos incompletos", { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", order_id);

    if (error) {
      console.error("Error Supabase:", error);
      return new Response("Error actualizando estado", { status: 500 });
    }

    return new Response(null, {
      status: 303,
      headers: { Location: "/admin/pedidos" }
    });

  } catch (err) {
    console.error("Error general:", err);
    return new Response("Error en el servidor", { status: 500 });
  }
}