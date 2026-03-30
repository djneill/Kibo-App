'use client';

import { CURRENCY_SYMBOL } from "@/data/constants";
import Button from "@/components/ui/Button";

interface CartSummaryProps {
  itemCount: number;
  totalPrice: number;
  onClearCart: () => void;
  onCheckout: () => void;
}

const CartSummary = ({ itemCount, totalPrice, onClearCart, onCheckout }: CartSummaryProps) => (
  <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 flex flex-col gap-4">
    <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>

    <div className="flex flex-col gap-2 text-sm text-gray-600">
      <div className="flex justify-between">
        <span>Items</span>
        <span>{itemCount}</span>
      </div>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{CURRENCY_SYMBOL}{totalPrice.toFixed(2)}</span>
      </div>
    </div>

    <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-4">
      <span>Total</span>
      <span>{CURRENCY_SYMBOL}{totalPrice.toFixed(2)}</span>
    </div>

    <Button variant="primary" size="lg" onClick={onCheckout} className="w-full">
      Checkout
    </Button>

    <Button variant="danger" size="md" onClick={onClearCart} className="w-full">
      Clear Cart
    </Button>
  </div>
);

export default CartSummary;
