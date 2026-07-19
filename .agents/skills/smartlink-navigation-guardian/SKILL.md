---
name: smartlink-navigation-guardian
description: Protect LocalRise navigation and audio continuity. Use when editing links, buttons, nav, footer, cards, CTAs, route paths, `SmartLink`, `Button`, `Nav`, `SiteChrome`, or any component that can navigate internally. Replace raw internal anchors with `SmartLink` or `Button href`. Do not use for external-only links unless they affect shared link components.
---

# SmartLink Navigation Guardian

## Workflow

1. Read `docs/navigation.md`, `docs/audio.md`, and `knowledge/bugs/001-raw-anchor-destroys-audio.md`.
2. Inspect changed components for internal navigation paths.
3. Use `SmartLink` or the project `Button href` API for internal links. Raw `<a>` is acceptable only for external URLs, downloads, anchors intentionally handled as non-route behavior, or low-level primitives that delegate to `SmartLink`.
4. Preserve audio/session continuity by avoiding full document reloads for internal navigation.
5. Check for raw internal anchors with a source search such as `rg '<a[^>]+href="/' app components`.
6. Run `npm run typecheck`; run `npm run build` if route paths, pages, layout, metadata, or sitemap behavior changed.

## Review Checklist

- Confirm internal CTAs use project link primitives.
- Confirm external links with `target="_blank"` include `rel="noopener"`.
- Confirm no link change bypasses WhatsApp message helpers or tracking helpers.
- Confirm any new route target exists under static export rules.

## Output

Report links audited, replacements made, search command results, and any navigation behavior that still needs browser verification.
