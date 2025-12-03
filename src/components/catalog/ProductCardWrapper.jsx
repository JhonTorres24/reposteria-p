import ProductCard from "../ProductCard.astro";

export default function ProductCardWrapper({ product }) {
  return <ProductCard product={product} />;
}
