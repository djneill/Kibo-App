'use client';

import Image from "next/image";
import { Product } from "@/types";
import { CURRENCY_SYMBOL } from "@/data/constants";
import Button from "@/components/ui/Button";
import styles from "./ProductListing.module.css";
import { PiStarFill } from "react-icons/pi";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { title, price, image, rating, category } = product;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h2 className={styles.title} title={title}>{title}</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6b7280', fontWeight: 'bold' }}>
          <PiStarFill color="#fbbf24" size={16} />
          <span>{rating.rate}</span>
          <span style={{ color: '#9ca3af' }}>({rating.count})</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
          <p className={styles.price}>
            {CURRENCY_SYMBOL}{price.toFixed(2)}
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onAddToCart(product)}
          style={{ width: '100%', marginTop: '8px' }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
