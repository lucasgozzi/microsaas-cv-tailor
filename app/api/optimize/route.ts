import { NextRequest, NextResponse } from "next/server";
import { optimizeCV } from "@/lib/openai";

export async function POST(req: NextRequest) {
  const { cv, jobDescription } = await req.json();

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

  const result = await optimizeCV(cv, jobDescription);
  return NextResponse.json(result);
}
