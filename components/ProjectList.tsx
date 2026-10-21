import type { Project } from "@/lib/projects";
import { EntryList } from "@/components/EntryList";
import { StatusRingThumb } from "@/components/StatusRing";

/** Generated thumbnails per project; these win over the static image. */
const projectThumbnails: Record<string, React.ReactNode> = {
  "internet-monitor": <StatusRingThumb />,
};

export function ProjectList({
  projects,
  delayStart = 0,
}: {
  projects: Project[];
  delayStart?: number;
}) {
  return (
    <EntryList
      delayStart={delayStart}
      entries={projects.map((project) => ({
        key: project.slug,
        href: project.href ?? "#",
        meta: project.meta,
        title: (
          <>
            {project.title}
            {project.status === "active" ? (
              <span className="status-pill live ml-3 align-[4px]">Active</span>
            ) : null}
          </>
        ),
        description: project.description,
        image: project.image,
        thumbnail: projectThumbnails[project.slug],
      }))}
    />
  );
}
