import React from "react";
import ProductCard from "./ProductCard.jsx";

const productos = [
  { id: 1, name: "Torta de Chocolate", price: 45, image: "/cachito.png" },
  { id: 2, name: "Cheesecake Fresa", price: 55, image: "/tortahelada.jpg" },
  { id: 3, name: "Cupcakes (Pack 6)", price: 18, image: "/bob-esponja.png" },
];

export default function Catalog() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {productos.map(p => (
        <ProductCard key={p.id} producto={p} />
      ))}
    </div>
  );
}
