'use client';

import { CURRENCY_SYMBOL } from "@/data/constants";
import Button from "@/components/ui/Button";
import styles from "@/app/cart/Cart.module.css";

interface CartSummaryProps {
  itemCount: number;
  totalPrice: number;
  onClearCart: () => void;
  onCheckout: () => void;
}

const CartSummary = ({ itemCount, totalPrice, onClearCart, onCheckout }: CartSummaryProps) => (
  <div className={styles.stickyBottomBar}>
    <div className={styles.summaryRow}>
      <span className={styles.summaryLabel}>Total ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
      <span className={styles.summaryValue}>{CURRENCY_SYMBOL}{totalPrice.toFixed(2)}</span>
    </div>

    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="secondary" size="lg" onClick={onClearCart} style={{ flex: 1 }}>
        Clear
      </Button>
      <Button variant="primary" size="lg" onClick={onCheckout} style={{ flex: 2 }}>
        Checkout
      </Button>
    </div>
  </div>
);

export default CartSummary;
