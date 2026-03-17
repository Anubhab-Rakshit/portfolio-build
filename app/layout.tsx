import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anubhab Rakshit | Full Stack & AI Developer",
  description: "Interactive macOS Sequoia-style portfolio of Anubhab Rakshit showcasing web development, AI projects, and UI/UX design.",
  icons: {
    icon: "/Images/Anubhab Rakshit Profile Pic.jpg",
    apple: "/Images/Anubhab Rakshit Profile Pic.jpg",
  },
  openGraph: {
    title: "Anubhab Rakshit | Full Stack & AI Developer",
    description: "Interactive macOS Sequoia-style portfolio of Anubhab Rakshit showcasing web development, AI projects, and UI/UX design.",
    url: "https://anubhabr.xyz/",
    siteName: "Anubhab Rakshit Portfolio",
    images: [
      {
        url: "/Images/Anubhab Rakshit Profile Pic.jpg",
        width: 800,
        height: 800,
        alt: "Anubhab Rakshit Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anubhab Rakshit - Web Developer",
    description: "Explore my interactive macOS styled portfolio.",
    images: ["/Images/Anubhab Rakshit Profile Pic.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
