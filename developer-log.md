# Developer Log — Kibo Shopping Cart Assignment

## AI Strategy

<!-- Fill this in at the end — 1 paragraph summarizing your overall approach -->

I began by authoring a CLAUDE.md file in the project root that provided Claude Code
with the full project context before any code was written. This included the API schema,
typed cart state shape, folder structure conventions, reusable component rules, and an
explicit list of things Claude should never do (e.g. no `any`, no `<img>` tags, no inline
styles). I also separated content from logic by maintaining a `/data/` folder for constants
and mock data, which I instructed Claude to reference rather than hardcode values inside
components. Features were built in a deliberate sequence — types first, then UI primitives,
then business logic, then feature components, then pages — so each layer was stable before
the next was built on top of it.

---

## Build Log

### Step 1 — Scaffold

**Prompt used:** "Read CLAUDE.md thoroughly. Scaffold the complete folder structure with
empty placeholder files exactly as defined in CLAUDE.md. Do not write any component logic yet."

**What happened:**

<!-- Describe what Claude actually generated -->

**Changes I made:**

<!-- Did you rename anything? Add a folder? Remove something that didn't make sense? -->

**Decision:**

<!-- Why did you accept or change what Claude produced? -->

---

### Step 2 — Types & Constants

**Prompt used:** "Implement /types/index.ts, /data/constants.ts, /data/mockProducts.ts
per CLAUDE.md."

**What happened:**

<!-- e.g. "Claude defined CartAction as a string union instead of a discriminated union.
I corrected it to use the { type, payload } pattern for type safety." -->

**Changes I made:**

**Decision:**

---

### Step 3 — UI Primitives (Button, Badge, Spinner, SkeletonCard, EmptyState)

**Prompt used:** "Build the reusable UI primitives in /components/ui/ following CLAUDE.md rules."

**What happened:**

**Changes I made:**

<!-- This is where the isLoading / aria- fix goes if it happened -->

**Decision:**

---

### Step 4 — Cart Context & Reducer

**Prompt used:** "Implement /context/CartContext.tsx using useReducer. Handle all four
actions. ADD_ITEM should increment quantity if item already exists."

**What happened:**

**Changes I made:**

<!-- e.g. "Claude used useState for the cart items array instead of useReducer as specified.
I flagged this and asked Claude to refactor to useReducer because the multi-action cart
logic is exactly the use case reducers are designed for." -->

**Decision:**

---

### Step 5 — useProducts Hook

**Prompt used:** "Implement /hooks/useProducts.ts fetching from the URL in constants.ts.
Return { products, loading, error }."

**What happened:**

**Changes I made:**

**Decision:**

---

### Step 6 — Product Components

**Prompt used:** "Build ProductCard.tsx and ProductGrid.tsx composing from /components/ui primitives."

**What happened:**

**Changes I made:**

Claude produced a JSX syntax error in ProductGrid.tsx — a missing closing tag on the ProductCard component ()) instead of />)). I identified and fixed this manually rather than delegating it back to Claude, as it was a simple syntax issue I could read directly from the error output.

**Decision:**

---

### Step 7 — Cart Components

**Prompt used:** "Build CartItem.tsx, CartSummary.tsx, and Navbar.tsx composing from
/components/ui primitives."

**What happened:**

**Changes I made:**

**Decision:**

---

### Step 8 — Pages & Layout

**Prompt used:** "Wire everything together in layout.tsx, page.tsx, and cart/page.tsx."

**What happened:**

**Changes I made:**

**Decision:**

---

## Human Audit — Three Specific Corrections

<!-- Pick your 3 most meaningful corrections from the steps above and expand them here.
These should be specific: what Claude did, why it was wrong, how you fixed it. -->

### Correction 1 — [Short title, e.g. "Button isLoading not disabling click handler"]

**What Claude generated:**

**Why it was a problem:**

**What I changed:**

---

### Correction 2 — [Short title]

**What Claude generated:**

**Why it was a problem:**

**What I changed:**

---

### Correction 3 — [Short title]

**What Claude generated:**

**Why it was a problem:**

**What I changed:**

---

## Verification — AI-Assisted Edge Case Testing

**Prompt used:**
"Review the tests you just wrote. What edge cases are not covered? Think about: empty
states, boundary values, unexpected API responses, cart quantity limits. Generate
additional tests for any gaps you find."

**Edge cases Claude identified:**

## <!-- List what Claude surfaced -->

-
- **Edge cases I added manually that Claude missed:**
  <!-- Did you think of anything Claude didn't? -->

- **Final test areas covered:**

- [ ] useProducts: loading state
- [ ] useProducts: successful fetch
- [ ] useProducts: failed fetch / error message
- [ ] CartContext: add new item
- [ ] CartContext: add duplicate item (quantity increments)
- [ ] CartContext: remove item
- [ ] CartContext: update quantity
- [ ] CartContext: clear cart
- [ ] CartContext: correct total price
- [ ] ProductCard: renders title, price, image
- [ ] ProductCard: Add to Cart fires callback with correct product
- [ ] CartSummary: correct item count and total
- [ ] Button: all variants render
- [ ] Button: isLoading shows spinner and disables button
- [ ] Cart page: EmptyState shown when cart is empty
