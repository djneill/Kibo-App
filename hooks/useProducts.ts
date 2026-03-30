'use client';

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { API_BASE_URL } from "@/data/constants";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) {
          throw new Error(`Failed to fetch products (${res.status})`);
        }
        const data: Product[] = await res.json();
        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
};

export default useProducts;
