import Link from "next/link";
import type { CSSProperties } from "react";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/date";

export function PostList({
  posts,
  delayStart = 0,
}: {
  posts: PostMeta[];
  delayStart?: number;
}) {
  return (
    <div>
      <ul>
        {posts.map((post, i) => (
          <li
            key={post.slug}
            className="fade-up flex flex-col gap-2 border-t border-hairline py-7"
            style={{ "--delay": `${delayStart + i * 80}ms` } as CSSProperties}
          >
            <span className="meta-label">{formatDate(post.date)}</span>
            <Link
              href={`/blog/${post.slug}`}
              className="post-link text-[22px] font-medium leading-[1.3] hover:text-link-hover sm:text-[26px]"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <div
        className="fade-up border-t border-hairline"
        style={
          { "--delay": `${delayStart + posts.length * 80}ms` } as CSSProperties
        }
        aria-hidden="true"
      />
    </div>
  );
}
