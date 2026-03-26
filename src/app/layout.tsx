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
  metadataBase: new URL('https://nipunbasnayake.dev'),
  title: {
    default: `${personalData.fullName} | Full Stack Software Engineer`,
    template: `%s | ${personalData.firstName}`,
  },
  description: personalData.bio,
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "Spring Boot Developer",
    "React Developer",
    "Java Developer",
    "NestJS Developer",
    "Angular Developer",
    "Web Developer",
    "Cloud Developer",
    "AWS",
    "Sri Lanka Developer",
  ],
  authors: [{ name: personalData.fullName, url: "https://nipunbasnayake.dev" }],
  creator: personalData.fullName,
  publisher: personalData.fullName,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nipunbasnayake.dev",
    title: `${personalData.fullName} | Full Stack Software Engineer`,
    description: "Full Stack Software Engineer specializing in Spring Boot, React, and cloud-native solutions. Building scalable, real-world systems.",
    siteName: `${personalData.fullName} Portfolio`,
    images: [
      {
        url: "/assets/images/photos/profile.png",
        width: 1200,
        height: 630,
        alt: `${personalData.fullName} - Full Stack Software Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalData.fullName} | Full Stack Software Engineer`,
    description: "Full Stack Software Engineer specializing in Spring Boot, React, and cloud-native solutions.",
    images: ["/assets/images/photos/profile.png"],
    creator: "@nipunbasnayake",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

