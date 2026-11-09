import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fabiola Sainvry — Développeuse",
  description:
    "Carte de visite numérique — développement d'applications multiplateformes & automatisation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={mono.variable}>
      <body>{children}</body>
    </html>
  );
}