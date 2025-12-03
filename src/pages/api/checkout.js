import supabase from "../../lib/supabase.js";
import { supabaseAdmin } from "../../lib/supabaseAdmin.js";

export async function POST({ request }) {
  try {
    const cart = await request.json();

    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
      return new Response(JSON.stringify({ error: "Carrito vacío" }), {
        status: 400,
      });
    }

    const total =
      cart.total ??
      cart.items.reduce((s, it) => s + it.price * it.quantity, 0);

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert([
        {
          user_id: cart.user_id ?? null,
          total,
        },
      ])
      .select()
      .single();

    if (orderError) {
      console.error("❌ Error insertando order:", orderError);
      return new Response(JSON.stringify({ error: orderError.message }), {
        status: 500,
      });
    }

    const items = cart.items.map((i) => ({
      order_id: order.id,
      product_id: i.id,
      quantity: i.quantity,
      price: i.price,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(items);

    if (itemsError) {
      console.error("❌ Error insertando items:", itemsError);
      return new Response(JSON.stringify({ error: itemsError.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({
        ok: true,
        orderId: order.id,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("🔥 Error interno en checkout:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}
