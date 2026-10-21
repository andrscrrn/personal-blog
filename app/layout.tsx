import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { Analytics } from "@/components/Analytics";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andrescarreno.co"),
  title: {
    default: "Andres Carreño Blog",
    template: "%s • Andres Carreño Blog",
  },
  description: "Thoughts, notes, and projects",
  openGraph: {
    title: "Andres Carreño Blog",
    description: "Thoughts, notes, and projects",
    url: "/",
    siteName: "Andres Carreño Blog",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/globe.svg",
        width: 1200,
        height: 630,
        alt: "Andres Carreño Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andres Carreño Blog",
    description: "Thoughts, notes, and projects",
    images: ["/globe.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-4">
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
