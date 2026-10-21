import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";
import { SiteFooter } from "@/components/SiteFooter";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-5 text-[32px] font-normal leading-[1.2] tracking-[-0.01em] sm:text-[42px]">
        Notes on engineering, teams, and the odd airline checkout.
      </h1>
      <p className="mb-16 text-[18px] italic leading-[1.6] text-secondary">
        Engineering Manager in Medellín, Colombia. Distributed teams, a
        frontend focus, and the occasional detour.
      </p>
      <PostList posts={posts} />
      <SiteFooter />
    </div>
  );
}
