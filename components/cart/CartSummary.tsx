"use client";

import { useState, FormEvent } from "react";
import {
  CURRENCY_SYMBOL,
  COUPON_DISCOUNT_AMOUNT,
  COUPON_MIN_QUANTITY,
  ITEM_DISCOUNT_AMOUNT,
  VALID_COUPONS,
} from "@/data/constants";
import { CartItem } from "@/types";
import Button from "@/components/ui/Button";
import styles from "@/app/cart/Cart.module.css";

interface CartSummaryProps {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  onClearCart: () => void;
  onCheckout: () => void;
}

const CartSummary = ({
  items,
  itemCount,
  totalPrice,
  onClearCart,
  onCheckout,
}: CartSummaryProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const qualifyingItems = items.filter(
    (item) => item.quantity >= COUPON_MIN_QUANTITY
  );
  const autoDiscount = qualifyingItems.length * ITEM_DISCOUNT_AMOUNT;

  const couponDiscount = appliedCoupon ? COUPON_DISCOUNT_AMOUNT : 0;
  const totalDiscount = autoDiscount + couponDiscount;
  const finalTotal = Math.max(0, totalPrice - totalDiscount);

  const handleCouponSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = couponCode.trim().toUpperCase();

    if (!VALID_COUPONS[trimmed]) {
      setCouponError("Invalid coupon code.");
      return;
    }

    setAppliedCoupon(trimmed);
    setCouponError(null);
    setCouponCode("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  return (
    <div className={styles.stickyBottomBar}>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>
          Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})
        </span>
        <span className={styles.summaryValue}>
          {CURRENCY_SYMBOL}
          {totalPrice.toFixed(2)}
        </span>
      </div>

      {qualifyingItems.map((item) => (
        <div key={item.product.id} className={styles.summaryRow}>
          <span className={`${styles.discountLabel} text-red-500`}>
            {item.product.title.length > 24
              ? `${item.product.title.slice(0, 24)}…`
              : item.product.title}{" "}
            discount
          </span>
          <span className={`${styles.discountValue} text-red-500`}>
            −{CURRENCY_SYMBOL}
            {ITEM_DISCOUNT_AMOUNT.toFixed(2)}
          </span>
        </div>
      ))}

      {couponDiscount > 0 && (
        <div className={styles.summaryRow}>
          <span className={`${styles.discountLabel} text-red-500`}>
            Coupon ({appliedCoupon})
          </span>
          <span className={`${styles.discountValue} text-red-500`}>
            −{CURRENCY_SYMBOL}
            {couponDiscount.toFixed(2)}
          </span>
        </div>
      )}

      {totalDiscount > 0 && (
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Total</span>
          <span className={`${styles.summaryValue} text-green-600`}>
            {CURRENCY_SYMBOL}
            {finalTotal.toFixed(2)}
          </span>
        </div>
      )}

      {appliedCoupon ? (
        <div className={styles.couponApplied}>
          <span>
            <strong>{appliedCoupon}</strong> applied — saving {CURRENCY_SYMBOL}
            {couponDiscount.toFixed(2)}!
          </span>
          <button
            type="button"
            onClick={handleRemoveCoupon}
            className={styles.removeCoupon}
            aria-label="Remove coupon"
          >
            ✕
          </button>
        </div>
      ) : (
        <form className={styles.couponForm} onSubmit={handleCouponSubmit}>
          <div className={styles.couponInputWrapper}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setCouponError(null);
              }}
              className={`${styles.couponInput}${couponError ? ` ${styles.couponInputError}` : ""}`}
              aria-label="Coupon code"
            />
            {couponError && (
              <p className={styles.couponError}>{couponError}</p>
            )}
          </div>
          <Button
            variant="secondary"
            size="sm"
            type="submit"
            disabled={!couponCode.trim()}
          >
            Apply
          </Button>
        </form>
      )}

      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="lg"
          onClick={onClearCart}
          className="flex-1"
        >
          Clear
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onCheckout}
          className="flex-[2]"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
