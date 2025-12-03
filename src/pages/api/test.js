// src/pages/api/test.js
import { supabase } from "../../lib/supabase.js"; // ✅ Importación NOMBRADA

export async function GET() {
  const { data, error } = await supabase
    .from("productos") // ← Asegúrate de que el nombre de la tabla sea exacto (Supabase es sensible a mayúsculas)
    .select("*");

  return new Response(JSON.stringify({ data, error }), {
    headers: { "Content-Type": "application/json" }
  });
}