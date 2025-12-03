import { useCart } from "../../contexts/CartContext.jsx";

export default function ProductCard({ producto }) {
  const { addToCart } = useCart();

  const normalized = {
    id: producto.id,
    name: producto.name,
    price: producto.price,
    image: producto.image,
  };

  return (
    <div className="product-card bg-white shadow-xl rounded-xl p-4 hover:shadow-2xl cursor-pointer transition-transform duration-300">
      <img 
        src={producto.image} 
        alt={producto.name} 
        className="w-full h-48 object-cover rounded-lg mb-3"
      />

      <h2 className="text-xl font-semibold mb-1">{producto.name}</h2>
      <p className="text-lg font-bold mb-3 text-orange-600">S/ {producto.price}</p>

      <button 
        onClick={() => addToCart(normalized)}
        className="add-to-cart-btn w-full bg-green-500 text-white py-2 rounded-lg font-semibold shadow hover:bg-green-600 hover:scale-105 transition-transform"
      >
        🛒 Agregar al carrito
      </button>
    </div>
  );
}
