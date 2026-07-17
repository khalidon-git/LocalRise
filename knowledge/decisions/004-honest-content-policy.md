# ADR-004 — Never fabricate social proof, results, or business facts

**Date**: 2026-07-16 → ongoing · **Status**: Accepted · **Non-negotiable**

## Context

LocalRise is a young studio with no clients yet. Marketing sites in this position
routinely invent testimonials, stock-photo "clients", and metrics like
"3× more leads". Audit tools and schema validators actively *encourage* some of
it (e.g. "LocalBusiness is missing `address`").

## Decision

Nothing on this site claims something that didn't happen.

| Applied to | Decision |
| --- | --- |
| Testimonials | No fake quotes. A "founding partner" offer with honest placeholders shipped instead — later removed entirely rather than filled in. |
| Portfolio / concepts | Fictional sites, badged **"Design Concept"**, stated as fictional in prose *and* in `CreativeWork.abstract`. Schema is `CreativeWork`, never portfolio/`Review` markup that would imply clients. |
| Metrics | None. No "3× bookings", no invented percentages. |
| `LocalBusiness.address` | **Deliberately absent.** No public storefront exists. |
| Client logos | None — we have no clients. |

## Why the `address` case matters most

A validator flags the missing `address` and it is *tempting* to add one. Doing so
would **fabricate a business fact** to satisfy a linter — violating Google's
guidelines and risking the exact local visibility it's meant to gain.
`areaServed: "IN"` with no address is the honest representation of a
service-area business.

> The real lever for local visibility is a **verified Google Business Profile**,
> not schema. Tools measure markup; they cannot measure truth. **A warning is not
> an instruction.**

## Alternatives

| Option | Why not |
| --- | --- |
| Placeholder testimonials ("Coming soon" quotes) | Reads as fake anyway; the honest version converted better as a *founding partner* offer |
| Stock-photo clients | Dishonest, and instantly recognisable as stock |
| Satisfy every validator | Would require inventing facts |

## Trade-offs

- **Cost**: weaker social proof than competitors who fabricate. Some audit scores
  stay red permanently.
- **Benefit**: nothing to walk back when real clients arrive; the honesty is
  itself a differentiator for a trust-driven local audience.

## Implications

Any future contributor — human or AI — must not "fix" these gaps by inventing
content. When real clients exist, replace concepts with **real, permitted**
material. Don't loosen the rule.

Encoded in [content.md](../../docs/content.md) and
[concepts.md](../../docs/concepts.md).
