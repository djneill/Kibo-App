'use client';

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyState from "@/components/ui/EmptyState";
import { ROUTES } from "@/data/constants";

const CartPage = () => {
  const { state, dispatch, totalItems, totalPrice } = useCart();
  const router = useRouter();

  if (state.items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        message="Your cart is empty."
        cta={{
          label: "Browse Products",
          onClick: () => router.push(ROUTES.HOME),
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>
        <div className="rounded-lg border border-gray-200 bg-white px-6">
          {state.items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onRemove={(id) => dispatch({ type: "REMOVE_ITEM", payload: id })}
              onUpdateQuantity={(id, quantity) =>
                dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
              }
            />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-80 lg:sticky lg:top-24">
        <CartSummary
          itemCount={totalItems}
          totalPrice={totalPrice}
          onClearCart={() => dispatch({ type: "CLEAR_CART" })}
          onCheckout={() => alert("Checkout coming soon!")}
        />
      </div>
    </div>
  );
};

export default CartPage;
