import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";

export async function POST({ request, cookies }) {
  const form = await request.formData();
  const orderId = form.get("order_id");

  const { data: items } = await supabaseAdmin
    .from("order_items")
    .select("product_id, quantity")
    .eq("order_id", orderId);

  // Guardar en cookie del carrito (simple y directo)
  cookies.set("rr_cart", JSON.stringify(items), {
    path: "/",
  });

  return new Response(null, {
    status: 302,
    headers: { Location: "/carrito" },
  });
}
