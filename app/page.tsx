import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { PostList } from "@/components/PostList";
import { ProjectList } from "@/components/ProjectList";
import { SiteFooter } from "@/components/SiteFooter";

export default async function Home() {
  const posts = await getAllPosts();
  const writingDelay = 260 + projects.length * 80 + 90;
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="fade-up mb-5 text-[32px] font-normal leading-[1.2] tracking-[-0.01em] sm:text-[42px]">
        Engineer, team builder, car enthusiast, and endlessly curious.
      </h1>
      <p
        className="fade-up mb-14 text-[18px] italic leading-[1.6] text-secondary"
        style={{ "--delay": "90ms" } as React.CSSProperties}
      >
        I live in Medellín, Colombia, lead distributed engineering teams, and
        spend my free time exploring AI, new ideas, and the occasional drive.
      </p>
      <p
        className="meta-label fade-up mb-2"
        style={{ "--delay": "180ms" } as React.CSSProperties}
      >
        Projects
      </p>
      <ProjectList projects={projects} delayStart={260} />
      <p
        className="meta-label fade-up mb-2 mt-12"
        style={{ "--delay": `${writingDelay}ms` } as React.CSSProperties}
      >
        Writing
      </p>
      <PostList posts={posts} delayStart={writingDelay + 80} />
      <SiteFooter />
    </div>
  );
}
