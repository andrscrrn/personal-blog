import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Analytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.andrescarreno.co"),
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-dvh bg-background text-foreground">
            <Navbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
