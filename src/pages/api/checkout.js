// src/pages/api/checkout.js - VERSIÓN CORREGIDA
import { supabase } from "../../lib/supabase.js";

export async function POST({ request, cookies }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    // 1. VERIFICAR SESIÓN CON COOKIES
    const accessToken = cookies.get('sb-access-token');
    const refreshToken = cookies.get('sb-refresh-token');
    
    if (!accessToken || !refreshToken) {
      return new Response(
        JSON.stringify({ error: 'No autenticado. Inicia sesión primero.' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // 2. OBTENER USUARIO DESDE SUPABASE
    const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken.value);
    
    if (userError || !user) {
      console.log('Error de autenticación:', userError);
      return new Response(
        JSON.stringify({ error: 'Sesión inválida. Vuelve a iniciar sesión.' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('📦 Usuario autenticado:', user.email);

    // 3. OBTENER DATOS DEL CARRITO
    const body = await request.json();
    const { cart, total } = body;
    
    if (!cart || cart.length === 0) {
      return new Response(
        JSON.stringify({ error: "Carrito vacío" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // 4. VERIFICAR QUE EL TOTAL COINCIDA
    const calculatedTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    if (Math.abs(calculatedTotal - total) > 0.01) {
      console.warn('⚠️ Total no coincide:', calculatedTotal, 'vs', total);
    }

    // 5. INSERTAR PEDIDO EN LA TABLA CORRECTA
    console.log('💾 Insertando en pedidos...');
    
    const { data: pedido, error: pedidoError } = await supabase
      .from('pedidos')
      .insert({
        user_id: user.id,
        user_email: user.email,
        total: total,
        items: cart,
        status: 'pendiente',
        created_at: new Date().toISOString()
      })
      .select('id, created_at')
      .single();

    if (pedidoError) {
      console.error('❌ Error insertando pedido:', pedidoError);
      
      // Intentar con 'orders' si 'pedidos' falla
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: total,
          items: cart,
          status: 'pending',
          created_at: new Date().toISOString()
        })
        .select('id, created_at')
        .single();

      if (orderError) {
        return new Response(
          JSON.stringify({ 
            error: 'No se pudo guardar el pedido',
            debug: pedidoError.message
          }),
          { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      console.log('✅ Pedido guardado en "orders":', orderData.id);
      
      clearTimeout(timeoutId);
      return new Response(
        JSON.stringify({ 
          success: true, 
          pedido_id: orderData.id,
          total: total
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('✅ Pedido guardado en "pedidos":', pedido.id);

    // 6. RESPONDER CON ÉXITO
    clearTimeout(timeoutId);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        pedido_id: pedido.id,
        total: total
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('🔥 ERROR CRÍTICO:', error);
    
    clearTimeout(timeoutId);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error interno del servidor',
        message: error.message
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
