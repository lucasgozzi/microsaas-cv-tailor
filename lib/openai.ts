import OpenAI from "openai";

export interface OptimizeResult {
  optimizedCv: string;
  coverLetter: string;
  matchScore: number;
  missingKeywords: string[];
  improvements: string[];
  strengths: string[];
}

export const LANGUAGES = {
  pt: "Português",
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

export const TARGET_COUNTRIES = [
  "Portugal",
  "Germany",
  "Netherlands",
  "Ireland",
  "Spain",
  "Canada",
  "Remote / Global",
] as const;

export type TargetCountry = (typeof TARGET_COUNTRIES)[number];

export async function optimizeCV(
  cv: string,
  jobDescription: string,
  language: LanguageCode = "en",
  targetCountry: TargetCountry = "Remote / Global"
): Promise<OptimizeResult> {
  const langName = LANGUAGES[language];

  const systemPrompt = `You are a senior international recruiting expert with 10+ years of experience placing candidates in ${targetCountry}.
Your task is to analyze a resume and job description and return a structured JSON.
ALL text output (optimizedCv, coverLetter, improvements, strengths, missingKeywords) MUST be written entirely in ${langName}.

Consider the following when rewriting:
- Target country: ${targetCountry} — adapt to local hiring standards, resume format expectations, and cultural norms
- ATS optimization: include relevant keywords, proper section headers, clean formatting
- Local expectations: length, photo policy, personal info conventions, tone, date formats
- Language style: match the professional register expected in ${targetCountry}
- Role seniority: infer from the CV and match the tone accordingly

Rules:
- Keep factual information from the original CV, only rewrite and reorganize
- Use keywords from the job description prominently
- Cover letter must be at most 3 paragraphs, personalized to the job and country
- matchScore (0-100): based on skills match, experience, seniority, ATS keywords
- missingKeywords: keywords from the job description absent in the original CV
- improvements: actionable, specific bullet points to strengthen the application
- strengths: concrete strengths already present in the CV that match the job

FORMAT FOR optimizedCv — use this exact markdown structure:
# Full Name
email | phone | linkedin | city, country

## SECTION HEADING
**Job Title** — Company Name | Jan 2020 – Dec 2023
- Achievement with metric or concrete result
- Achievement with metric or concrete result

Use ## for every section (Experience, Education, Skills, Languages, etc.)
Use **bold** for job titles, degree names, and company names
Use - for every bullet point
Do NOT use markdown for coverLetter — write it as plain paragraphs only

RESPOND ONLY WITH VALID JSON, no markdown wrapper, no extra text.`;

  const userPrompt = `Candidate CV:
${cv}

---

Job description:
${jobDescription}

---

Return EXACTLY this JSON (no markdown, no backticks):
{
  "optimizedCv": "full rewritten resume text",
  "coverLetter": "full cover letter text",
  "matchScore": 75,
  "missingKeywords": ["keyword1", "keyword2"],
  "improvements": ["improvement 1", "improvement 2"],
  "strengths": ["strength 1", "strength 2"]
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
    return JSON.parse(cleaned) as OptimizeResult;
  } catch {
    throw new Error(`Unexpected AI response format. Please try again. (raw: ${cleaned.slice(0, 200)})`);
  }
}
