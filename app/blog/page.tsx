import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/date";
import Image from "next/image";

export const metadata = {
  title: "Blog",
  description: "Articles and notes",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <ul className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug} className="group rounded-xl border border-border bg-card overflow-hidden">
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
              <div className="p-4 space-y-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(post.date)}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
