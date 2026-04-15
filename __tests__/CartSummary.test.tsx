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
  render(<CartSummary items={[]} {...props} />);

describe("CartSummary", () => {
  it("displays the correct item count", () => {
    renderSummary();
    // Item count is embedded in "Total (3 items)" label
    expect(screen.getByText(/3 items/i)).toBeInTheDocument();
  });

  it("displays the correct total price", () => {
    renderSummary();
    const formatted = `${CURRENCY_SYMBOL}${defaultProps.totalPrice.toFixed(2)}`;
    expect(screen.getByText(formatted)).toBeInTheDocument();
  });

  it("calls onClearCart when Clear button is clicked", async () => {
    const onClearCart = jest.fn();
    renderSummary({ ...defaultProps, onClearCart });
    await userEvent.click(screen.getByRole("button", { name: /^clear$/i }));
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
    expect(screen.getByText(`${CURRENCY_SYMBOL}0.00`)).toBeInTheDocument();
  });

  it("does not call onClearCart more than once per click", async () => {
    const onClearCart = jest.fn();
    renderSummary({ ...defaultProps, onClearCart });
    await userEvent.click(screen.getByRole("button", { name: /^clear$/i }));
    expect(onClearCart).toHaveBeenCalledTimes(1);
  });

  it("renders correctly with a single item using singular label", () => {
    renderSummary({ ...defaultProps, itemCount: 1, totalPrice: 109.95 });
    // Singular: "Total (1 item)" — no "s"
    expect(screen.getByText(/1 item\b/i)).toBeInTheDocument();
    expect(screen.getByText(`${CURRENCY_SYMBOL}109.95`)).toBeInTheDocument();
  });

  it("displays a price that does not suffer from float precision errors", () => {
    // 3 × $0.10 = $0.30 — naive JS gives 0.30000000000000004
    renderSummary({ ...defaultProps, itemCount: 3, totalPrice: 3 * 0.1 });
    expect(screen.getByText(`${CURRENCY_SYMBOL}0.30`)).toBeInTheDocument();
  });
});
