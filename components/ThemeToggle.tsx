"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const current = theme === "system" ? systemTheme : theme;
  return (
    <button
      aria-label="Toggle Theme"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted transition"
    >
      {current === "dark" ? "Light" : "Dark"}
    </button>
  );
}
