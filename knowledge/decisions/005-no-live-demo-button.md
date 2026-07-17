# ADR-005 — No "Live Demo" button; the detail page *is* the demo

**Date**: 2026-07-17 · **Status**: Superseded by [ADR-007](./007-concept-live-sites.md)

> Real, browsable live sites now exist at `/concepts/[slug]/live/` — this
> decision's *reasoning* (a button that opens nothing is a lie) still holds and
> explains why the feature took this long to ship honestly. Read
> [ADR-007](./007-concept-live-sites.md) for what changed and why it was safe to change.

## Context

The Concept Websites brief specified a **"Live Demo" button** per concept.

A real live demo requires the fictional site to *exist* — a complete browsable
website per concept. Six concepts = six sites.

## Decision

No "Live Demo" button. The **detail page is the demo**: a large code-rendered
desktop preview plus the phone view, alongside features, design notes and CTAs.

## Why

**A button that opens nothing is a lie**, and this site's entire positioning is
built on not lying ([ADR-004](./004-honest-content-policy.md)). The options were:
build six real sites (weeks), link to a dead URL (dishonest), or label the detail
page "Live Demo" (misleading).

Shipping the full section now, honestly, beats shipping a promise later.

## Alternatives

| Option | Why not |
| --- | --- |
| Build 6 fictional sites | Weeks of work. Viable *later*, one at a time. |
| Dead/`#` link | Dishonest; undermines the trust the site trades on |
| Label the detail page "Live Demo" | Technically defensible, still overselling |

## Trade-offs

- **Cost**: less impressive than a browsable site. A mockup is not a demo.
- **Benefit**: the whole section shipped, and every claim on it is true.

## Future

Real demos at `/concepts/[slug]/demo` remain viable. Scope **one concept at a
time** — each is a full fictional site. Only then does a "Live Demo" button
become honest, and only for concepts that actually have one.

## Implications

Do not add a "Live Demo" button until a real demo exists behind it. If a partial
rollout happens, the button must appear **only** on concepts with a live demo —
never as a global element pointing somewhere approximate.
