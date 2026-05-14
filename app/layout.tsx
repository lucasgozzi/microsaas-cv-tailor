import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobAbroad.pro — Seja contratado no exterior com um currículo otimizado por IA",
  description:
    "Otimize seu currículo para as expectativas de recrutadores, filtros ATS e padrões de contratação de cada país. Currículo, cover letter e análise de compatibilidade em segundos.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
