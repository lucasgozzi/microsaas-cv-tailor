import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const { rating, comment } = await req.json();

  if (!rating || typeof rating !== "number") {
    return NextResponse.json({ error: "Rating required." }, { status: 400 });
  }

  if (!process.env.SHEETBEST_URL) {
    return NextResponse.json({ ok: true }); // silently skip if not configured
  }

  await fetch(process.env.SHEETBEST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: session?.user?.email ?? "",
      feedback_rating: rating,
      feedback_comment: comment ?? "",
      created_at: new Date().toISOString(),
      source: "feedback_widget",
    }),
  });

  return NextResponse.json({ ok: true });
}
