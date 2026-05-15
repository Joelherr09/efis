import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const siteUrl = "https://efisvoley.cl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Atlético EFIS | Club de Voleibol",
    template: "%s | Atlético EFIS",
  },

  description:
    "Club deportivo de voleibol de Punitaqui y Ovalle. Formación, competencia, torneos y desarrollo del voleibol regional.",

  keywords: [
    "Atlético EFIS",
    "voleibol",
    "vóley",
    "Punitaqui",
    "Ovalle",
    "club deportivo",
    "voleibol regional",
    "voleibol Chile",
    "Liga Panadería La Estrella",
  ],

  authors: [
    {
      name: "Atlético EFIS",
      url: siteUrl,
    },
  ],

  creator: "Atlético EFIS",
  publisher: "Atlético EFIS",

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteUrl,
    siteName: "Atlético EFIS",

    title: "Atlético EFIS | Club de Voleibol",

    description:
      "Formación, competencia y pasión por el voleibol regional en Punitaqui y Ovalle.",

    images: [
      {
        url: "/layout/logo.jpg",
        width: 1200,
        height: 1200,
        alt: "Logo Atlético EFIS",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Atlético EFIS | Club de Voleibol",

    description:
      "Club deportivo de voleibol enfocado en formación y competencia regional.",

    images: ["/layout/logo.jpg"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/layout/logo.jpg",
        type: "image/jpeg",
        sizes: "512x512",
      },
    ],

    apple: [
      {
        url: "/layout/logo.jpg",
        sizes: "180x180",
      },
    ],

    shortcut: ["/favicon.ico"],
  },

  manifest: "/site.webmanifest",
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
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-red-700/20 blur-3xl" />

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