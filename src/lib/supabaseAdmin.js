import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Para operaciones que requieren admin (como crear pedidos)
export const supabaseAdmin = createClient(
  supabaseUrl, 
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY, // Clave secreta del servicio
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
