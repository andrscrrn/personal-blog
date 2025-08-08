import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Comments } from "@/components/Comments";
import { absoluteUrl } from "@/lib/site";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

// Ensure this route is treated as fully static-only
export const dynamic = "force-static";
export const dynamicParams = false;

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
          url: "/globe.svg",
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
      images: ["/globe.svg"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();
  const mdx = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: { className: ["anchor"] },
              content: { type: "text", value: " #" },
            },
          ],
        ],
      },
    },
  });
  return (
    <div className="space-y-8">
      <article className="prose prose-zinc dark:prose-invert prose-lg max-w-2xl mx-auto prose-headings:font-semibold prose-h1:text-3xl md:prose-h1:text-4xl prose-h2:text-2xl md:prose-h2:text-3xl prose-h3:text-xl">
        <h1>{post.meta.title}</h1>
        <p className="!mt-0 text-sm text-muted-foreground">
          <time>{new Date(post.meta.date).toLocaleDateString()}</time>
        </p>
        {mdx.content}
      </article>
      <Comments />
    </div>
  );
}
