import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Blog",
  description: "Articles and notes",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-10 text-[32px] font-normal leading-[1.2] tracking-[-0.01em]">
        All posts
      </h1>
      <PostList posts={posts} />
      <SiteFooter />
    </div>
  );
}
