# ADR 0001: Use Next.js static export for hosting on GitHub Pages

- Status: Accepted
- Context: Free hosting required, simple DX, custom domain on Squarespace.
- Decision: Use Next.js App Router with `output: "export"` and no server runtime; publish via GitHub Pages.
- Consequences:
  - Pros: free, fast, simple deploy; works with GitHub Actions; CDN-backed.
  - Cons: no server-side runtime; dynamic features must be client-only or precomputed.
  - Mitigations: comments via Giscus; analytics via GA; feeds and sitemaps generated at build.
