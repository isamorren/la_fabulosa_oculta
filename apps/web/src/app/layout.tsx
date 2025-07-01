import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./ui-globals.css";
import { FilmStripLoader } from "@/components/film-strip-loader";
import { ScrollProgress } from "@/components/scroll-progress";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "La Fabulosa Oculta - Análisis cinematográfico",
    template: "%s | La Fabulosa Oculta",
  },
  description: "Análisis profesionales de películas y series con un tono curatorial al estilo MUBI",
  keywords: ["cine", "películas", "críticas", "análisis", "reviews", "cinema", "film"],
  authors: [{ name: "La Fabulosa Oculta" }],
  creator: "La Fabulosa Oculta",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://filmverse.com",
    siteName: "La Fabulosa Oculta",
    images: [
      {
        url: "https://filmverse.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@filmverse",
    creator: "@filmverse",
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Suspense fallback={null}>
          <FilmStripLoader />
        </Suspense>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
