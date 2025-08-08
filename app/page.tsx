import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className="space-y-10">
      <section className="text-center space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Welcome</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A modern, minimal blog built with Next.js. Read the latest posts
          below.
        </p>
      </section>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Latest Posts</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="group rounded-xl border border-border bg-card p-5 hover:shadow-sm transition"
            >
              <Link href={`/blog/${post.slug}`} className="block space-y-2">
                <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
                <time className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString()}
                </time>
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
