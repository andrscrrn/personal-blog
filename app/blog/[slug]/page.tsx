import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Comments } from "@/components/Comments";
import { SocialLinks } from "@/components/SocialLinks";
import { absoluteUrl } from "@/lib/site";
import type { Metadata } from "next";
import { formatDate } from "@/lib/date";

type Props = { params: Promise<{ slug: string }> };

// Ensure this route is treated as fully static-only
export const dynamic = "force-static";
export const dynamicParams = false;

const WORDS_PER_MINUTE = 200;

function readingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const url = absoluteUrl(`/blog/${post.meta.slug}`);
  const publishedTime = new Date(post.meta.date).toISOString();
  const tags = post.meta.tags ?? [];
  const ogImage = post.meta.image || "/globe.svg";

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.meta.title,
      description: post.meta.description,
      publishedTime,
      tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();
  const minutes = readingTimeMinutes(post.content);
  const mdx = await compileMDX({
    source: post.content,
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
          <p className="meta-label mb-4">
            <time dateTime={new Date(post.meta.date).toISOString()}>
              {formatDate(post.meta.date)}
            </time>
            {" · "}
            {minutes} min read
          </p>
          <h1 className="mb-8 text-[34px] font-normal leading-[1.2] tracking-[-0.01em] sm:text-[44px]">
            {post.meta.title}
          </h1>
          {post.meta.description ? (
            <p className="mb-12 text-[20px] italic leading-[1.6] text-secondary">
              {post.meta.description}
            </p>
          ) : null}
          <div className="mb-12 border-t border-hairline" aria-hidden="true" />
        </header>
        <div className="post-body">{mdx.content}</div>
      </article>
      <Comments />
      <footer className="mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-hairline pt-8 pb-14">
        <Link
          href="/"
          className="text-[15px] italic text-secondary hover:text-foreground"
        >
          ← All posts
        </Link>
        <SocialLinks />
      </footer>
    </div>
  );
}
