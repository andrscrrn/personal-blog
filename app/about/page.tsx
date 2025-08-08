export const metadata = {
  title: "About",
  description: "A bit about me and what I’m curious about lately",
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">About</h1>
      <p className="text-muted-foreground max-w-2xl">
        I’m Andres Carreño from Medellín, Colombia. I really like cars—the
        design, the engineering, and simply going for a drive.
      </p>
      <p className="text-muted-foreground max-w-2xl">
        Lately I’ve been very curious about artificial intelligence and
        entrepreneurship. I’m learning, experimenting, and working on a few
        projects, but nothing specific to share just yet.
      </p>
      <div className="space-x-4 text-sm">
        <a href="mailto:hello@andrescarreno.co" className="hover:underline">
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/andrscrrn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/andrscrrn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
