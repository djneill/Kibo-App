'use client';

import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { CURRENCY_SYMBOL, MAX_QUANTITY_PER_ITEM } from "@/data/constants";
import Button from "@/components/ui/Button";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  const { product, quantity } = item;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-0">
      <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="80px"
          className="object-contain p-1"
        />
      </div>

      <div className="flex flex-col flex-1 gap-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 line-clamp-2">{product.title}</p>
        <p className="text-sm font-bold text-gray-900">
          {CURRENCY_SYMBOL}{(product.price * quantity).toFixed(2)}
        </p>
        <p className="text-xs text-gray-400">
          {CURRENCY_SYMBOL}{product.price.toFixed(2)} each
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="w-8 h-8 !px-0 !py-0"
          >
            −
          </Button>
          <span className="w-8 text-center text-sm font-medium" aria-label={`Quantity: ${quantity}`}>
            {quantity}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            disabled={quantity >= MAX_QUANTITY_PER_ITEM}
            aria-label="Increase quantity"
            className="w-8 h-8 !px-0 !py-0"
          >
            +
          </Button>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onRemove(product.id)}
          aria-label={`Remove ${product.title} from cart`}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
