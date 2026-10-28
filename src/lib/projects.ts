export type ProjectCard = {
  slug: string;
  title: string;
  description: string;
  /** Uppercase label above the title, mirrors the date on posts. */
  meta?: string;
  status?: "active" | "archived";
  /** Detail page or external link; "#" until the detail page exists. */
  href?: string;
};

export const projectCards: ProjectCard[] = [
  {
    slug: "internet-monitor",
    title: "Internet Monitor",
    description:
      "My internet kept dropping, so I built the app to prove it: from a Node.js prototype to a native Swift menu bar app on the Mac App Store.",
    meta: "2026 – Present",
    status: "active",
    href: "/projects/internet-monitor",
  },
];
