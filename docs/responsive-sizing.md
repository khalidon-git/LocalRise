# Responsive sizing

LocalRise uses one fluid sizing system for the marketing shell and content sections. It extends the existing Tailwind theme and global helpers; components should not introduce a parallel spacing scale.

## Foundations

- `container-x` is full-width up to `1280px`, with a fluid gutter from `16px` to `32px`.
- Typography tokens in `tailwind.config.ts` use `clamp()` for display, heading, and large body text. Normal paragraphs should stay within `max-w-reading` (`68ch`) or `max-w-prose`.
- Controls are `48px` (`md`) or `54px` (`lg`). Standalone icon controls must retain at least a `44px` target.
- Safe-area helpers keep fixed controls and mobile drawers clear of device insets.

## Section recipes

| Recipe | Use | Fluid range |
| --- | --- | --- |
| `section-compact` | Trust strips and tightly related supporting content | `40–64px` |
| `section-pad` | Default marketing sections | `56–96px` |
| `section-spacious` | Deliberate narrative or high-emphasis breaks | `72–120px` |
| `section-hero` | Above-the-fold content with navigation clearance | independent fluid top and bottom padding |

`section-pad` remains the standard recipe for compatibility with existing sections. A section should select one recipe rather than assemble breakpoint-specific vertical padding.

## Cards and grids

- `card-standard`: general service or informational card with fluid `20–28px` padding.
- `card-feature`: compact benefit card with fluid `18–24px` padding.
- `card-package`: pricing surface with the standard card padding and package-specific composition.
- `card-media`: shared `16 / 10` visual frame. Media fills this frame; use `cover` for photography and `contain` for complete UI/artwork.
- `card-grid`: auto-fitting cards with a practical `320px` target minimum.
- `feature-grid`: auto-fitting compact cards with a practical `240px` target minimum.

Cards remain content-height unless sibling alignment or a CTA rail explicitly requires stretching.

## Responsive composition

- Mobile layouts start as one readable column. CTAs may become full-width below `sm`.
- Horizontal carousels use an `86%` mobile basis to reveal the next card, approximately two cards on small tablets, and three cards at `lg`.
- Wide layouts use `minmax(0, 1fr)` so long content cannot force horizontal page overflow.
- Decorative artwork is bounded by semantic max-width tokens (`max-w-media`, card widths) instead of source-image dimensions.

## Exceptions

Small fixed values remain valid for icons, hairlines, animation bars, and artwork alignment where their physical size is the design. Brand colors and shadow recipes may also use literal values. These are not layout dimensions and should not be promoted into page-level sizing tokens.

## Review checklist

Check `360`, `390`, `430`, `768`, `1024`, `1280`, and `1440px` widths. Confirm no page overflow, headings do not create orphaned words, controls remain at least `44px`, media ratios remain stable, carousel affordances are visible, and fixed controls clear safe areas. Verify at browser zoom and with reduced motion enabled.
