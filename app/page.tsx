'use client';

import useProducts from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";

const Home = () => {
  const { products, loading, error } = useProducts();
  const { dispatch } = useCart();

  if (error) {
    return (
      <EmptyState
        icon="⚠️"
        message={error}
      />
    );
  }

  return (
    <div>
      <h1 className="font-fredoka text-4xl font-bold text-center text-[#00b4d8] py-8 tracking-wide drop-shadow-sm">Products</h1>
      <ProductGrid
        products={products}
        loading={loading}
        onAddToCart={(product) => dispatch({ type: "ADD_ITEM", payload: product })}
      />
    </div>
  );
};

export default Home;
