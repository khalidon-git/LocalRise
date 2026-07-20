import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "out");
const origin = "https://localrise.in";

const expected = new Map([
  ["/", "LocalRise India | Websites, Google & WhatsApp Growth"],
  ["/why-us/", "Why Choose LocalRise India for Your Business Website"],
  ["/concepts/", "Website Design Concepts for Local Businesses | LocalRise"],
  ["/services/websites/", "Website Design for Small Businesses in India | LocalRise"],
  ["/services/google/", "Google Business Profile Setup in India | LocalRise"],
  ["/services/whatsapp/", "WhatsApp Business Setup for Small Businesses | LocalRise"],
  ["/services/store/", "Ecommerce Website Development in India | LocalRise"],
  ["/services/logo/", "Logo and Branding Design for Small Businesses | LocalRise"],
  ["/contact/", "Contact LocalRise India | Free Business Consultation"],
  ["/process/", "Our Website and Digital Service Process | LocalRise India"],
  ["/faq/", "LocalRise India FAQs | Websites, Google and WhatsApp"],
  ["/privacy-policy/", "Privacy Policy | LocalRise India"],
  ["/terms/", "Terms of Service | LocalRise India"],
]);

const errors = [];
const titles = new Map();
const descriptions = new Map();
let sitemapPageCount = 0;

function htmlPath(route) {
  return route === "/" ? join(out, "index.html") : join(out, route.slice(1), "index.html");
}

function match(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? "";
}

function decode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function validateJsonLd(html, route) {
  const definitionIds = new Set();
  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const value = JSON.parse(script[1]);
      const visit = (item) => {
        if (Array.isArray(item)) {
          item.forEach(visit);
          return;
        }
        if (!item || typeof item !== "object") return;
        if (typeof item["@id"] === "string" && (item["@type"] || Object.keys(item).length > 1)) {
          if (definitionIds.has(item["@id"])) errors.push(`${route}: duplicate JSON-LD definition ${item["@id"]}`);
          definitionIds.add(item["@id"]);
        }
        Object.values(item).forEach(visit);
      };
      visit(value);
    } catch (error) {
      errors.push(`${route}: invalid JSON-LD (${error.message})`);
    }
  }
}

for (const [route, expectedTitle] of expected) {
  const file = htmlPath(route);
  if (!existsSync(file)) {
    errors.push(`${route}: missing ${file}`);
    continue;
  }

  const html = readFileSync(file, "utf8");
  const title = decode(match(html, /<title>([^<]*)<\/title>/i));
  const description = decode(match(html, /<meta name="description" content="([^"]*)"/i));
  const canonical = match(html, /<link rel="canonical" href="([^"]*)"/i);
  const robots = match(html, /<meta name="robots" content="([^"]*)"/i);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const expectedCanonical = `${origin}${route}`;

  if (title !== expectedTitle) errors.push(`${route}: title was "${title}"`);
  if (!description) errors.push(`${route}: missing description`);
  if (canonical !== expectedCanonical) errors.push(`${route}: canonical was "${canonical}"`);
  if (!html.includes('<html lang="en-IN"')) errors.push(`${route}: html lang is not en-IN`);
  if (h1Count !== 1) errors.push(`${route}: expected one H1, found ${h1Count}`);
  for (const directive of ["index", "follow", "max-image-preview:large", "max-snippet:-1", "max-video-preview:-1"]) {
    if (!robots.includes(directive)) errors.push(`${route}: robots missing ${directive}`);
  }
  if (!html.includes('property="og:image"')) errors.push(`${route}: missing og:image`);
  if (!html.includes('name="twitter:image"')) errors.push(`${route}: missing twitter:image`);
  if ((html.match(/<meta name="robots"/gi) ?? []).length !== 1) errors.push(`${route}: expected one robots meta tag`);

  if (titles.has(title)) errors.push(`${route}: duplicate title with ${titles.get(title)}`);
  if (descriptions.has(description)) errors.push(`${route}: duplicate description with ${descriptions.get(description)}`);
  titles.set(title, route);
  descriptions.set(description, route);
}

for (const file of ["robots.txt", "sitemap.xml", "llms.txt", "manifest.webmanifest", "404.html"]) {
  if (!existsSync(join(out, file))) errors.push(`missing out/${file}`);
}

