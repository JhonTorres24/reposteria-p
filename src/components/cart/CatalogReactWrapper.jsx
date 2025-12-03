// src/components/cart/CatalogReactWrapper.jsx
import React from "react";

export default function CatalogReactWrapper({ products }) {
  if (!products || products.length === 0) {
    return <p>No hay productos disponibles</p>;
  }

  function showToast(message, color = "green") {
    const toast = document.createElement("div");
    toast.className = `toast bg-${color}-500 text-white px-4 py-2 rounded shadow fixed bottom-6 right-6 animate-fade-in-up z-50`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  function handleAddToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.find((i) => i.id === product.id);

    if (exists) {
      exists.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.nombre,
        price: product.precio,
        qty: 1,
        img: product.imagen || "/assets/placeholder.png", // <-- AQUÍ CORREGIDO
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(`${product.nombre} agregado al carrito 🛒`);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="product-card bg-white rounded-2xl shadow p-4 flex flex-col justify-between animate-fadeInUp"
        >
          <img
            src={p.imagen || "/assets/placeholder.png"} // <-- AQUÍ CORREGIDO
            alt={p.nombre}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />

          <h3 className="text-xl font-semibold mb-2">{p.nombre}</h3>
          <p className="text-gray-600 mb-2">{p.descripcion}</p>
          <strong className="text-orange-600 mb-4">S/ {p.precio}</strong>

          <button
            onClick={() => handleAddToCart(p)}
            className="add-to-cart-btn bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            🛒 Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}
