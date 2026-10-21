export function SocialLinks() {
  return (
    <div className="flex gap-6 text-[14px] italic">
      <a
        href="mailto:hello@andrescarreno.co"
        className="link-underline text-secondary hover:text-foreground"
      >
        Email
      </a>
      <a
        href="https://www.linkedin.com/in/andrscrrn"
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline text-secondary hover:text-foreground"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/andrscrrn"
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline text-secondary hover:text-foreground"
      >
        GitHub
      </a>
    </div>
  );
}
