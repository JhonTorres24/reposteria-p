// src/components/cart/CatalogReactWrapper.jsx
import React from 'react';

export default function CatalogReactWrapper({ products }) {
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(p => p.id === product.id);
    
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ 
        id: product.id, 
        name: product.nombre, 
        price: product.precio, 
        img: product.imagen, 
        qty: 1 
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Mostrar toast
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 px-5 py-3 rounded-lg text-white font-semibold shadow-lg bg-green-500 z-50';
    toast.textContent = `✓ ${product.nombre} agregado al carrito`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay productos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => {
        // IMAGEN SEGURA - SIN placeholder.png
        const productImg = product.imagen || `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="%23fef3c7"><rect width="24" height="24" fill="%23fef3c7"/><text x="12" y="14" font-family="Arial" font-size="8" text-anchor="middle" fill="%23f97316">${product.nombre.substring(0, 10)}</text></svg>`;
        
        return (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative">
              <img 
                src={productImg}
                alt={product.nombre}
                className="w-full h-56 object-cover"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.nombre}
              </h3>
              
              {product.descripcion && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.descripcion}
                </p>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-600">
                  ${product.precio}
                </span>
                
                <button
                  onClick={() => addToCart(product)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all hover:scale-105 active:scale-95"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
