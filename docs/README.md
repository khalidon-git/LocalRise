# LocalRise — System Documentation

Onboarding guides for developers and AI assistants working on this codebase.
Each file explains one system: its purpose, architecture, key files, data flow,
and how to extend it safely.

## Read this first

| Doc | What it covers |
| --- | --- |
| [architecture.md](./architecture.md) | Folder layout, conventions, why it's shaped this way |
| [providers.md](./providers.md) | React context layer, provider order, why it lives at the root |
| [audio.md](./audio.md) | The narration engine — the most subtle system here |
| [onboarding.md](./onboarding.md) | First-visit welcome modal and the consent gate |
| [navigation.md](./navigation.md) | Routing, SmartLink, and why raw `<a>` is banned internally |
| [cart.md](./cart.md) | Cart context and drawer |
| [concepts.md](./concepts.md) | Concept Websites — fictional showcase sites |
| [hooks.md](./hooks.md) | `useScrollLock`, `useCarousel` |
| [animations.md](./animations.md) | Framer Motion patterns, Tailwind keyframes, reduced motion |
| [content.md](./content.md) | `lib/content` — the single source of site copy |
| [seo.md](./seo.md) | Metadata, JSON-LD, sitemap, robots |
| [seo-audit.md](./seo-audit.md) | Audit findings + prioritised remediation plan |
| [responsive-sizing.md](./responsive-sizing.md) | The fluid spacing/typography system — section recipes, card padding, breakpoints |
| [deployment.md](./deployment.md) | Hostinger, the `deploy` branch, and a real size limit |
| [changelog.md](./changelog.md) | Notable changes, newest first, with the *why* |
| [repository-structure.md](./repository-structure.md) | Full folder-by-folder map, naming/import conventions, where new files belong |

## The five things that bite newcomers

1. **This is Next.js 14 + React 18** — not 15/19. Don't apply Next 15 idioms
   (async `params`, `useActionState`). See [architecture.md](./architecture.md).
2. **Never use a raw `<a href="/...">` for an internal link.** It triggers a full
   page load, which destroys the audio engine. Use `SmartLink`.
   See [navigation.md](./navigation.md).
3. **The site is a static export** (`output: "export"`). No server, no API routes,
   no runtime env vars, no image optimisation.
4. **Audio may only start from a user gesture.** Browsers block it otherwise. This
   is why the welcome modal exists. See [audio.md](./audio.md).
5. **Tailwind arbitrary colours must be literal strings** in source. Building class
   names dynamically (`` `from-[${c}]` ``) silently produces no CSS.
   See [content.md](./content.md).

## Quick reference

```bash
npm run dev     # local dev
npm run build   # static export → out/
```

- Live site: https://localrise.in
- Deploy: push to `main` → GitHub Action builds the `deploy` branch → click
  **Redeploy** in Hostinger hPanel. See [deployment.md](./deployment.md).
