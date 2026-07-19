# Repository structure

The exhaustive map: every top-level folder, what belongs where, naming and
import conventions, and what must never be committed. For the *why* behind
the shape (and why it deliberately isn't a `features/`/`services/` enterprise
scaffold), see [architecture.md](./architecture.md) and
[ADR-001](../knowledge/decisions/001-right-sized-architecture.md).

## Top-level folders

```
app/                 Next.js App Router — every route in the site
components/          React components, grouped by role (see below)
providers/           React context + the engines behind them (audio, cart)
hooks/               Small reusable hooks (useScrollLock, useCarousel)
lib/                 Content, cross-cutting logic, small single-purpose modules
public/              Served as-is by the static export — everything here ships
assets/              Committed SOURCE files public/ assets are derived from — not served
temp/                Intake-only staging folder — always empty besides its README
docs/                How the systems work — onboarding for humans and agents
knowledge/           Why things are the way they are, and what already broke
scripts/             One-off/on-demand tooling (image & screenshot capture)
marketing/           Non-code planning docs (roadmap, ad strategy, keywords)
types/               Ambient TypeScript declarations (e.g. gtag.d.ts)
.agents/skills/       Reusable agent workflows — see .agents/skills/REGISTRY.md
.claude/agents/       Claude Code subagent definitions
.codex/agents/        The same subagents, as Codex agent configs
.github/workflows/    CI — builds and publishes the `deploy` branch
```

Root-level config: `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`,
`postcss.config.mjs`, `package.json`. Root-level docs: `README.md` (start
here), `CLAUDE.md` / `AGENTS.md` (agent working instructions — kept in sync;
one per agent framework, not duplicated by accident).

## `app/` — routes

One folder per route; a `page.tsx` per route; `[slug]` folders use
`generateStaticParams` (required for static export — see
[architecture.md](./architecture.md)).

| Route | File |
| --- | --- |
| `/` | `app/page.tsx` |
| `/why-us/` | `app/why-us/page.tsx` |
| `/contact/` | `app/contact/page.tsx` |
| `/services/[slug]/` | `app/services/[slug]/page.tsx` |
| `/concepts/`, `/concepts/[slug]/`, `/concepts/[slug]/live/` | `app/concepts/**` — see [concepts.md](./concepts.md) |
| `/lp/website-design/` | `app/lp/website-design/page.tsx` — a standalone ads landing page, not linked from nav |

Plus `layout.tsx` (root layout — metadata, JSON-LD, providers, chrome; must
stay a server component), `globals.css`, `icon.svg`, `sitemap.ts`, `robots.ts`,
`opengraph-image.png`.

**New route** → new folder here, content in `lib/content/`, composed from
`components/sections/`.

## `components/` — grouped by role, not by page

| Folder | Holds |
| --- | --- |
| `ui/` | Primitives used across the whole site: `Button`, `SmartLink`, `Icon`, `Logo`, `Reveal`/`Stagger`, `Magnetic`, `SectionHeading`, `ConversationButton` |
| `layout/` | Site chrome the root layout renders: `Nav`, `Footer`, `WhatsAppButton`, `SiteChrome` |
| `sections/` | Homepage and service-page content blocks (`Hero`, `Packages`, `IndividualServices`, `FeaturedConcepts`, `Process`, `FAQ`, …) |
| `illustrations/` | Code-rendered or inline-SVG artwork: `BrowserMock`, `ServiceVisual`, `SpotScenes`, `HeroVideo` |
| `concepts/` | Concept Websites card + real-screenshot preview: `ConceptCard`, `ScreenshotMock`, `ScreenshotPhone` |
| `live/` | The Concept Websites "live site" rendering engine (`LiveNav`, `LiveHero`, … `LiveSite` orchestrates) — see [concepts.md](./concepts.md) |
| `contact/` | The `/contact/` page's own sections: `ContactHero`, `ContactForm`, `ContactMethods`, `ContactWhatsAppCard` |
| `cart/` | `CartDrawer` |
| `audio/` | `AudioToggle` (UI only — the engine is `providers/AudioProvider`) |
| `onboarding/` | `WelcomeModal` |
| `analytics/` | `GoogleTag` (the `gtag.js` loader) |

**New primitive** → `components/ui/`, only if used in 2+ places. **New
section** → `components/sections/`, composed into a route in `app/`. A
component used by exactly one other component can live next to it (e.g. an
illustration used by one section) — don't create a folder for a single file
unless it's a genuinely separate domain (the way `concepts/`, `live/`, and
`contact/` are).

## `providers/` and `hooks/`

Context + the stateful logic behind it (`AudioProvider`, `CartProvider`) live
in `providers/`, mounted in the root layout — order matters, see
[providers.md](./providers.md). Pure, reusable logic with no context lives in
`hooks/` (`useScrollLock`, `useCarousel`). This is the "engine vs
presentation" split noted in [architecture.md](./architecture.md): the
provider/hook owns the logic, the component only renders.

