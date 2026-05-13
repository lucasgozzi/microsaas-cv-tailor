import OpenAI from "openai";

export interface OptimizeResult {
  optimizedCV: string;
  coverLetter: string;
  score: number;
  improvements: string[];
}

export async function optimizeCV(
  cv: string,
  jobDescription: string
): Promise<OptimizeResult> {
  const systemPrompt = `Você é um especialista em recrutamento e RH com mais de 10 anos de experiência.
Sua tarefa é analisar um currículo e uma descrição de vaga e retornar um JSON estruturado com:
1. CV otimizado para ATS (Applicant Tracking Systems)
2. Cover letter personalizada
3. Score de compatibilidade (0-100)
4. Lista de melhorias sugeridas

Regras:
- Mantenha informações verídicas do CV original, apenas reformule e reorganize
- Use palavras-chave da vaga no CV otimizado
- Seja profissional e objetivo
- A cover letter deve ter no máximo 3 parágrafos
- O score deve ser baseado em: skills match, experiência, senioridade e palavras-chave ATS
- As melhorias devem ser bullet points acionáveis e específicos

RESPONDA APENAS COM JSON VÁLIDO, sem markdown, sem texto extra.`;

  const userPrompt = `CV do candidato:
${cv}

---

Descrição da vaga:
${jobDescription}

---

Retorne EXATAMENTE este JSON (sem markdown, sem backticks):
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
    model: "gpt-4o-mini",
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

  const result = JSON.parse(cleaned) as OptimizeResult;
  return result;
}
