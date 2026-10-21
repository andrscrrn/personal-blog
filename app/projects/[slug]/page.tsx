import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs, projects } from "@/lib/projects";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";
import { StatusRingHero } from "@/components/StatusRing";

/** Generated heroes per project; these win over the static image. */
const projectHeroes: Record<string, React.ReactNode> = {
  "internet-monitor": <StatusRingHero />,
};
import { absoluteUrl } from "@/lib/site";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

// Ensure this route is treated as fully static-only
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const url = absoluteUrl(`/projects/${project.meta.slug}`);
  const ogImage = project.meta.image || "/globe.svg";

  return {
    title: project.meta.title,
    description: project.meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: project.meta.title,
      description: project.meta.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.meta.title,
      description: project.meta.description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();
  const card = projects.find((p) => p.slug === slug);
  const mdx = await compileMDX({
    source: project.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { className: ["anchor"] } },
          ],
        ],
      },
    },
  });
  return (
    <div className="flex flex-1 flex-col">
      <article className="mb-16">
        <header>
          {project.meta.meta ? (
            <p className="fade-up meta-label mb-4">{project.meta.meta}</p>
          ) : null}
          <h1
            className="fade-up mb-8 text-[34px] font-normal leading-[1.2] tracking-[-0.01em] sm:text-[44px]"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            {project.meta.title}
            {card?.status === "active" ? (
              <span className="status-pill live ml-4 align-[6px]">Active</span>
            ) : null}
          </h1>
          {project.meta.description ? (
            <p
              className="fade-up mb-12 text-[20px] italic leading-[1.6] text-secondary"
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              {project.meta.description}
            </p>
          ) : null}
          <div
            className="fade-up mb-12 border-t border-hairline"
            style={{ "--delay": "240ms" } as React.CSSProperties}
            aria-hidden="true"
          />
          {projectHeroes[slug] ? (
            <div
              className="fade-up mb-12 overflow-hidden rounded-[4px] border border-hairline"
              style={{ "--delay": "300ms" } as React.CSSProperties}
            >
              {projectHeroes[slug]}
            </div>
          ) : project.meta.image ? (
            <Image
              src={project.meta.image}
              alt={project.meta.title}
              width={1200}
              height={630}
              priority
              className="fade-up mb-12 w-full rounded-[4px] border border-hairline object-cover"
              style={{ "--delay": "300ms" } as React.CSSProperties}
            />
          ) : null}
        </header>
        <div
          className="fade-up post-body"
          style={{ "--delay": "360ms" } as React.CSSProperties}
        >
          {mdx.content}
        </div>
      </article>
      <footer className="mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-hairline pt-8 pb-14">
        <Link
          href="/"
          className="back-link text-[15px] italic text-secondary hover:text-foreground"
        >
          <span className="arrow" aria-hidden="true">
            ←
          </span>{" "}
          Home
        </Link>
        <SocialLinks />
      </footer>
    </div>
  );
}
