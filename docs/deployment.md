# Deployment

## Purpose

Get the static build onto **Hostinger shared hosting**, which serves
`localrise.in`.

> **Not Vercel.** The old README said otherwise and a stale `.vercel/` folder
> existed; both are gone. There may still be an unused Vercel project.

## How it works

```
git push origin main
      │
      ▼
GitHub Action (.github/workflows/deploy.yml)
   npm ci → npm run build → force-push out/ to the `deploy` branch
      │
      ▼
Hostinger hPanel → Websites → localrise.in → Advanced → GIT
   Branch: deploy   Root: public_html
   → click **Redeploy**
```

**Hostinger runs no build step.** It clones the branch into `public_html` and
serves it verbatim (deploys finish in ~3s). That's why `main` — which holds
source, not HTML — must never be the served branch.

> Pointing Hostinger at `main` serves raw `.tsx` and the domain returns
> **403 Forbidden**. That is exactly how the site sat, never live, until this was
> found. The branch must stay `deploy`.

**`deploy` is machine-generated and force-pushed on every build. Never commit to
it by hand.**

The Redeploy click is manual; the MCP tools don't expose git-integration
settings. If hPanel offers a deploy webhook, wiring it into the workflow would
remove the last manual step.

## The direct upload path (and its limit)

The Hostinger MCP tool `hosting_deployStaticWebsite` can push an archive straight
to `public_html`, bypassing git:

```bash
tar -czf site.tar.gz -C out .
```

⚠️ **Only viable for small archives (<~1 MB).** At ~2 MB it switches to a chunked
(tus) upload that reliably 404s — hit repeatedly once `intro.mp3` pushed the
archive to 2.4 MB. Fine for code-only updates; **use the `deploy` branch once
binary assets are involved.**

> Build archives with `tar`, **never** PowerShell `Compress-Archive` — it writes
> backslash paths that scramble on the Linux server and can drop dotfiles like
> `.htaccess`.

## `public/.htaccess`

Copied into `out/` by the build, lands in `public_html`:

- `ErrorDocument 404 /404.html` — serve the site's own 404.
- Permanent canonical redirect for HTTP or `www` requests to the equivalent
  `https://localrise.in` path.
- `AddType audio/ogg .ogg .opus` — Apache doesn't always know Opus; without this
  the browser gets a generic download instead of playable audio.
- Immutable 1-year cache **scoped to `/_next/static/`** only. Those filenames are
  content-hashed, so they can't go stale. **Don't widen this** — a long cache on
  an unhashed path is very hard to undo.

## Audio assets

`public/intro.ogg` (Opus 32k, 417 KB) and `public/intro.mp3` (48k mono, 601 KB).
Both were encoded **from the original 128k master**, not from each other.

> Re-encoding an already-compressed file stacks lossy generations and audibly
> degrades it. Always start from the original master. If it's been overwritten,
> recover it from git history rather than re-compressing what's in `public/`.

```bash
npm i -D ffmpeg-static        # no system install; remove afterwards
FF=$(node -e "console.log(require('ffmpeg-static'))")

"$FF" -i master.mp3 -c:a libopus -b:a 32k -ac 1 -vbr on \
      -application audio -map_metadata -1 public/intro.ogg
"$FF" -i master.mp3 -c:a libmp3lame -b:a 48k -ac 1 -ar 32000 \
      -map_metadata -1 public/intro.mp3
```

MP3 is lossy already, so shrinking always costs *something* — but a voice
recording at a music bitrate has enormous headroom, which is why 75% came off
with no audible change.

## Verifying a deploy

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://localrise.in/
curl -sS -o /dev/null -w "%{http_code} %{content_type}\n" https://localrise.in/intro.ogg
```

Expect `200`, and `audio/ogg` for the Opus file. Then spot-check a service page
(`/services/websites/`) and confirm the phone numbers appear in the HTML.

Browser-only checks (the build can't prove these) are listed in
[audio.md](./audio.md#verification-checklist).

For SEO-facing deploys, also run `npm run seo:verify` after the build, then
check `/robots.txt`, `/sitemap.xml`, `/llms.txt`, canonical redirects and a real
missing URL after the Hostinger redeploy. IndexNow submission is optional and
must include only materially changed URLs; see `SEO_IMPLEMENTATION.md`.

## Repo hygiene

- `.gitignore` covers `.next/`, `out/`, `.vercel`, `*.tar.gz`.
- **Never commit build artifacts.** `.next/` and `out/` were once tracked (163
  files, multi-MB webpack caches) because they predated `.gitignore` — gitignore
  doesn't apply to already-tracked files. If it happens again:
  `git rm -r --cached .next out`.
- Commit identity is repo-local: `khalid <mailshaikhkhalid@gmail.com>`.
- Pushing needs an interactive GitHub login (VS Code sign-in / Credential
  Manager); it can't be done from a non-interactive session.
