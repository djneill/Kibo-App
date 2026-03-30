# Kibo Shop

A shopping cart web application built as a take-home assignment for Kibo. Fetches products from the [FakeStore API](https://fakestoreapi.com), lets users add items to a cart, adjust quantities, and view an order summary.

## Tech stack

| Tool | Version |
|---|---|
| Next.js | 16.2.1 |
| React | 19.2.4 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| Jest | ^30.3.0 |
| React Testing Library | ^16.3.2 |
| ts-jest | ^29.4.6 |

State is managed with React Context + `useReducer`. No external state library is used.

## Setup

```bash
npm install
```

## Running the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To build and run for production:

```bash
npm run build
npm start
```

## Running tests

```bash
npm test
```

Run in watch mode during development:

```bash
npm run test:watch
```

## Folder structure

```
/app
  /page.tsx              # Product listing page (home)
  /cart/page.tsx         # Cart page
  /layout.tsx            # Root layout — wraps app in CartProvider and Navbar

/components
  /ui                    # Reusable, stateless UI primitives
    Button.tsx           # Variants: primary | secondary | danger. Sizes: sm | md | lg
    Badge.tsx            # Item count badge — hidden when count is 0
    Spinner.tsx          # Accessible loading spinner
    SkeletonCard.tsx     # Product card skeleton for loading state
    EmptyState.tsx       # Empty state with icon, message, and optional CTA
  /product
    ProductCard.tsx      # Single product card
    ProductGrid.tsx      # Responsive grid — shows skeletons while loading
  /cart
    CartItem.tsx         # Single cart row with quantity controls and remove button
    CartSummary.tsx      # Order summary with subtotal, clear, and checkout
    CartDrawer.tsx       # (reserved) Slide-in cart sidebar
  /layout
    Navbar.tsx           # App header with live cart item count Badge

/context
  CartContext.tsx        # CartContext, CartProvider, and useCart hook

/hooks
  useProducts.ts         # Fetches all products — returns { products, loading, error }

/data
  constants.ts           # API base URL, currency symbol, max quantity, route paths
  mockProducts.ts        # Typed mock products for use in tests

/types
  index.ts               # Shared TypeScript interfaces: Product, CartItem, CartState, CartAction

/__tests__
  CartContext.test.tsx   # Cart reducer and context behaviour
  ProductCard.test.tsx   # ProductCard rendering and interaction
  CartSummary.test.tsx   # Order summary display and callbacks
  Button.test.tsx        # Button variants, states, and accessibility
  useProducts.test.ts    # Hook loading, success, and error states
```

## Live deployment

[https://your-deployment-url.vercel.app](https://your-deployment-url.vercel.app)

> Replace the URL above with your Vercel deployment link after running `vercel --prod` or connecting the repo to a Vercel project.
