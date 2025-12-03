import React from "react";
import { useCart } from "../../contexts/CartContext.jsx";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button
      className="bg-orange-500 text-white px-3 py-1 rounded-lg"
      onClick={() =>
        addToCart({
          id: product.id,
          name: product.nombre,   // ← tu BD usa "nombre", lo mapeamos a "name"
          price: product.precio,  // ← tu BD usa "precio"
          image: product.imagen,  // ← tu BD usa "imagen"
        })
      }
    >
      Agregar
    </button>
  );
}
