import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { personalData } from "@/data/portfolio";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundAurora } from "@/components/BackgroundAurora";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${personalData.fullName} | Portfolio`,
    template: `%s | ${personalData.firstName}`,
  },
  description: personalData.bio,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sora.variable} ${jetBrainsMono.variable} antialiased`}>
        <BackgroundAurora />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <div className="relative min-h-screen text-white">
          <Navbar />
          <main id="main-content" className="relative z-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

