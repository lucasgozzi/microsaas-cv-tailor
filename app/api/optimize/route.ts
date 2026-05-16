import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { optimizeCV, LANGUAGES, TARGET_COUNTRIES, type LanguageCode, type TargetCountry } from "@/lib/openai";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Autenticação necessária." }, { status: 401 });
  }

  let rateLimit = { allowed: true, remaining: 99, limit: 99 };
  try {
    rateLimit = await checkRateLimit(session.user.email);
  } catch {
    // Redis unavailable — fail open, don't block the user
  }
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Limite diário de ${rateLimit.limit} usos atingido. Volte amanhã.`, limitReached: true },
      { status: 429 }
    );
  }

  const { cv, jobDescription, language, targetCountry } = await req.json();

  if (!cv?.trim() || !jobDescription?.trim()) {
    return NextResponse.json(
      { error: "CV e descrição da vaga são obrigatórios." },
      { status: 400 }
    );
  }

  if (cv.length > 10000 || jobDescription.length > 5000) {
    return NextResponse.json(
      { error: "Texto muito longo. Limites: CV 10.000 caracteres, descrição 5.000 caracteres." },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY não configurada." },
      { status: 500 }
    );
  }

  const lang: LanguageCode = language in LANGUAGES ? language : "pt";
  const country: TargetCountry = TARGET_COUNTRIES.includes(targetCountry) ? targetCountry : "Remote / Global";

  try {
    const result = await optimizeCV(cv, jobDescription, lang, country);
    return NextResponse.json({ ...result, remaining: rateLimit.remaining });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro inesperado ao chamar a IA.";
    const isAuthError = message.includes("401") || message.toLowerCase().includes("api key") || message.toLowerCase().includes("authentication");
    const isQuotaError = message.includes("429") || message.toLowerCase().includes("quota") || message.toLowerCase().includes("rate limit");

    const friendly = isAuthError
      ? "Chave de API inválida. Verifique sua OPENAI_API_KEY."
      : isQuotaError
      ? "Limite de uso da API atingido. Tente novamente em instantes."
      : `Erro na IA: ${message}`;

    return NextResponse.json({ error: friendly }, { status: 500 });
  }
}
