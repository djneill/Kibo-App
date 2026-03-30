import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/ui/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each(["primary", "secondary", "danger"] as const)(
    "renders the %s variant without error",
    (variant) => {
      render(<Button variant={variant}>Label</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    }
  );

  it.each(["sm", "md", "lg"] as const)(
    "renders the %s size without error",
    (size) => {
      render(<Button size={size}>Label</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    }
  );

  it("is disabled when isLoading is true", () => {
    render(<Button isLoading>Label</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows a spinner when isLoading is true", () => {
    render(<Button isLoading>Label</Button>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("does not show a spinner when isLoading is false", () => {
    render(<Button>Label</Button>);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Button disabled>Label</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not call onClick when disabled", async () => {
    const onClick = jest.fn();
    render(<Button disabled onClick={onClick}>Label</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("has aria-busy true when isLoading", () => {
    render(<Button isLoading>Label</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("does not call onClick when isLoading is true", async () => {
    const onClick = jest.fn();
    render(<Button isLoading onClick={onClick}>Label</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("has aria-disabled true when disabled prop is set", () => {
    render(<Button disabled>Label</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  });

  it("has aria-disabled true when isLoading is true", () => {
    render(<Button isLoading>Label</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  });

  it("defaults to type='button' to prevent accidental form submission", () => {
    render(<Button>Label</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});
