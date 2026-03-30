'use client';

import { createContext, useContext, useReducer } from "react";
import { CartAction, CartState } from "@/types";
import { MAX_QUANTITY_PER_ITEM } from "@/data/constants";

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY_PER_ITEM) }
              : item
          ),
        };
      }
      return { items: [...state.items, { product: action.payload, quantity: 1 }] };
    }

    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.product.id !== action.payload) };

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.product.id !== id) };
      }
      return {
        items: state.items.map((item) =>
          item.product.id === id
            ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY_PER_ITEM) }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
};

const initialState: CartState = { items: [] };

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};

export default CartProvider;
