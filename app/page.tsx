import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";
import { SiteFooter } from "@/components/SiteFooter";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="fade-up mb-5 text-[32px] font-normal leading-[1.2] tracking-[-0.01em] sm:text-[42px]">
        Engineer, team builder, car enthusiast, and endlessly curious.
      </h1>
      <p
        className="fade-up mb-16 text-[18px] italic leading-[1.6] text-secondary"
        style={{ "--delay": "90ms" } as React.CSSProperties}
      >
        I live in Medellín, Colombia, lead distributed engineering teams, and
        spend my free time exploring AI, new ideas, and the occasional drive.
      </p>
      <PostList posts={posts} delayStart={180} />
      <SiteFooter />
    </div>
  );
}
