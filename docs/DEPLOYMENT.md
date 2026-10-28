# Deployment

## Cloudflare Pages (current)

- Project `personal-blog` in the Cloudflare account, connected to the GitHub repo via the Cloudflare Workers and Pages GitHub App (access limited to this repo).
- Every push to `main` builds `npm run build` (Astro preset) and publishes `dist/` to production at `https://andrescarreno.co`.
- Every other branch gets a preview deployment at `<hash>.personal-blog-vjv.pages.dev`.
- Caching: `public/_headers` sets `immutable` for `/_astro/*` and `/fonts/*`, revalidation for HTML. The `! Cache-Control` detach lines matter: Cloudflare appends duplicate headers otherwise.
- Rollbacks: Workers & Pages → personal-blog → Deployments → "..." → Rollback.

## Domain and DNS

- Registrar: Porkbun. Nameservers point to Cloudflare (`logan.ns.cloudflare.com`, `sierra.ns.cloudflare.com`).
- DNS zone lives in Cloudflare and holds the site records plus the Google MX records for `hello@andrescarreno.co`. Do not delete the MX records.
- Custom domains are attached to the Pages project (`andrescarreno.co` and `www.andrescarreno.co`); Cloudflare manages the records and TLS certificates for them.

## History

- Until October 2026 the site deployed to GitHub Pages via a GitHub Actions workflow and `public/CNAME`; both were removed when the domain moved to Cloudflare Pages.
