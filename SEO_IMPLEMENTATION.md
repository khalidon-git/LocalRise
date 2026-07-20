# LocalRise SEO Implementation

## Architecture detected

LocalRise is a Next.js 14.2.15 App Router site using React 18 and `output: "export"`. Every public page is generated as static HTML with trailing-slash URLs and deployed to Hostinger shared hosting through the generated `deploy` branch.

The canonical production origin is `https://localrise.in`. SEO configuration lives in `lib/seo/`; factual service and business content remains in `lib/content/`.

## Changes implemented

- Centralized canonical URL, site identity, social-image and metadata generation.
- Set `lang="en-IN"`, `og:locale="en_IN"`, `og:site_name="LocalRise India"` and detailed index/follow robots directives.
- Added unique titles, descriptions and canonical URLs for primary pages and every service.
- Added exact India-focused homepage and primary-service H1s while preserving emotional marketing lines as supporting copy.
- Replaced the location-implying `ProfessionalService` schema with factual `Organization`, `WebSite` and homepage-only `WebPage` nodes.
- Added page-specific `Service`, `CollectionPage`, `CreativeWork`, `FAQPage` and breadcrumb schema where matching content is visible.
- Added safe JSON-LD serialization that removes empty values and escapes `<` and script-sensitive line characters.
- Removed generated-at-build `lastmod`, arbitrary priorities and change frequencies from the sitemap.
- Added explicit access for general, OpenAI search/training and Anthropic search/user/training crawlers without blocking assets.
- Added `llms.txt`, a web app manifest, branded 404 page, privacy policy and terms page.
- Replaced placeholder Calendly and legal links with truthful content/routes.
- Added descriptive related-service links and normalized internal links to final trailing-slash URLs.
- Updated Apache rules to redirect HTTP and `www` variants to HTTPS on the apex domain while preserving path and query strings.
- Improved hero LCP/reduced-motion behavior by server-rendering the poster before progressively mounting video.
- Added a 200×87 transparent display logo derived from the full-resolution master, reducing the shared logo transfer from about 160 KB to about 24 KB while keeping the master for schema.
- Added an artifact-level SEO verifier and an opt-in, explicit IndexNow submission utility.

## Environment variables

All values are optional and build-time or script-only. Never commit `.env` files or search-verification tokens.

```text
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
INDEXNOW_KEY=
```

- Google/Bing values are embedded only when present during `next build`; empty tags are not emitted.
- `INDEXNOW_KEY` is read only by `npm run indexnow:submit`. It is never sent to client JavaScript.
- The canonical site URL is intentionally a checked-in constant, not a runtime variable, because production has one approved origin and no runtime server.

## Local verification

```bash
npm run typecheck
npm run build
npm run seo:verify
```

The verifier inspects `out/` for primary routes, unique titles/descriptions, one H1, page-specific canonicals, `en-IN`, robots directives, social images, valid JSON-LD, sitemap hygiene, crawl files, placeholder URLs and development-domain leakage.

## Google Search Console

1. Add `localrise.in` as a **Domain property**.
2. Verify ownership with the DNS TXT record supplied by Google. DNS is preferred because it covers HTTP/HTTPS and all subdomains.
3. Submit `https://localrise.in/sitemap.xml`.
4. Inspect the homepage, Why Us, Concepts and each primary service URL.
5. After deployment, use **Test live URL**, then request indexing for materially changed pages.
6. Review Page Indexing, Sitemaps and Crawl Stats after Google recrawls the site.

The optional HTML verification variable is available when DNS verification is not practical, but DNS remains preferred.

## Bing Webmaster Tools

1. Import the verified Search Console property or add `localrise.in` directly.
2. Complete Bing's verification flow (DNS preferred).
3. Submit `https://localrise.in/sitemap.xml`.
4. Use URL Inspection and the robots tester for primary pages.
5. Review crawl errors and excluded URLs after deployment.

## IndexNow

IndexNow is intentionally an explicit deployment/owner action, not an API route or page-view call.

1. Generate an IndexNow key using the official provider instructions.
2. Set `INDEXNOW_KEY` in the local shell or secure deployment environment.
3. Create `public/<key>.txt` containing only the same key and deploy it. The IndexNow verification key is intentionally public; this verification file may be committed so the GitHub build can publish it. Do not place unrelated credentials in it.
4. Submit only URLs whose content materially changed:

```bash
npm run indexnow:submit -- https://localrise.in/services/websites/
```

The script rejects URLs with credentials, queries or fragments, URLs absent from the generated sitemap, missing verification files and calls with no explicit changed URLs.

## Live testing URLs

- `https://localrise.in/robots.txt`
- `https://localrise.in/sitemap.xml`
- `https://localrise.in/llms.txt`
- `https://localrise.in/manifest.webmanifest`

## Remaining owner actions

1. Push the reviewed source to `main`, confirm the GitHub Action updates `deploy`, then manually redeploy in Hostinger hPanel.
2. Verify the HTTP and `www` variants return one 301 to the equivalent HTTPS apex URL.
3. Confirm primary pages return 200, unknown URLs return 404, and crawl files return 200 with correct content types.
4. Run Google Rich Results Test and Schema.org Validator on the homepage, a service page, FAQ and a concept detail page.
5. Run PageSpeed Insights/Lighthouse on mobile and desktop; monitor field Core Web Vitals before considering larger Swiper/cart architecture changes.
6. Test the Open Graph image by sharing a production URL in WhatsApp or another social preview debugger.
7. Create/verify Search Console and Bing properties, submit the sitemap and request indexing.
8. If analytics identifiers are enabled later, add an appropriate consent mechanism and update the privacy notice before deployment.

Code correctness and crawl readiness can be verified locally. Search indexing, rich-result eligibility, crawler access through Hostinger and rankings can only be confirmed after deployment and are never guaranteed.
