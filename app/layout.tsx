import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "@/components/Providers";
import { auth } from "@/auth";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const BASE_URL = "https://www.jobabroad.pro";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "JobAbroad.pro — Seja contratado no exterior com um currículo otimizado por IA",
  description:
    "Otimize seu currículo para as expectativas de recrutadores, filtros ATS e padrões de contratação de cada país. Currículo, cover letter e análise de compatibilidade em segundos.",
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "JobAbroad.pro",
    title: "JobAbroad.pro — Currículo otimizado para vagas internacionais",
    description:
      "CV · Cover Letter · Score ATS gerados por IA em menos de 10 segundos. Para Portugal, Alemanha, Holanda, Irlanda e mais.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobAbroad.pro — Currículo otimizado para vagas internacionais",
    description:
      "CV · Cover Letter · Score ATS gerados por IA em menos de 10 segundos.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
