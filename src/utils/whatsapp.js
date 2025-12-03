// src/utils/whatsapp.js

export function enviarWhatsApp(pedido) {
  // Número de WhatsApp de la dueña con código de país Perú
  const telefonoDueña = "51940866498";

  // Mensaje que se enviará
  const mensaje = `Nuevo pedido por $${pedido.total}\n\nProductos:\n${pedido.productos.map(
    p => `• ${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}`
  ).join('\n')}\n\nCliente: ${pedido.user_email}`;

  // Abre WhatsApp Web o App con el mensaje listo
  const url = `https://wa.me/${telefonoDueña}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
