import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/date";
import Image from "next/image";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className="space-y-10">
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">
          Andres Carreño — Full‑stack engineer, frontend‑leaning
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based in Medellín, Colombia. I build polished UIs, integrate APIs, and
          help shape product and technical direction.
        </p>
        <p className="text-sm text-muted-foreground">
          Currently: Team lead at a US-based startup
        </p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <a href="mailto:hello@andrescarreno.co" className="hover:underline">
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/andrscrrn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/andrscrrn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Latest Posts</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="group rounded-xl border border-border bg-card hover:shadow-sm transition overflow-hidden"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[1200/630]">
                  <Image
                    src={post.image ?? "/globe.svg"}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                  <time className="text-xs text-muted-foreground">
                    {formatDate(post.date)}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <Link href="/blog" className="text-primary hover:underline">
            View all posts →
          </Link>
        </div>
      </section>
    </div>
  );
}
