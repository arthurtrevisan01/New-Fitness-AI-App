import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Elite Workout PWA",
  description: "Treinos de altíssimo padrão com biomecânica avançada e IA.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Elite Workout",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-black text-slate-100 overflow-x-hidden">
      <body
        className={`${inter.variable} font-sans antialiased bg-black min-h-screen selection:bg-gold-500/30`}
      >
        <main className="max-w-md mx-auto min-h-screen relative bg-black shadow-2xl">
          {children}
        </main>
      </body>
    </html>
  );
}