if (existsSync(join(out, "sitemap.xml"))) {
  const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  sitemapPageCount = urls.length;
  const sitemapTitles = new Map();
  const sitemapDescriptions = new Map();
  for (const url of urls) {
    if (!url.startsWith(origin) || !url.endsWith("/")) errors.push(`sitemap has non-canonical URL ${url}`);
    const route = new URL(url).pathname;
    const file = htmlPath(route);
    if (!existsSync(file)) {
      errors.push(`sitemap URL has no static artifact: ${route}`);
      continue;
    }
    const html = readFileSync(file, "utf8");
    const title = decode(match(html, /<title>([^<]*)<\/title>/i));
    const description = decode(match(html, /<meta name="description" content="([^"]*)"/i));
    const canonical = match(html, /<link rel="canonical" href="([^"]*)"/i);
    const robots = match(html, /<meta name="robots" content="([^"]*)"/i);
    const ogUrl = match(html, /<meta property="og:url" content="([^"]*)"/i);
    const ogTitle = decode(match(html, /<meta property="og:title" content="([^"]*)"/i));
    const ogDescription = decode(match(html, /<meta property="og:description" content="([^"]*)"/i));
    const twitterTitle = decode(match(html, /<meta name="twitter:title" content="([^"]*)"/i));
    const twitterDescription = decode(match(html, /<meta name="twitter:description" content="([^"]*)"/i));
    if (!title || !description) errors.push(`${route}: sitemap page lacks title or description`);
    if (canonical !== url) errors.push(`${route}: sitemap/canonical mismatch (${canonical})`);
    if ((html.match(/<h1\b/gi) ?? []).length !== 1) errors.push(`${route}: sitemap page must have one H1`);
    if (!robots.includes("index") || robots.includes("noindex")) errors.push(`${route}: sitemap page is not indexable`);
    if (!html.includes('property="og:image"') || !html.includes('name="twitter:image"')) errors.push(`${route}: sitemap page lacks social image metadata`);
    if (ogUrl !== url) errors.push(`${route}: og:url does not match canonical`);
    if (ogTitle !== title || twitterTitle !== title) errors.push(`${route}: social title does not match page title`);
    if (ogDescription !== description || twitterDescription !== description) errors.push(`${route}: social description does not match meta description`);
    if ((html.match(/<meta name="robots"/gi) ?? []).length !== 1) errors.push(`${route}: expected one robots meta tag`);
    validateJsonLd(html, route);
    if (sitemapTitles.has(title)) errors.push(`${route}: duplicate sitemap title with ${sitemapTitles.get(title)}`);
    if (sitemapDescriptions.has(description)) errors.push(`${route}: duplicate sitemap description with ${sitemapDescriptions.get(description)}`);
    sitemapTitles.set(title, route);
    sitemapDescriptions.set(description, route);
  }
  for (const forbidden of ["/lp/", "/live/", "/404", "localhost", "www.localrise.in"]) {
    if (sitemap.includes(forbidden)) errors.push(`sitemap contains ${forbidden}`);
  }
}

const noindexPages = [["/lp/website-design/", "/services/websites/"]];
const conceptsDir = join(out, "concepts");
if (existsSync(conceptsDir)) {
  for (const entry of readdirSync(conceptsDir, { withFileTypes: true })) {
    if (entry.isDirectory() && existsSync(join(conceptsDir, entry.name, "live", "index.html"))) {
      noindexPages.push([`/concepts/${entry.name}/live/`, `/concepts/${entry.name}/`]);
    }
  }
}

for (const [route, canonicalRoute] of noindexPages) {
  const file = htmlPath(route);
  if (!existsSync(file)) {
    errors.push(`${route}: missing noindex artifact`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const robots = match(html, /<meta name="robots" content="([^"]*)"/i);
  const canonical = match(html, /<link rel="canonical" href="([^"]*)"/i);
  const ogUrl = match(html, /<meta property="og:url" content="([^"]*)"/i);
  if (!robots.includes("noindex") || !robots.includes("follow")) errors.push(`${route}: expected noindex, follow`);
  if (canonical !== `${origin}${canonicalRoute}`) errors.push(`${route}: canonical was ${canonical}`);
  if (ogUrl !== canonical) errors.push(`${route}: og:url does not match canonical`);
  if ((html.match(/<meta name="robots"/gi) ?? []).length !== 1) errors.push(`${route}: expected one robots meta tag`);
}

const notFoundFile = join(out, "404.html");
if (existsSync(notFoundFile)) {
  const html = readFileSync(notFoundFile, "utf8");
  if ((html.match(/<meta name="robots"/gi) ?? []).length !== 1) errors.push("404.html: expected one robots meta tag");
  if (!match(html, /<meta name="robots" content="([^"]*)"/i).includes("noindex")) errors.push("404.html: missing noindex");
  if (match(html, /<link rel="canonical" href="([^"]*)"/i) !== `${origin}/404.html`) errors.push("404.html: incorrect canonical");
  if (match(html, /<meta property="og:url" content="([^"]*)"/i) !== `${origin}/404.html`) errors.push("404.html: incorrect og:url");
}

const manifestFile = join(out, "manifest.webmanifest");
if (existsSync(manifestFile)) {
  try {
    const manifest = JSON.parse(readFileSync(manifestFile, "utf8"));
    if (manifest.name !== "LocalRise India" || manifest.start_url !== "/" || manifest.lang !== "en-IN") {
      errors.push("manifest.webmanifest: missing required identity fields");
    }
    if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) errors.push("manifest.webmanifest: missing icons");
  } catch (error) {
    errors.push(`manifest.webmanifest: invalid JSON (${error.message})`);
  }
}

const htaccessFile = join(out, ".htaccess");
if (!existsSync(htaccessFile)) {
  errors.push("missing out/.htaccess");
} else {
  const htaccess = readFileSync(htaccessFile, "utf8");
  for (const required of ["%{HTTPS} !=on", "!^localrise\\.in$", "https://localrise.in%{REQUEST_URI}", "R=301"]) {
    if (!htaccess.includes(required)) errors.push(`.htaccess missing redirect rule fragment: ${required}`);
  }
}

const productionFiles = ["index.html", "robots.txt", "sitemap.xml", "llms.txt"]
  .filter((file) => existsSync(join(out, file)))
  .map((file) => readFileSync(join(out, file), "utf8"))
  .join("\n");
for (const forbidden of ["localhost", "staging.", "calendly.com/localrise", "GOOGLE_SITE_VERIFICATION", "BING_SITE_VERIFICATION"]) {
  if (productionFiles.includes(forbidden)) errors.push(`production output contains ${forbidden}`);
}
if (productionFiles.includes('"@type":"ProfessionalService"')) {
  errors.push("production schema still declares ProfessionalService");
}

if (errors.length) {
  console.error(`SEO verification failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO verification passed for ${sitemapPageCount} indexable sitemap routes and ${noindexPages.length} noindex routes.`);
