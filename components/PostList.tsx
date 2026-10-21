import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/date";
import { EntryList } from "@/components/EntryList";

export function PostList({
  posts,
  delayStart = 0,
}: {
  posts: PostMeta[];
  delayStart?: number;
}) {
  return (
    <EntryList
      delayStart={delayStart}
      entries={posts.map((post) => ({
        key: post.slug,
        href: `/blog/${post.slug}`,
        meta: formatDate(post.date),
        title: post.title,
        image: post.image,
      }))}
    />
  );
}
