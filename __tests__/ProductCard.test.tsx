import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/data/mockProducts";
import { CURRENCY_SYMBOL } from "@/data/constants";

// next/image renders a plain <img> in the test environment
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const product = mockProducts[0]; // Fjallraven Backpack, $109.95

const renderCard = (onAddToCart = jest.fn()) =>
  render(<ProductCard product={product} onAddToCart={onAddToCart} />);

describe("ProductCard", () => {
  it("renders the product title", () => {
    renderCard();
    expect(screen.getByText(product.title)).toBeInTheDocument();
  });

  it("renders the formatted price", () => {
    renderCard();
    expect(
      screen.getByText(`${CURRENCY_SYMBOL}${product.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("renders an image with the correct alt text", () => {
    renderCard();
    expect(screen.getByAltText(product.title)).toBeInTheDocument();
  });

  it("calls onAddToCart with the correct product when button is clicked", async () => {
    const onAddToCart = jest.fn();
    renderCard(onAddToCart);

    await userEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(product);
  });

  it("renders the Add to Cart button", () => {
    renderCard();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });
});
