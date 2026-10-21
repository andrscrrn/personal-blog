import { projects } from "@/lib/projects";
import { ProjectList } from "@/components/ProjectList";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Projects",
  description: "Personal projects and experiments",
};

export default function ProjectsIndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="fade-up mb-10 text-[32px] font-normal leading-[1.2] tracking-[-0.01em]">
        All projects
      </h1>
      <ProjectList projects={projects} delayStart={90} />
      <SiteFooter />
    </div>
  );
}
