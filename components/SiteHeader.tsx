import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-12 pb-10 sm:pt-20 sm:pb-14">
      <Link
        href="/"
        className="text-[15px] font-medium tracking-[0.02em] hover:text-link-hover"
      >
        Andres Carreño
      </Link>
      <nav className="flex gap-6 text-[14px] italic">
        <Link
          href="/blog"
          className="link-underline text-secondary hover:text-foreground"
        >
          Blog
        </Link>
        <Link
          href="/about"
          className="link-underline text-secondary hover:text-foreground"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
