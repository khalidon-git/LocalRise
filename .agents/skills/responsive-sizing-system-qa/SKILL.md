---
name: responsive-sizing-system-qa
description: Audit, implement, and verify a coherent responsive sizing system across a website. Use for cross-page requests involving containers, section rhythm, typography, cards, media, controls, grids, mobile reflow, overflow, or viewport-wide visual QA. Do not use for an isolated styling tweak with no reusable sizing pattern or for copy-only changes.
---

# Responsive Sizing System QA

Standardize proportions through the existing design-system seams, then verify the rendered site rather than patching isolated components with one-off values.

## Inputs

- Target routes and supported viewport widths.
- Existing tokens, global styles, layout primitives, and component variants.
- Product constraints for content, navigation, accessibility, performance, and deployment.

## Workflow

1. Record the dirty worktree and read project architecture and design-system rules.
2. Inventory fixed dimensions, arbitrary values, duplicated spacing, tiny real-interface text, uncontrolled media, rigid grids, and overflow risks. Distinguish source asset resolution from rendered size.
3. Capture representative baseline views before editing. Include the smallest mobile, tablet, laptop, and wide desktop widths.
4. Extend the existing system rather than adding a competing one. Prefer:
   - a capped fluid page container;
   - compact, standard, spacious, and hero section recipes;
   - a small semantic card family;
   - shared media aspect ratios and object-fit rules;
   - fluid type tokens with readable minimums;
   - controls with at least a 44px comfortable target;
   - CSS Grid, `minmax()`, and content-driven height over viewport JavaScript.
5. Migrate shared primitives first, then homepage and chrome, secondary pages, and specialized presentation namespaces.
6. Recompose narrow layouts. Do not shrink desktop arrangements or text merely to make them fit.
7. Keep genuine exceptions explicit. Miniature screenshot/mockup typography may remain tiny because the entire surface is scaled; real page labels and controls may not.
8. Verify every requested width in a real browser after content has entered the viewport. Check horizontal overflow, keyboard focus, overlay reachability, touch targets, reduced motion, short landscape height, zoom, and long content.
9. Run the project typecheck and production/static build. Search for forbidden navigation, dynamic utility classes, and untracked build artifacts when those invariants apply.

## Required Outputs

- The reusable sizing tokens and recipes introduced or refined.
- Components and routes migrated.
- Baseline problems and intentional exceptions.
- Automated check results and browser widths inspected.
- Unverified behavior, manual follow-up, and remaining risks.

## Stop Conditions

Stop and report before changing API contracts, auth, payment behavior, production configuration, or deployment architecture. Ask for direction if the requested visual result requires deleting meaningful content or changing established product behavior.
