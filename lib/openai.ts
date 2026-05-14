import OpenAI from "openai";

export interface OptimizeResult {
  optimizedCV: string;
  coverLetter: string;
  score: number;
  improvements: string[];
}

export const LANGUAGES = {
  pt: "Português",
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

export async function optimizeCV(
  cv: string,
  jobDescription: string,
  language: LanguageCode = "pt"
): Promise<OptimizeResult> {
  const langName = LANGUAGES[language];

  const systemPrompt = `You are a senior HR and recruiting expert with 10+ years of experience.
Your task is to analyze a resume and job description and return a structured JSON.
ALL text output (optimizedCV, coverLetter, improvements) MUST be written entirely in ${langName}.

Rules:
- Keep factual information from the original CV, only rewrite and reorganize
- Use keywords from the job description in the optimized CV
- Be professional and objective
- Cover letter must be at most 3 paragraphs
- Score must be based on: skills match, experience, seniority, ATS keywords
- Improvements must be actionable, specific bullet points

RESPOND ONLY WITH VALID JSON, no markdown, no extra text.`;

  const userPrompt = `Candidate CV:
${cv}

---

Job description:
${jobDescription}

---

Return EXACTLY this JSON (no markdown, no backticks):
{
  "optimizedCV": "texto completo do CV otimizado",
  "coverLetter": "texto completo da cover letter",
  "score": 75,
  "improvements": [
    "melhoria 1",
    "melhoria 2",
    "melhoria 3"
  ]
}`;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const content = response.choices[0]?.message?.content ?? "";

  const cleaned = content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    const result = JSON.parse(cleaned) as OptimizeResult;
    return result;
  } catch {
    throw new Error(`A IA retornou um formato inesperado. Tente novamente. (raw: ${cleaned.slice(0, 200)})`);
  }
}
