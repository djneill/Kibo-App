import React from "react";
import { render, screen, act } from "@testing-library/react";
import CartProvider, { useCart } from "@/context/CartContext";
import { mockProducts } from "@/data/mockProducts";
import { MAX_QUANTITY_PER_ITEM } from "@/data/constants";

const NONEXISTENT_ID = 9999;

const TestConsumer = () => {
  const { state, dispatch, totalItems, totalPrice } = useCart();
  return (
    <div>
      <span data-testid="item-count">{totalItems}</span>
      <span data-testid="total-price">{totalPrice.toFixed(2)}</span>
      {state.items.map((item) => (
        <div key={item.product.id} data-testid={`item-${item.product.id}`}>
          {item.product.title} x{item.quantity}
        </div>
      ))}
      <button onClick={() => dispatch({ type: "ADD_ITEM", payload: mockProducts[0] })}>add-0</button>
      <button onClick={() => dispatch({ type: "ADD_ITEM", payload: mockProducts[1] })}>add-1</button>
      <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: mockProducts[0].id })}>remove-0</button>
      <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: NONEXISTENT_ID })}>remove-missing</button>
      <button onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: mockProducts[0].id, quantity: 5 } })}>set-qty-5</button>
      <button onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: mockProducts[0].id, quantity: MAX_QUANTITY_PER_ITEM + 1 } })}>set-qty-over</button>
      <button onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: mockProducts[0].id, quantity: 0 } })}>set-qty-0</button>
      <button onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: mockProducts[0].id, quantity: -1 } })}>set-qty-neg</button>
      <button onClick={() => dispatch({ type: "CLEAR_CART" })}>clear</button>
    </div>
  );
};

const renderCart = () =>
  render(
    <CartProvider>
      <TestConsumer />
    </CartProvider>
  );

const clickBtn = (label: string) =>
  act(() => {
    screen.getByRole("button", { name: label }).click();
  });

describe("CartContext", () => {
  const p0id = mockProducts[0].id; // 1
  const p1id = mockProducts[1].id; // 2

  // --- core actions ---

  it("adds a new item to the cart", () => {
    renderCart();
    clickBtn("add-0");
    expect(screen.getByTestId(`item-${p0id}`)).toHaveTextContent("x1");
    expect(screen.getByTestId("item-count")).toHaveTextContent("1");
  });

  it("increments quantity when the same item is added twice", () => {
    renderCart();
    clickBtn("add-0");
    clickBtn("add-0");
    expect(screen.getByTestId(`item-${p0id}`)).toHaveTextContent("x2");
    expect(screen.getByTestId("item-count")).toHaveTextContent("2");
  });

  it("tracks multiple different items independently", () => {
    renderCart();
    clickBtn("add-0");
    clickBtn("add-1");
    expect(screen.getByTestId(`item-${p0id}`)).toHaveTextContent("x1");
    expect(screen.getByTestId(`item-${p1id}`)).toHaveTextContent("x1");
    expect(screen.getByTestId("item-count")).toHaveTextContent("2");
  });

  it("removes an item from the cart", () => {
    renderCart();
    clickBtn("add-0");
    clickBtn("remove-0");
    expect(screen.queryByTestId(`item-${p0id}`)).not.toBeInTheDocument();
    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
  });

  it("updates item quantity", () => {
    renderCart();
    clickBtn("add-0");
    clickBtn("set-qty-5");
    expect(screen.getByTestId(`item-${p0id}`)).toHaveTextContent("x5");
    expect(screen.getByTestId("item-count")).toHaveTextContent("5");
  });

  it("clears all items from the cart", () => {
    renderCart();
    clickBtn("add-0");
    clickBtn("add-1");
    clickBtn("clear");
    expect(screen.queryByTestId(`item-${p0id}`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`item-${p1id}`)).not.toBeInTheDocument();
    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
  });

  // --- totals ---

  it("starts with a total price of 0", () => {
    renderCart();
    expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
  });

  it("calculates the correct total price for multiple products", () => {
    renderCart();
    clickBtn("add-0"); // $109.95
    clickBtn("add-1"); // $22.30  → total $132.25
    expect(screen.getByTestId("total-price")).toHaveTextContent("132.25");
  });

  it("calculates total price accounting for quantity", () => {
    renderCart();
    clickBtn("add-0"); // $109.95
    clickBtn("add-0"); // $109.95 × 2 = $219.90
    expect(screen.getByTestId("total-price")).toHaveTextContent("219.90");
  });

  // --- quantity boundary / MAX_QUANTITY_PER_ITEM ---

  it("does not exceed MAX_QUANTITY_PER_ITEM when adding the same item repeatedly", () => {
    renderCart();
    for (let i = 0; i < MAX_QUANTITY_PER_ITEM + 1; i++) clickBtn("add-0");
    expect(screen.getByTestId(`item-${p0id}`)).toHaveTextContent(`x${MAX_QUANTITY_PER_ITEM}`);
    expect(screen.getByTestId("item-count")).toHaveTextContent(String(MAX_QUANTITY_PER_ITEM));
  });

  it("caps UPDATE_QUANTITY at MAX_QUANTITY_PER_ITEM", () => {
    renderCart();
    clickBtn("add-0");
    clickBtn("set-qty-over"); // MAX_QUANTITY_PER_ITEM + 1
    expect(screen.getByTestId(`item-${p0id}`)).toHaveTextContent(`x${MAX_QUANTITY_PER_ITEM}`);
    expect(screen.getByTestId("item-count")).toHaveTextContent(String(MAX_QUANTITY_PER_ITEM));
  });

  // --- UPDATE_QUANTITY edge values ---

  it("removes the item when UPDATE_QUANTITY is set to 0", () => {
    renderCart();
    clickBtn("add-0");
    clickBtn("set-qty-0");
    expect(screen.queryByTestId(`item-${p0id}`)).not.toBeInTheDocument();
    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
  });

  it("removes the item when UPDATE_QUANTITY is set to a negative number", () => {
    renderCart();
    clickBtn("add-0");
    clickBtn("set-qty-neg");
    expect(screen.queryByTestId(`item-${p0id}`)).not.toBeInTheDocument();
    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
  });

  // --- REMOVE_ITEM edge cases ---

  it("is a no-op when REMOVE_ITEM targets an id not in the cart", () => {
    renderCart();
    clickBtn("add-0");
    clickBtn("remove-missing");
    expect(screen.getByTestId(`item-${p0id}`)).toBeInTheDocument();
    expect(screen.getByTestId("item-count")).toHaveTextContent("1");
  });

  // --- CLEAR_CART edge case ---

  it("CLEAR_CART on an already empty cart does not throw", () => {
    renderCart();
    expect(() => clickBtn("clear")).not.toThrow();
    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
  });

  // --- hook guard ---

  it("throws when useCart is used outside CartProvider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      "useCart must be used within a CartProvider"
    );
    consoleError.mockRestore();
  });
});
