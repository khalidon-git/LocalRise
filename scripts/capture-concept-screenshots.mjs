// ---------------------------------------------------------------------------
// Regenerates public/concepts-shots/<slug>-{desktop,mobile}.jpg — the real
// screenshots shown in the homepage "Built around your kind of business"
// panel (components/sections/Industries.tsx) and available for reuse
// wherever a concept needs a real (not code-rendered) preview.
//
// These are STATIC CAPTURES, not generated at build time. If a concept's
// copy, theme, or layout changes in lib/content/conceptSites.ts, its
// screenshot goes stale silently — nothing will warn you. Re-run this
// script after any change that would visibly alter a live concept page.
//
// Playwright is NOT a project dependency — install it, run this, then
// remove it (same pattern as the ffmpeg-static audio recipe in
// docs/deployment.md):
//
//   npm i -D playwright
//   npx playwright install chromium
//   npm run dev &                # needs the dev server up on :3000
//   node scripts/capture-concept-screenshots.mjs
//   npm uninstall playwright
// ---------------------------------------------------------------------------

import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "concepts-shots");
mkdirSync(outDir, { recursive: true });

// Keep this in sync with the `slug` values in lib/content/concepts.ts.
const slugs = [
  "noir-and-vine",
  "meridian-dental",
  "casa-alma",
  "ashford-vale",
  "forge-performance",
  "maison-rile",
  "atelier-norlind",
  "kessler-bright",
  "flowstack",
  "golden-hour",
];

const browser = await chromium.launch({ args: ["--no-sandbox"] });

async function capture(slug, viewport, suffix) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:3000/concepts/${slug}/live/`, { waitUntil: "load" });
  // Let the hero image finish loading and its entrance animation settle.
  try {
    await page.locator("img").first().waitFor({ state: "visible", timeout: 8000 });
  } catch {
    /* SaaS concept has no hero image — nothing to wait for */
  }
  await page.waitForTimeout(1600);
  await page.screenshot({ path: join(outDir, `${slug}-${suffix}.jpg`), type: "jpeg", quality: 78 });
  await page.close();
  console.log(`captured ${slug}-${suffix}`);
}

for (const slug of slugs) {
  await capture(slug, { width: 1120, height: 720 }, "desktop");
  await capture(slug, { width: 390, height: 780 }, "mobile");
}

await browser.close();
console.log("Done. Review the diff in public/concepts-shots/ before committing.");
