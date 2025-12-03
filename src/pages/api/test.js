import supabase from "../../lib/supabase.js";

export async function GET() {
  const { data, error } = await supabase
    .from("Productos")  // ← reemplaza con el nombre REAL de tu tabla
    .select("*");

  return new Response(JSON.stringify({ data, error }), {
    headers: { "Content-Type": "application/json" }
  });
}
