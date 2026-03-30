'use client';

import Image from "next/image";
import { Product } from "@/types";
import { CURRENCY_SYMBOL } from "@/data/constants";
import Button from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { title, price, image, rating, category } = product;

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow bg-white">
      <div className="relative h-56 w-full bg-gray-50 p-4">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4"
        />
      </div>

      <div className="flex flex-col flex-1 gap-2 p-4">
        <span className="text-xs text-gray-400 uppercase tracking-wide">{category}</span>
        <h2 className="text-sm font-medium text-gray-800 line-clamp-2 flex-1">{title}</h2>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span className="text-yellow-400">★</span>
          <span>{rating.rate}</span>
          <span>({rating.count})</span>
        </div>

        <p className="text-lg font-bold text-gray-900">
          {CURRENCY_SYMBOL}{price.toFixed(2)}
        </p>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onAddToCart(product)}
          className="w-full mt-1"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
