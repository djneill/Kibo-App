export const API_BASE_URL = "https://fakestoreapi.com";

export const CURRENCY_SYMBOL = "$";

export const MAX_QUANTITY_PER_ITEM = 10;

export const COUPON_DISCOUNT_AMOUNT = 20;
export const ITEM_DISCOUNT_AMOUNT = 20;
export const COUPON_MIN_QUANTITY = 2;

export const VALID_COUPONS: Record<string, string> = {
  SAVE20: "SAVE20",
};

export const ROUTES = {
  HOME: "/",
  CART: "/cart",
} as const;
