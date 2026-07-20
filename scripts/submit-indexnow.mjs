import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const host = "localrise.in";
const origin = `https://${host}`;
const key = process.env.INDEXNOW_KEY?.trim();
const urls = process.argv.slice(2);
const sitemapPath = join(process.cwd(), "out", "sitemap.xml");

if (!key || !/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  console.error("Set INDEXNOW_KEY to a valid 8–128 character IndexNow key.");
  process.exit(1);
}

if (urls.length === 0) {
  console.error("Pass only URLs that materially changed, for example: npm run indexnow:submit -- https://localrise.in/services/websites/");
  process.exit(1);
}

if (!existsSync(sitemapPath)) {
  console.error("Build the site first so out/sitemap.xml can be used as the canonical allowlist.");
  process.exit(1);
}

const sitemapUrls = new Set(
  [...readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
);

for (const value of urls) {
  const url = new URL(value);
  if (
    url.origin !== origin ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.toString() !== value ||
    !sitemapUrls.has(value)
  ) {
    console.error(`Refusing non-canonical URL: ${value}`);
    process.exit(1);
  }
}

const verificationFile = join(process.cwd(), "public", `${key}.txt`);
if (!existsSync(verificationFile) || readFileSync(verificationFile, "utf8").trim() !== key) {
  console.error(`Create public/${key}.txt containing only the configured key, deploy it, then retry.`);
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `${origin}/${key}.txt`,
    urlList: urls,
  }),
});

if (!response.ok) {
  console.error(`IndexNow returned ${response.status}: ${await response.text()}`);
  process.exit(1);
}

console.log(`IndexNow accepted ${urls.length} changed URL(s).`);
