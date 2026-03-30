'use client';

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyState from "@/components/ui/EmptyState";
import { ROUTES } from "@/data/constants";
import styles from "./Cart.module.css";
import { PiShoppingCartBold } from "react-icons/pi";

const CartPage = () => {
  const { state, dispatch, totalItems, totalPrice } = useCart();
  const router = useRouter();

  if (state.items.length === 0) {
    return (
      <EmptyState
        icon={<PiShoppingCartBold size={80} color="#00b4d8" />}
        message="Your cart is feeling empty!"
        cta={{
          label: "Keep Shopping",
          onClick: () => router.push(ROUTES.HOME),
        }}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div style={{ flex: 1 }}>
        <h1 className={styles.title}>Your Cart</h1>
        <div>
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

      <CartSummary
        itemCount={totalItems}
        totalPrice={totalPrice}
        onClearCart={() => dispatch({ type: "CLEAR_CART" })}
        onCheckout={() => alert("Checkout coming soon!")}
      />
    </div>
  );
};

export default CartPage;
