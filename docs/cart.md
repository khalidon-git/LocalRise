# Cart

## Purpose

Let visitors collect à-la-carte services and send the selection as an enquiry.
It's a **lead-capture device, not e-commerce** — there is no checkout, no
payment, no persistence, no backend.

## Key files

| File | Role |
| --- | --- |
| `providers/CartProvider.tsx` | Context, state, `useCart()` |
| `components/cart/CartDrawer.tsx` | Slide-over drawer UI |
| `components/sections/IndividualServices.tsx` | The "Book Now" buttons |

## Data flow

```
IndividualServices ── addToCart(title, price) ──► CartProvider
                                                    │  (also opens the drawer)
                                                    ▼
                                              CartDrawer ── updateQuantity()
                                                    │        clearCart()
                                                    ▼
                                              WhatsApp message
```

## API

```ts
const { cart, isOpen, addToCart, updateQuantity, toggleCart, clearCart } = useCart();
```

| Member | Notes |
| --- | --- |
| `cart` | `CartItem[]` — `{ title, price, quantity }` |
| `isOpen` | Drawer visibility |
| `addToCart(title, price)` | Increments if present; **also opens the drawer** |
| `updateQuantity(title, delta)` | Removes the item when quantity hits 0 |
| `toggleCart(open)` | Explicit boolean, not a flip |
| `clearCart()` | Empties |

**Items are keyed by `title`**, not an id. It works because
`individualServices` titles are unique, but it's fragile — if you add duplicate
titles or make them editable, introduce a real id first.

**`addToCart` opening the drawer is intentional** (immediate feedback). If you
ever need silent adds, add a parameter rather than removing the behaviour —
callers depend on it.

## State is deliberately in-memory

The cart is **not** persisted. Reload = empty cart. That's a real decision, not
an oversight: a stale cart from last week is worse than an empty one for an
enquiry flow, and the value is low (nothing is paid for).

If you do add persistence, use sessionStorage and mirror the pattern in
[audio.md](./audio.md): read in an effect (never during render — it breaks the
static prerender), and wrap access in `try/catch`.

## Scroll lock

The drawer locks body scroll via `useScrollLock(isOpen)` — reference-counted, so
it can't fight the mobile menu.

> Previously `CartProvider` and `Nav` each wrote `document.body.style.overflow`
> and reset it to `""` on cleanup, so closing one overlay unlocked the page while
> the other was still open. Don't reintroduce direct `body.style` writes.
> See [hooks.md](./hooks.md).

## Submission

The drawer composes the cart into a prefilled `wa.me` message via
`startConversation()` in `lib/communication/` — the same channel-agnostic
entrypoint used by the contact form (`components/contact/ContactForm.tsx`) and
every other "start a conversation" CTA site-wide. There is no backend; the lead
lands in WhatsApp.

## Extending

**Add a cart icon with a count** → `useCart()` in `Nav`, sum `quantity`. The
context is already global; no prop drilling.

**Add discounts/totals** → put the maths in `CartProvider` (or `lib/`), not in
`CartDrawer`. Keep the drawer presentational. Use `formatINR()` from
`lib/utils.ts` for currency — never hand-roll `₹` formatting.

**Add real checkout** → this design stops being adequate. You'd need a backend,
which the static export (`output: "export"`) cannot provide. That's an
architecture change, not a feature. See [architecture.md](./architecture.md).
