import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  slug: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(raw);
    const slug = file.replace(/\.(md|mdx)$/i, "");
    return {
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      description: data.description ?? "",
      tags: data.tags ?? [],
      slug,
    } as PostMeta;
  });
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return posts;
}

export async function getPostBySlug(
  slug: string
): Promise<{ meta: PostMeta; content: string } | null> {
  const filePath = [
    path.join(POSTS_DIR, `${slug}.mdx`),
    path.join(POSTS_DIR, `${slug}.md`),
  ].find((p) => fs.existsSync(p));
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    title: data.title ?? slug,
    date: data.date ?? new Date().toISOString(),
    description: data.description ?? "",
    tags: data.tags ?? [],
    slug,
  };
  return { meta, content };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(md|mdx)$/i, ""));
}
