# Developer Log — Kibo Shopping Cart Assignment

## AI Strategy

Before writing a single line of code, I authored a `CLAUDE.md` file in the project root
that gave Claude Code full project context upfront. This included the FakeStore API schema
with typed interfaces, the cart state shape and all four reducer actions, a detailed folder
structure with explicit naming conventions, and a list of things Claude was explicitly
forbidden to do (no `any` types, no `<img>` tags, no inline styles, no class components,
no hardcoded URLs). I also defined a `/data/` folder for constants and mock data so Claude
would reference a single source of truth rather than scatter magic strings across components.

Features were built in a deliberate sequence — types and constants first, then reusable UI
primitives, then cart context and reducer, then hooks, then feature components, then pages,
and finally tests. This meant each layer was stable and reviewable before the next was built
on top of it. Claude Code was given one focused task per prompt rather than being asked to
build everything at once, which kept output quality high and made it easy to catch mistakes
before they propagated.

For the visual design direction I used Gemini to generate a playful, colorful consumer app
aesthetic (Duolingo meets Shopify), then manually extracted the design tokens and encoded
them into `CLAUDE.md` and `globals.css` so Claude Code had a concrete spec to build to
rather than making aesthetic decisions itself. Midway through the build, I used Gemini again
to refine the palette into a cohesive deep ocean blue system — nine named color ramps from
`deep_twilight` (#03045e) through `light_cyan` (#caf0f8) — and updated `CLAUDE.md` with
explicit usage rules for each token so Claude Code applied them consistently across
components without guessing.

---

## Human Audit — Three Specific Corrections

### Correction 1 — next/image fill escaping wrapper due to missing `position: relative`

**What Claude generated:** `CartItem.tsx` used `next/image` with the `fill` prop inside a
fixed 80×80 wrapper div (`.itemImageWrapper`), but the wrapper was missing
`position: relative`.

**Why it was a problem:** When `next/image` uses `fill` mode, it applies
`position: absolute` to size itself relative to the nearest positioned ancestor. Without
`position: relative` on the wrapper, the image escaped the 80×80 container and filled a
much larger parent element, causing product images to render huge and centered on the cart
page.

**What I changed:** Added `position: relative` to `.itemImageWrapper` in
`Cart.module.css`. The image now correctly constrains itself within the 80×80 boundary. I
identified and fixed this by reading the build output directly rather than re-prompting
Claude, because the cause was clear from understanding how CSS positioning and `next/image`
interact.

---

### Correction 2 — Product listing heading unstyled and flush against the margin

**What Claude generated:**

```tsx
<h1 className="text-2xl font-bold text-gray-900 mb-6 ml-6">Products</h1>
```

Small, left-aligned, plain gray, pushed against the left margin with a fixed pixel offset
and no visual presence.

**Why it was a problem:** On mobile the text sat uncomfortably close to the viewport edge,
and the styling was generic and didn't match the playful, colorful consumer aesthetic the
application was designed for.

**What I changed:**

```tsx
<h1 className="text-4xl font-bold text-center text-[#00b4d8] py-8 tracking-wide drop-shadow-sm font-fredoka">
  Products
</h1>
```

Centered the heading, scaled it up to `text-4xl`, applied the brand accent color
`#00b4d8`, added vertical breathing room with `py-8`, and applied the Fredoka font for the
playful consumer feel.

---

### Correction 3 — Font applied via inline style instead of Tailwind utility class

**What Claude generated:** The Fredoka font was applied using an inline `style` prop in
multiple components:

```tsx
style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
```

Claude also used `letterSpacing: '0.5px'` as an inline style in `Button.tsx`.

**Why it was a problem:** Mixing inline styles with Tailwind creates an inconsistent
codebase that is harder to maintain. Inline styles override Tailwind classes unpredictably
and cannot be overridden by responsive or state variants. The `CLAUDE.md` explicitly
forbade inline styles.

**What I changed:** Refactored font handling properly across the codebase:

1. Added `--font-fredoka` to the `@theme` inline block in `globals.css` so Tailwind v4
   automatically generates a `font-fredoka` utility class
2. Replaced all inline `style={{ fontFamily: ... }}` references in `app/page.tsx` and
   `Button.tsx` with the `font-fredoka` utility class
3. Replaced `letterSpacing: '0.5px'` in `Button.tsx` with Tailwind's `tracking-wide`
4. Left CSS module files (`Cart.module.css`, `Navbar.module.css`,
   `ProductListing.module.css`) using `font-family: var(--font-fredoka)` in plain CSS
   declarations — acceptable since these are not inline styles

---

### Correction 4 — Color palette replaced mid-build to establish a cohesive design system

**What Claude generated:** The initial design used a single hardcoded accent color
(`#00b4d8`) scattered across components with no systematic naming or usage rules.

**Why it was a problem:** A single accent color without a full palette meant Claude Code
made ad-hoc decisions for hover states, backgrounds, borders, and text — producing an
inconsistent visual result. There was no token system to enforce consistency as new
components were added.

**What I changed:** Used Gemini to design a full nine-ramp ocean blue palette, from
`deep_twilight` (#03045e) to `light_cyan` (#caf0f8). I then added the complete palette to
`tailwind.config.ts` as named custom color tokens and updated `CLAUDE.md` with explicit
usage rules — which color to use for primary buttons, navbar, page backgrounds, price text,
hover states, and badges. This meant subsequent Claude Code prompts produced components with
consistent, intentional color usage rather than guesswork.

---

## Verification — AI-Assisted Edge Case Testing

**Prompt used:**

> "Review the tests you just wrote. What edge cases are not covered? Think about: empty
> states, boundary values, unexpected API responses, cart quantity limits. Generate
> additional tests for any gaps you find."

**Edge cases Claude identified and added tests for:**

| Area        | Gap                                                                     | Fix                                      |
| ----------- | ----------------------------------------------------------------------- | ---------------------------------------- |
| useProducts | Non-Error throw never hit the "Something went wrong" fallback           | Added test rejecting with a plain string |
| useProducts | Empty `[]` response was untested (valid but edge case)                  | Added test for API returning no products |
| useProducts | `loading → false` transition after success was implicit                 | Made it an explicit named test           |
| CartContext | `MAX_QUANTITY_PER_ITEM` cap on `ADD_ITEM` never tested                  | Added test: add item 11× → capped at 10  |
| CartContext | `MAX_QUANTITY_PER_ITEM` cap on `UPDATE_QUANTITY` never tested           | Added set-qty-over-limit test            |
| CartContext | `UPDATE_QUANTITY` with `quantity === 0` (auto-remove) untested          | Added test                               |
| CartContext | `UPDATE_QUANTITY` with negative quantity (auto-remove) untested         | Added test                               |
| CartContext | `REMOVE_ITEM` targeting nonexistent ID untested                         | Added test — confirms no-op              |
| CartContext | `CLEAR_CART` on already-empty cart untested                             | Added test — confirms no throw           |
| CartContext | Initial `totalPrice === 0` never asserted                               | Added test                               |
| Button      | `isLoading` blocks `onClick` was untested (only `disabled` was checked) | Added test                               |
| Button      | `aria-disabled` for `disabled` and `isLoading` props untested           | Added two tests                          |
| Button      | `type="button"` default missing from component entirely                 | Added test + fixed component             |
| CartSummary | Floating-point price (3 × $0.10) could silently render wrong            | Added test — `toFixed(2)` handles it     |
| CartSummary | Single-item count display untested                                      | Added test                               |

**Notable finding:** Claude identified that `Button.tsx` was missing `type="button"` as a
default prop entirely — without it, a button inside a form defaults to `type="submit"` and
triggers accidental form submissions. This was both a test gap and an actual component bug.
Claude added the test and fixed the component in the same pass.

**Edge cases I verified manually:** I reviewed each generated test individually to confirm
the assertions were testing meaningful behavior and not passing trivially. All tests were
confirmed correct before committing.