## `lib/` — content and cross-cutting logic

| Path | Holds |
| --- | --- |
| `content/` | All site copy — pricing, services, FAQs, concepts, brand info — split by domain, re-exported via `content/index.ts`. Import as `@/lib/content`, never a specific file inside it. |
| `communication/` | The single "start a conversation" entrypoint (WhatsApp today) every CTA site-wide goes through |
| `analytics/` | GA4 / Google Ads config |
| `utils.ts` | `cx()`, `formatINR()` |
| `palette.ts` | Rotating brand gradients |
| `navigation.ts` | `isInternalHref()` — what `SmartLink` uses to decide `next/link` vs a plain anchor |
| `onboarding.ts` | The welcome-modal's localStorage preference |

Small, single-purpose modules stay flat at `lib/` root (camelCase filenames);
a domain with several related files gets its own subfolder with an
`index.ts` barrel. **New content type** → a file in `lib/content/`,
re-exported from `index.ts`.

## `public/` vs `assets/` vs `temp/` — the three states of a media file

| Folder | What | Served? | Committed? |
| --- | --- | --- | --- |
| `temp/` | A new file, just handed off, not yet processed | No | No (gitignored except `README.md`) |
| `assets/originals/` | The full-quality source, kept for future reprocessing | No | Yes |
| `public/` | The resized/compressed/optimized file the site actually uses | **Yes** | Yes |

A new photo or video always starts in `temp/`. Once processed into
`public/`, the original either moves to `assets/originals/` (if worth keeping
for a future re-crop or re-encode) or is discarded. See `temp/README.md` and
`assets/README.md` for the exact steps.

## `docs/` vs `knowledge/`

`docs/` explains **how a system works today** — read before touching it.
`knowledge/` explains **why it's built that way and what already broke** —
`knowledge/bugs/` are post-mortems, `knowledge/decisions/` are ADRs,
`knowledge/tech-debt.md` is the known-but-deferred backlog. See both
`README.md` files for the full index and the rules for adding an entry.
[ADR-006](../knowledge/decisions/006-docs-structure.md) is why the split is
flat files, not nested categories.

**New doc** → `docs/<topic>.md`, add a row to `docs/README.md`'s table.
**New bug post-mortem or ADR** → next number in `knowledge/bugs/` or
`knowledge/decisions/`, linked from `knowledge/README.md`.

## `scripts/`

On-demand tooling that isn't a project dependency — installed, run, then
uninstalled (the pattern both `scripts/capture-concept-screenshots.mjs` and
the `ffmpeg-static` audio recipe in [deployment.md](./deployment.md) follow).
Not a build step; nothing here runs automatically.

## `.agents/skills/`, `.claude/agents/`, `.codex/agents/`

Two agent frameworks, kept in parallel: `.claude/agents/*.md` and
`.codex/agents/*.toml` define the same ten specialist subagents (one file
pair per agent — see either directory's contents for the current list).
`.agents/skills/` holds reusable multi-step workflows shared by both
frameworks; `.agents/skills/REGISTRY.md` is the index and must be updated
whenever a skill is added, changed, merged, or retired.

## Naming and import conventions

- **Import alias**: `@/*` → repo root. Always `@/components/...`, never
  `../../`.
- **Components**: PascalCase filename matching the component name; export a
  named export **and** a `default` (import the named one).
- **Non-component modules** (hooks, utils, content, types): camelCase
  filenames (`useCarousel.ts`, `liveTheme.ts`, `navigation.ts`).
- **`"use client"`** only where state/effects/context/Framer Motion require
  it — sections that are pure markup stay server components.
- **Content lives in `lib/content`**, never hard-coded in a component.
- **Comments explain *why***, not what — don't narrate the code.
- Media filenames are kebab-case, no spaces, and descriptive
  (`whatsapp-business-setup.jpeg`, not `whatapp business setup.jpeg`).

## Generated — never commit

These are rebuilt from source and must stay out of git (enforced by
`.gitignore`; `out/` was committed by accident once —
[BUG-006](../knowledge/bugs/006-build-artifacts-tracked.md)):

- `.next/`, `out/` — build output
- `node_modules/`
- `*.tsbuildinfo`, `next-env.d.ts` — TypeScript/Next generated files
- `.playwright-cli/`, `output/` — ad-hoc local QA screenshots/logs from
  browser-driven verification sessions; regenerate them anytime, never check
  them in
- `.claude/settings.local.json` — per-machine Claude Code settings
- `temp/*` (except `temp/README.md`) — intake staging, not permanent storage
- The `deploy` branch itself — force-pushed by CI on every build to `main`;
  never commit to it by hand (see [deployment.md](./deployment.md))
