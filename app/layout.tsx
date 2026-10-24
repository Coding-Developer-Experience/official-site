import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xcode — Komunitas Developer Mahasiswa HMTI",
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
    <html lang="id" className="scroll-smooth font-sans">
      <body className="font-sans antialiased bg-[#F4F2EF] text-[#213E60]">
        {children}
      </body>
    </html>
  );
}
