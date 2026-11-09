import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: "Fabiola Sainvry — Dev",
  description:
    "Développement logiciel et base de données. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={serif.variable}>
      <body>{children}</body>
    </html>
  );
}