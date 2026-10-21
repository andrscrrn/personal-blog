import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "About",
  description: "A bit about me and what I’m curious about lately",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="fade-up mb-8 text-[32px] font-normal leading-[1.2] tracking-[-0.01em]">
        About
      </h1>
      <div className="post-body">
        <p>
          I’m Andres Carreño from Medellín, Colombia. I really like cars: the
          design, the engineering, and simply going for a drive.
        </p>
        <p>
          Lately I’ve been very curious about artificial intelligence and
          entrepreneurship. I’m learning, experimenting, and working on a few
          projects, but nothing specific to share just yet.
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}
