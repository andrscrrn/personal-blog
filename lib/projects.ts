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
      "A watchdog for my home networks — uptime, outages and latency, queryable from Claude via MCP.",
    meta: "2025 — Present",
    status: "active",
    image: "/projects/internet-monitor.svg",
  },
];
