import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

export type Entry = {
  key: string;
  href: string;
  meta?: string;
  title: ReactNode;
  description?: string;
  image?: string;
};

export function EntryList({
  entries,
  delayStart = 0,
}: {
  entries: Entry[];
  delayStart?: number;
}) {
  return (
    <div>
      <ul>
        {entries.map((entry, i) => (
          <li
            key={entry.key}
            className="fade-up border-t border-hairline"
            style={{ "--delay": `${delayStart + i * 80}ms` } as CSSProperties}
          >
            <Link
              href={entry.href}
              className="post-row flex items-center justify-between gap-6 py-7"
            >
              <span className="post-text flex min-w-0 flex-col gap-2">
                {entry.meta ? (
                  <span className="meta-label">{entry.meta}</span>
                ) : null}
                <span className="post-link text-[22px] font-medium leading-[1.3] sm:text-[26px]">
                  {entry.title}
                </span>
                {entry.description ? (
                  <span className="text-[16px] leading-[1.55] text-secondary">
                    {entry.description}
                  </span>
                ) : null}
              </span>
              {entry.image ? (
                <span className="post-thumb h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[4px] border border-hairline sm:h-28 sm:w-28">
                  <Image
                    src={entry.image}
                    alt=""
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
      <div
        className="fade-up border-t border-hairline"
        style={
          {
            "--delay": `${delayStart + entries.length * 80}ms`,
          } as CSSProperties
        }
        aria-hidden="true"
      />
    </div>
  );
}
