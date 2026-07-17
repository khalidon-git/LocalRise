# Subagents

Specialised agents for LocalRise, scoped to this codebase's real stack (Next.js 14
static export, React 18, Tailwind 3.4, Framer Motion 11) and its hard invariants
(see `docs/` and `knowledge/`). Each has a narrow responsibility so multiple can run
in parallel with minimal context and low overlap.

Claude selects an agent automatically from its `description`; you can also invoke one
explicitly ("use the code-reviewer to check this diff").

| Agent | Owns | Edits code? |
| --- | --- | --- |
| **project-architect** | Whole-system planning, convention enforcement, delegation | Small integrating edits only |
| **content-architect** | Section inventory, page order/flow, `lib/content` shape | Yes (structure) |
| **ui-builder** | Sections, primitives, responsive Tailwind markup | Yes |
| **nextjs-expert** | Routing, metadata, JSON-LD, sitemap, config, static-export | Yes |
| **animation-specialist** | Framer Motion + Tailwind keyframes, reduced-motion | Yes |
| **seo-copywriter** | Copy, CTAs, metadata & structured-data text (honest-content) | Yes (`lib/content`) |
| **performance-optimizer** | CWV, client/server boundaries, payload | Yes (targeted) |
| **refactor-engineer** | Dedup, simplify, extract — behaviour preserved | Yes |
| **design-reviewer** | Visual/UX/accessibility review | No (report only) |
| **code-reviewer** | TS/security/correctness/invariant review | No (report only) |

## Typical flows
- **New section**: content-architect (slot + rationale) → seo-copywriter (copy) →
  ui-builder (markup) → animation-specialist (motion) → design-reviewer + code-reviewer.
- **Any change**: finish with **code-reviewer** (correctness/invariants) and, for UI,
  **design-reviewer** (a11y/consistency) before commit.
- **Big/cross-cutting request**: start with **project-architect** to decompose and route.

Editing these agents: keep each one narrow. Overlap is the thing to avoid — if two
agents could both own a task, tighten their scopes rather than duplicating rules.
