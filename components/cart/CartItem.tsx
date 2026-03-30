'use client';

import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { CURRENCY_SYMBOL, MAX_QUANTITY_PER_ITEM } from "@/data/constants";
import Button from "@/components/ui/Button";
import styles from "@/app/cart/Cart.module.css";
import { PiTrashBold } from "react-icons/pi";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  const { product, quantity } = item;

  return (
    <div className={styles.itemCard}>
      <div className={styles.itemImageWrapper}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="80px"
          className={styles.itemImage}
        />
      </div>

      <div className={styles.itemDetails}>
        <p className={styles.itemTitle}>{product.title}</p>
        <p className={styles.itemPrice}>
          {CURRENCY_SYMBOL}{(product.price * quantity).toFixed(2)}
        </p>

        <div className={styles.quantityControls}>
          <button
            type="button"
            className={styles.qtyButton}
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            style={{ opacity: quantity <= 1 ? 0.5 : 1 }}
          >
            −
          </button>
          
          <span className={styles.qtyValue} aria-label={`Quantity: ${quantity}`}>
            {quantity}
          </span>
          
          <button
            type="button"
            className={styles.qtyButton}
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            disabled={quantity >= MAX_QUANTITY_PER_ITEM}
            aria-label="Increase quantity"
            style={{ opacity: quantity >= MAX_QUANTITY_PER_ITEM ? 0.5 : 1 }}
          >
            +
          </button>
          
          <div style={{ marginLeft: 'auto' }}>
            <Button
              variant="icon"
              size="icon"
              onClick={() => onRemove(product.id)}
              aria-label={`Remove ${product.title} from cart`}
            >
              <PiTrashBold size={20} color="#00b4d8" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
