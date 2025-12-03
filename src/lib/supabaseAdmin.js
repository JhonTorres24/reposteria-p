// src/lib/supabaseAdmin.js
import { createClient } from "@supabase/supabase-js";

// Variables de entorno PRIVADAS (solo disponibles en el servidor)
const supabaseUrl = import.meta.env.SUPABASE_URL;
const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = createClient(supabaseUrl, serviceKey);