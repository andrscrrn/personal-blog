import fs from "node:fs";
import path from "node:path";
import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

const OG_DIR = path.join(process.cwd(), "public", "og");
const WORDS_PER_MINUTE = 200;

/** Posts without an explicit `image` fall back to their OG image in public/og. */
function autoOgImage(slug: string, suffix = ""): string | undefined {
  for (const ext of [".webp", ".png", ".jpg", ".jpeg"]) {
    const file = `${slug}${suffix}${ext}`;
    if (fs.existsSync(path.join(OG_DIR, file))) return `/og/${file}`;
  }
  return undefined;
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection("posts");
  return posts.sort((a, b) => +b.data.date - +a.data.date);
}

export function postImage(post: Post): string | undefined {
  return post.data.image ?? autoOgImage(post.id);
}

/** Small list thumbnail; falls back to the full OG image if none was generated. */
export function postThumb(post: Post): string | undefined {
  return (
    autoOgImage(post.id, "-thumb") ?? post.data.image ?? autoOgImage(post.id)
  );
}

export function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
