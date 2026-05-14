import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Currículo para Portugal — Como conseguir emprego em Portugal | JobAbroad.pro",
  description: "Aprenda a escrever um CV para o mercado de trabalho português. Dicas de ATS, padrões locais de contratação e ferramenta de IA gratuita para otimizar seu currículo para Portugal.",
};

const faqs = [
  {
    q: "Devo incluir foto no meu CV para Portugal?",
    a: "É comum, mas não obrigatório. Muitos empregadores portugueses esperam uma foto profissional, especialmente em setores tradicionais. Empresas de tecnologia, em geral, não exigem.",
  },
  {
    q: "Qual deve ser o tamanho do CV para Portugal?",
    a: "1 a 2 páginas é o padrão. Profissionais sênior podem ir até 3 páginas. Evite CVs muito longos — recrutadores portugueses valorizam a concisão.",
  },
  {
    q: "Devo escrever meu CV em português ou inglês?",
    a: "Para a maioria das vagas, português é o preferido. No entanto, para empresas internacionais e cargos de tecnologia, CVs em inglês são amplamente aceitos e até esperados.",
  },
  {
    q: "Empresas portuguesas usam sistemas ATS?",
    a: "Cada vez mais, especialmente grandes empresas e multinacionais. Usar palavras-chave da descrição da vaga e evitar tabelas ou imagens melhora sua pontuação no ATS.",
  },
];

export default function ResumeForPortugal() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-zinc-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="3.5" stroke="white" strokeWidth="1.2"/>
                <path d="M5 1.5C5 1.5 3.5 3 3.5 5s1.5 3.5 1.5 3.5M5 1.5c0 0 1.5 1.5 1.5 3.5S5 8.5 5 8.5M1.5 5h7" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-900">JobAbroad.pro</span>
          </Link>
          <Link href="/optimizer" className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors">
            Otimizar meu CV →
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          🇵🇹 Portugal
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Como escrever um currículo para Portugal
        </h1>
        <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
          Portugal se tornou um dos destinos mais procurados por expatriados e trabalhadores remotos. Veja o que você precisa saber para se destacar no mercado de trabalho português.
        </p>

        <div className="mt-10 space-y-8 text-zinc-700">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Formato do CV em Portugal</h2>
            <p className="mt-3 leading-relaxed">Os CVs portugueses seguem um formato europeu relativamente tradicional. Inclua seus dados pessoais no topo (nome, email, telefone, LinkedIn), seguidos de um resumo profissional, experiência em ordem cronológica inversa, formação acadêmica e competências. Uma foto é comum, mas opcional.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Diferenças em relação a CVs americanos ou britânicos</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside leading-relaxed">
              <li>Data de nascimento e nacionalidade às vezes são incluídas (cada vez menos comum)</li>
              <li>Foto profissional é mais aceita do que nos EUA ou no Reino Unido</li>
              <li>O formato Europass ainda é usado para o setor público e instituições da UE</li>
              <li>Cartas de apresentação são chamadas de &quot;carta de motivação&quot; e são bem-vindas</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Otimização para ATS em Portugal</h2>
            <p className="mt-3 leading-relaxed">Empresas portuguesas, especialmente as de tecnologia em Lisboa e Porto, utilizam cada vez mais sistemas ATS. Espelhe as palavras-chave da descrição da vaga, use títulos de seção padrão e evite layouts complexos, tabelas ou imagens que confundam os parsers.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Principais setores que contratam estrangeiros</h2>
            <p className="mt-3 leading-relaxed">Tecnologia, finanças, turismo e serviços compartilhados são os principais setores que contratam talentos internacionais. O ecossistema tech de Lisboa cresceu significativamente, com empresas como Farfetch, Feedzai e Outsystems sediadas na cidade.</p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-zinc-900">Pronto para se candidatar a vagas em Portugal?</h3>
          <p className="mt-2 text-sm text-zinc-500">Deixe a IA reescrever seu CV de acordo com os padrões de contratação portugueses em segundos.</p>
          <Link href="/optimizer?country=Portugal"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
          >
            Otimizar meu CV para Portugal →
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold text-zinc-900">Perguntas frequentes</h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-zinc-100 pb-6">
                <h3 className="text-sm font-semibold text-zinc-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </main>
  );
}
