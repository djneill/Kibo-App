import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import SkeletonCard from "@/components/ui/SkeletonCard";
import styles from "./ProductListing.module.css";

const SKELETON_COUNT = 8;

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, loading, onAddToCart }: ProductGridProps) => (
  <div className={styles.grid}>
    {loading
      ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))
      : products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
  </div>
);

export default ProductGrid;
