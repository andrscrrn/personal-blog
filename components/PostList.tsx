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
            className="fade-up border-t border-hairline"
            style={{ "--delay": `${delayStart + i * 80}ms` } as CSSProperties}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="post-row flex items-center justify-between gap-6 py-7"
            >
              <span className="post-text flex flex-col gap-2">
                <span className="meta-label">{formatDate(post.date)}</span>
                <span className="post-link text-[22px] font-medium leading-[1.3] sm:text-[26px]">
                  {post.title}
                </span>
              </span>
              {post.image ? (
                <span className="post-thumb h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[4px] border border-hairline sm:h-28 sm:w-28">
                  <Image
                    src={post.image}
                    alt=""
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                </span>
              ) : null}
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
