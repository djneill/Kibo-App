@AGENTS.md

# CLAUDE.md — Kibo Shopping Cart Assignment

## Project Overview

A shopping cart web application built as a take-home assignment for Kibo.
The goal is to demonstrate frontend fundamentals, component design, API integration,
responsive UI, and testable/maintainable code.

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **State Management**: React Context + useReducer (no external state library)

## API

All product data comes from the FakeStore API.

**Base URL**: `https://fakestoreapi.com`

**Endpoints used**:

- `GET /products` — fetch all products
- `GET /products/:id` — fetch single product (if needed)

**Product shape**:

```ts
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
```

## Cart State Shape

```ts
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number } // payload = product id
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };
```

## Folder Structure

```
/app
  /page.tsx                        # Product listing page (home)
  /cart/page.tsx                   # Cart page
  /layout.tsx                      # Root layout with CartProvider

/components
  /ui                              # Reusable, generic UI primitives
    /Button.tsx                    # Reusable button (variants: primary, secondary, danger)
    /Badge.tsx                     # Reusable badge (e.g. cart item count)
    /Spinner.tsx                   # Loading spinner
    /SkeletonCard.tsx              # Product card skeleton loader
    /EmptyState.tsx                # Generic empty state (icon + message + optional CTA)
  /product                         # Product-specific components
    /ProductCard.tsx               # Single product card (uses Button, next/image)
    /ProductGrid.tsx               # Responsive grid of ProductCards
  /cart                            # Cart-specific components
    /CartItem.tsx                  # Single item row in cart
    /CartSummary.tsx               # Totals + checkout button
    /CartDrawer.tsx                # Slide-in cart sidebar (optional, if not using cart page)
  /layout                          # Layout-level components
    /Navbar.tsx                    # Nav with logo, cart icon, item count Badge

/context
  /CartContext.tsx                 # CartContext + CartProvider + useCart hook

/hooks
  /useProducts.ts                  # Custom hook: fetches products, returns { products, loading, error }

/data
  /constants.ts                    # App-wide constants (API base URL, currency symbol, etc.)
  /mockProducts.ts                 # Mock product data for use in tests (do NOT call real API in tests)

/types
  /index.ts                        # All shared TypeScript interfaces (Product, CartItem, CartState, etc.)

/__tests__
  /CartContext.test.tsx
  /ProductCard.test.tsx
  /useProducts.test.ts
  /CartSummary.test.tsx
  /Button.test.tsx
```

## Code Rules — Always Follow These

### General

- Functional components only — no class components
- All components must be typed with TypeScript — no use of `any`
- Use `const` arrow functions for components: `const MyComponent = () => {}`
- No inline styles — use Tailwind classes only
- No hardcoded magic numbers or strings — use constants from `/data/constants.ts` or props

### Reusable UI Components

- Generic, reusable UI primitives live in `/components/ui/` — these have no business logic
- `Button` must accept a `variant` prop (`'primary' | 'secondary' | 'danger'`) and a `size` prop (`'sm' | 'md' | 'lg'`)
- `Button` must accept an `isLoading` prop that shows a spinner and disables the button
- `Badge` must accept a `count` number and hide itself when count is 0
- Feature components (`/components/product/`, `/components/cart/`) compose from UI primitives — they do NOT reimplement buttons, badges, or spinners themselves
- If a pattern is used more than once, it becomes a reusable component

### Data & Constants

- All content that might change lives in `/data/` — not hardcoded inside components
- `/data/constants.ts` holds: API base URL, currency symbol, max quantity per item, route paths
- `/data/mockProducts.ts` holds: an array of 3–4 typed mock `Product` objects for use in tests
- Components receive content via props — they do not import from `/data/` directly (except hooks and context)

### Next.js Specific

- Use the **App Router** (not Pages Router)
- Mark client components with `'use client'` at the top when using hooks or browser APIs
- Server components are fine for static layout/wrappers that don't need interactivity
- Use `next/image` for all product images (not `<img>`)
- Use `next/link` for all internal navigation (not `<a>`)

### State Management

- Cart state lives in `CartContext` using `useReducer`
- Do NOT use useState for cart logic — useReducer only
- Expose cart state via a custom `useCart()` hook
- The hook should throw if used outside the provider

### Styling

- Use Tailwind utility classes
- Mobile-first responsive design: start with mobile, add `md:` and `lg:` breakpoints
- Product grid: 1 col mobile → 2 col tablet → 3 or 4 col desktop
- No custom CSS files unless absolutely necessary

### Error & Loading States

- Every data fetch must have a loading state and an error state
- Show a skeleton loader or spinner while products are loading
- Show a user-friendly error message if the API fails

## Testing Rules

- Use **Jest** + **React Testing Library**
- Test files live in `/__tests__/`
- Every test file maps to a component or hook (e.g. `CartContext.test.tsx`)
- Do NOT test implementation details — test behavior and output
- Mock `fetch` globally in tests — do not make real API calls
- Required test coverage areas:
  - `useProducts`: loading state, success state, error state
  - `CartContext`: add item, add duplicate item (quantity increment), remove item, update quantity, clear cart, compute correct total
  - `ProductCard`: renders title, price, image; "Add to Cart" button calls handler
  - `CartSummary`: displays correct item count and total price

## What NOT to Do

- Do NOT use Redux, Zustand, or any external state library
- Do NOT use `any` type anywhere
- Do NOT use `<img>` tags — use `next/image`
- Do NOT use `<a>` tags for internal links — use `next/link`
- Do NOT write class components
- Do NOT make real API calls in tests
- Do NOT use inline styles
- Do NOT skip loading and error states

## README Requirements

The README.md must include:

- Framework and library versions
- Setup and run instructions (`npm install`, `npm run dev`)
- Test instructions (`npm run test`)
- Live deployment URL (Vercel preferred)
