import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Project = {
  slug: string;
  title: string;
  description: string;
  /** Uppercase label above the title, mirrors the date on posts. */
  meta?: string;
  status?: "active" | "archived";
  /** Detail page or external link; "#" until the detail page exists. */
  href?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "internet-monitor",
    title: "Internet Monitor",
    description:
      "My internet kept dropping, so I built the app to prove it: from a Node.js prototype to a native Swift menu bar app on the Mac App Store.",
    meta: "2026 — Present",
    status: "active",
    href: "/projects/internet-monitor",
  },
];

export type ProjectPageMeta = {
  title: string;
  description: string;
  meta?: string;
  image?: string;
  slug: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(md|mdx)$/i, ""));
}

export function getProjectBySlug(
  slug: string
): { meta: ProjectPageMeta; content: string } | null {
  const filePath = [
    path.join(PROJECTS_DIR, `${slug}.mdx`),
    path.join(PROJECTS_DIR, `${slug}.md`),
  ].find((p) => fs.existsSync(p));
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta: ProjectPageMeta = {
    title: data.title ?? slug,
    description: data.description ?? "",
    meta: data.meta ? String(data.meta) : undefined,
    image: data.image ? String(data.image) : undefined,
    slug,
  };
  return { meta, content };
}
