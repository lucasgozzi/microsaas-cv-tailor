import { createClient } from "@supabase/supabase-js";

// Server-side only — never expose service role key to the client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function upsertUser(email: string, name?: string | null, avatarUrl?: string | null) {
  await supabase.from("users").upsert(
    { email, name, avatar_url: avatarUrl, last_seen_at: new Date().toISOString() },
    { onConflict: "email", ignoreDuplicates: false }
  );
}

export async function logGeneration(
  userEmail: string,
  targetCountry: string,
  language: string,
  matchScore: number
) {
  await supabase.from("cv_generations").insert({
    user_email: userEmail,
    target_country: targetCountry,
    language,
    match_score: matchScore,
  });
}

export async function saveFeedback(userEmail: string | null, rating: number, comment: string) {
  await supabase.from("feedback").insert({
    user_email: userEmail || null,
    rating,
    comment: comment || null,
  });
}
