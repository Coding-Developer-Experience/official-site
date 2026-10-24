import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Xcode — Komunitas Developer Mahasiswa",
  description:
    "Komunitas mahasiswa yang belajar bersama, membangun project nyata, dan berkembang menjadi developer profesional.",
  keywords: ["Xcode", "Komunitas Developer", "Coding", "Mahasiswa", "Web Development", "HMTI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("scroll-smooth font-sans", inter.variable)}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

