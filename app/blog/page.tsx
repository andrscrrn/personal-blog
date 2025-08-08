import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/date";

export const metadata = {
  title: "Blog",
  description: "Articles and notes",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </time>
              </div>
              <p className="text-muted-foreground">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
