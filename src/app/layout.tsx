import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DotPattern from "@/components/magicui/dot-pattern";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harmos - Cofounder Recruitment",
  description: "Join the future of music.",
  keywords: "Harmos, co-founder, recruitment, AI, music, startup",
  authors: [{ name: "Harmos" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative h-full w-full overflow-hidden">
          <DotPattern />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
