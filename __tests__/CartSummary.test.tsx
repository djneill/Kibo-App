import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartSummary from "@/components/cart/CartSummary";
import { CURRENCY_SYMBOL } from "@/data/constants";

const defaultProps = {
  itemCount: 3,
  totalPrice: 132.25,
  onClearCart: jest.fn(),
  onCheckout: jest.fn(),
};

const renderSummary = (props = defaultProps) =>
  render(<CartSummary {...props} />);

describe("CartSummary", () => {
  it("displays the correct item count", () => {
    renderSummary();
    expect(screen.getByText(String(defaultProps.itemCount))).toBeInTheDocument();
  });

  it("displays the correct total price", () => {
    renderSummary();
    const formatted = `${CURRENCY_SYMBOL}${defaultProps.totalPrice.toFixed(2)}`;
    // Total appears twice (subtotal row + total row) — assert at least once
    expect(screen.getAllByText(formatted).length).toBeGreaterThanOrEqual(1);
  });

  it("calls onClearCart when Clear Cart is clicked", async () => {
    const onClearCart = jest.fn();
    renderSummary({ ...defaultProps, onClearCart });
    await userEvent.click(screen.getByRole("button", { name: /clear cart/i }));
    expect(onClearCart).toHaveBeenCalledTimes(1);
  });

  it("calls onCheckout when Checkout is clicked", async () => {
    const onCheckout = jest.fn();
    renderSummary({ ...defaultProps, onCheckout });
    await userEvent.click(screen.getByRole("button", { name: /checkout/i }));
    expect(onCheckout).toHaveBeenCalledTimes(1);
  });

  it("displays $0.00 total when cart is empty", () => {
    renderSummary({ ...defaultProps, itemCount: 0, totalPrice: 0 });
    expect(screen.getAllByText(`${CURRENCY_SYMBOL}0.00`).length).toBeGreaterThanOrEqual(1);
  });

  it("does not call onClearCart more than once per click", async () => {
    const onClearCart = jest.fn();
    renderSummary({ ...defaultProps, onClearCart });
    await userEvent.click(screen.getByRole("button", { name: /clear cart/i }));
    expect(onClearCart).toHaveBeenCalledTimes(1);
  });

  it("renders correctly with a single item", () => {
    renderSummary({ ...defaultProps, itemCount: 1, totalPrice: 109.95 });
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getAllByText(`${CURRENCY_SYMBOL}109.95`).length).toBeGreaterThanOrEqual(1);
  });

  it("displays a price that does not suffer from float precision errors", () => {
    // 3 × $0.10 = $0.30 — naive JS gives 0.30000000000000004
    renderSummary({ ...defaultProps, itemCount: 3, totalPrice: 3 * 0.1 });
    expect(screen.getAllByText(`${CURRENCY_SYMBOL}0.30`).length).toBeGreaterThanOrEqual(1);
  });
});
