import Link from "next/link";
import Image from "next/image";
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
            className="fade-up flex items-center justify-between gap-6 border-t border-hairline py-7"
            style={{ "--delay": `${delayStart + i * 80}ms` } as CSSProperties}
          >
            <div className="flex flex-col gap-2">
              <span className="meta-label">{formatDate(post.date)}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="post-link text-[22px] font-medium leading-[1.3] hover:text-link-hover sm:text-[26px]"
              >
                {post.title}
              </Link>
            </div>
            {post.image ? (
              <Link
                href={`/blog/${post.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className="shrink-0"
              >
                <Image
                  src={post.image}
                  alt=""
                  width={112}
                  height={112}
                  className="h-[88px] w-[88px] rounded-[4px] border border-hairline object-cover sm:h-28 sm:w-28"
                />
              </Link>
            ) : null}
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
