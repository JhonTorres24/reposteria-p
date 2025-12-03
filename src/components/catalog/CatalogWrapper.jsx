import { CartProvider } from "../../contexts/CartContext.jsx";
import ProductCardWrapper from "./ProductCardWrapper.jsx";

export default function CatalogWrapper({ products }) {
  return (
    <CartProvider>
      <div>
        <h1 className="text-3xl font-bold mb-6">Catálogo</h1>

        <div className="grid-card">
          {products.length > 0 ? (
            products.map((p) => (
              <ProductCardWrapper key={p.id} product={p} />
            ))
          ) : (
            <p className="text-gray-500 text-lg">No hay productos disponibles.</p>
          )}
        </div>
      </div>
    </CartProvider>
  );
}
