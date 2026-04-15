import { CartItem } from "@/types";
import {
  COUPON_MIN_QUANTITY,
  ITEM_DISCOUNT_AMOUNT,
  COUPON_DISCOUNT_AMOUNT,
} from "@/data/constants";

interface CartDiscountResult {
  qualifyingItems: CartItem[];
  itemDiscountAmount: number;
  autoDiscount: number;
  couponDiscount: number;
  totalDiscount: number;
  finalTotal: (totalPrice: number) => number;
}

const useCartDiscount = (
  items: CartItem[],
  appliedCoupon: string | null
): CartDiscountResult => {
  const qualifyingItems = items.filter(
    (item) => item.quantity >= COUPON_MIN_QUANTITY
  );
  const autoDiscount = qualifyingItems.length * ITEM_DISCOUNT_AMOUNT;
  const couponDiscount = appliedCoupon ? COUPON_DISCOUNT_AMOUNT : 0;
  const totalDiscount = autoDiscount + couponDiscount;

  return {
    qualifyingItems,
    itemDiscountAmount: ITEM_DISCOUNT_AMOUNT,
    autoDiscount,
    couponDiscount,
    totalDiscount,
    finalTotal: (totalPrice: number) => Math.max(0, totalPrice - totalDiscount),
  };
};

export default useCartDiscount;
