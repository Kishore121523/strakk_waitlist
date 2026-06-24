import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://strakk.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Strakk: Join the waitlist",
  description:
    "Log your lifts, track every PR, and climb the leaderboard with your crew. Stop training alone. Join the Strakk waitlist.",
  // Favicon: served from /public. See /public/favicon.ico, icon-512.png, etc.
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Strakk",
    title: "Strakk: Join the waitlist",
    description:
      "Your gym, but make it a competition. Log lifts, track PRs, and climb the leaderboard with your crew.",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Strakk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strakk: Join the waitlist",
    description:
      "Your gym, but make it a competition. Log lifts, track PRs, and climb the leaderboard with your crew.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E1116",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
