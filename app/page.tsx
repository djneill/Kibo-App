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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Products</h1>
      <ProductGrid
        products={products}
        loading={loading}
        onAddToCart={(product) => dispatch({ type: "ADD_ITEM", payload: product })}
      />
    </div>
  );
};

export default Home;
