import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Atlético EFIS",
  description:
    "Club deportivo de voleibol de Punitaqui. Estadísticas, partidos, torneos y comunidad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-[#111111] text-[#F5F5F5] antialiased">
        <div className="relative min-h-screen overflow-hidden">
          {/* Background Effects */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-red-700/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
          </div>

          <Navbar />

          <main className="relative z-10">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}