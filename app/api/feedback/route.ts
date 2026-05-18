import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { saveFeedback } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const session = await auth();
  const { rating, comment } = await req.json();

  if (!rating || typeof rating !== "number") {
    return NextResponse.json({ error: "Rating required." }, { status: 400 });
  }

  await saveFeedback(session?.user?.email ?? null, rating, comment ?? "").catch(() => {});

  return NextResponse.json({ ok: true });
}
