"use client";

import * as React from "react";
import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function ClearThemeOnReload() {
  useEffect(() => {
    const clear = () => {
      try {
        localStorage.removeItem("theme");
      } catch {
        // no-op
      }
    };
    window.addEventListener("beforeunload", clear);
    window.addEventListener("pagehide", clear);
    return () => {
      window.removeEventListener("beforeunload", clear);
      window.removeEventListener("pagehide", clear);
    };
  }, []);
  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      {...props}
    >
      <ClearThemeOnReload />
      {children}
    </NextThemesProvider>
  );
}
