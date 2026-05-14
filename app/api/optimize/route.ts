import { NextRequest, NextResponse } from "next/server";
import { optimizeCV, LANGUAGES, type LanguageCode } from "@/lib/openai";

export async function POST(req: NextRequest) {
  const { cv, jobDescription, language } = await req.json();
  const lang: LanguageCode = language in LANGUAGES ? language : "pt";

  if (!cv?.trim() || !jobDescription?.trim()) {
    return NextResponse.json(
      { error: "CV e descrição da vaga são obrigatórios." },
      { status: 400 }
    );
  }

  if (cv.length > 10000 || jobDescription.length > 5000) {
    return NextResponse.json(
      { error: "Texto muito longo. Limite: CV 10.000 caracteres, vaga 5.000 caracteres." },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY não configurada." },
      { status: 500 }
    );
  }

  try {
    const result = await optimizeCV(cv, jobDescription, lang);
    return NextResponse.json(result);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro inesperado ao chamar a IA.";

    const isAuthError =
      message.includes("401") || message.toLowerCase().includes("api key") || message.toLowerCase().includes("authentication");
    const isQuotaError =
      message.includes("429") || message.toLowerCase().includes("quota") || message.toLowerCase().includes("rate limit");

    const friendly = isAuthError
      ? "Chave de API inválida ou não configurada. Verifique a OPENAI_API_KEY."
      : isQuotaError
      ? "Limite de uso da API atingido. Tente novamente em alguns instantes."
      : `Erro da IA: ${message}`;

    return NextResponse.json({ error: friendly }, { status: 500 });
  }
}
