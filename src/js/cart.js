// @ts-nocheck
// -----------------------------
// CARRITO BÁSICO CON localStorage
// -----------------------------
export function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
  let cart = loadCart();

  const found = cart.find((item) => item.id === product.id);

  if (found) {
    found.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.nombre,
      price: product.precio,
      quantity: 1,
      image: product.imagen
    });
  }

  saveCart(cart);
  alert("Producto agregado al carrito");
}

