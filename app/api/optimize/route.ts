import { NextRequest, NextResponse } from "next/server";
import { optimizeCV, LANGUAGES, TARGET_COUNTRIES, type LanguageCode, type TargetCountry } from "@/lib/openai";

export async function POST(req: NextRequest) {
  const { cv, jobDescription, language, targetCountry } = await req.json();

  if (!cv?.trim() || !jobDescription?.trim()) {
    return NextResponse.json(
      { error: "CV and job description are required." },
      { status: 400 }
    );
  }

  if (cv.length > 10000 || jobDescription.length > 5000) {
    return NextResponse.json(
      { error: "Text too long. Limits: CV 10,000 chars, job description 5,000 chars." },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured." },
      { status: 500 }
    );
  }

  const lang: LanguageCode = language in LANGUAGES ? language : "en";
  const country: TargetCountry = TARGET_COUNTRIES.includes(targetCountry) ? targetCountry : "Remote / Global";

  try {
    const result = await optimizeCV(cv, jobDescription, lang, country);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error calling the AI.";
    const isAuthError = message.includes("401") || message.toLowerCase().includes("api key") || message.toLowerCase().includes("authentication");
    const isQuotaError = message.includes("429") || message.toLowerCase().includes("quota") || message.toLowerCase().includes("rate limit");

    const friendly = isAuthError
      ? "Invalid or missing API key. Check your OPENAI_API_KEY."
      : isQuotaError
      ? "API usage limit reached. Please try again in a moment."
      : `AI error: ${message}`;

    return NextResponse.json({ error: friendly }, { status: 500 });
  }
}
