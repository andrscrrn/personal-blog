import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/date";

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li
            key={post.slug}
            className="flex flex-col gap-2 border-t border-hairline py-7"
          >
            <span className="meta-label">{formatDate(post.date)}</span>
            <Link
              href={`/blog/${post.slug}`}
              className="text-[22px] font-medium leading-[1.3] hover:text-link-hover sm:text-[26px]"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-t border-hairline" aria-hidden="true" />
    </div>
  );
}
