# ADR 0002: Migrate from Next.js static export to Astro

- Status: Accepted
- Context: The site is almost entirely static content, but the Next.js static export shipped ~100 KB gzipped of React runtime and hydration on every page, plus ~312 KB of preloaded variable fonts. Next.js has no supported way to drop the client runtime.
- Decision: Rebuild on Astro 5 with zero client JS by default. The only interactivity (the Status Ring hover animation) is a small vanilla script. Fonts are self-hosted static latin subsets. All CSS is inlined. GA4 and the unused Giscus component were removed.
- Consequences:
  - Pros: homepage went from ~1.05 MB / 25 requests to ~160 KB / 13 requests; LCP dropped; no hydration cost; simpler mental model (HTML + CSS + one script).
  - Cons: no React ecosystem on pages; future interactive features need islands (Astro supports React/Svelte/vanilla islands if ever needed).
  - Analytics, if ever wanted, must be re-approved and use a lightweight privacy-friendly option.

Supersedes the hosting half of ADR 0001; GitHub Pages remains until the planned move to Cloudflare Pages.
