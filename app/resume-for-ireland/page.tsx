import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Currículo para a Irlanda — Como conseguir emprego na Irlanda | JobAbroad.pro",
  description: "Aprenda a escrever um CV para o mercado de trabalho irlandês. Dicas de ATS, padrões locais de contratação e ferramenta de IA gratuita para otimizar seu currículo para a Irlanda.",
};

const faqs = [
  {
    q: "Devo incluir foto no meu CV para a Irlanda?",
    a: "Não — CVs irlandeses não incluem fotos. É considerado pouco profissional e pode levantar questões de discriminação. Mantenha o CV apenas com texto.",
  },
  {
    q: "Qual deve ser o tamanho do CV para a Irlanda?",
    a: "No máximo 2 páginas. Empregadores irlandeses são rigorosos quanto a isso. Se sua experiência abrange 15 anos ou mais, ainda assim busque 2 páginas focando nas experiências mais relevantes.",
  },
  {
    q: "A carta de apresentação é importante na Irlanda?",
    a: "Sim, muito. Uma cover letter personalizada é esperada para a maioria das vagas. É a sua chance de demonstrar entusiasmo pela empresa e pela vaga específica.",
  },
  {
    q: "Qual formato os empregadores irlandeses preferem?",
    a: "Ordem cronológica inversa, limpo e profissional. Inclua uma declaração pessoal no topo, seguida de experiência, formação e competências. Sem tabelas ou elementos gráficos — sistemas ATS são amplamente utilizados.",
  },
];

export default function ResumeForIreland() {
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
          🇮🇪 Irlanda
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Como escrever um currículo para a Irlanda
        </h1>
        <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
          A Irlanda é sede das filiais europeias de empresas como Google, Meta, Apple e LinkedIn. É um dos principais destinos para profissionais de tecnologia e talentos internacionais. Veja como adaptar seu CV para o mercado irlandês.
        </p>

        <div className="mt-10 space-y-8 text-zinc-700">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Formato do CV irlandês</h2>
            <p className="mt-3 leading-relaxed">Os CVs irlandeses seguem um formato similar ao britânico. Comece com seus dados de contato e uma forte declaração pessoal (3–4 linhas), depois experiência em ordem cronológica inversa, formação e competências. Sem foto, sem data de nascimento, sem estado civil.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Como se destacar no mercado de tecnologia irlandês</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside leading-relaxed">
              <li>Use inglês americano para multinacionais dos EUA, inglês britânico para outras empresas</li>
              <li>Quantifique suas conquistas com métricas (%, €, tamanho da equipe)</li>
              <li>Destaque experiências com equipes globais ou colaboração intercultural</li>
              <li>Mencione autorização de trabalho (stamp/visto) se aplicável</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">ATS na Irlanda</h2>
            <p className="mt-3 leading-relaxed">A maioria dos grandes empregadores e multinacionais irlandesas usa software ATS. Adapte seu CV para cada candidatura espelhando a linguagem da descrição da vaga. Use títulos de seção padrão, evite informações de contato em cabeçalhos/rodapés e salve como PDF.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">A cultura de entrevistas na Irlanda</h2>
            <p className="mt-3 leading-relaxed">As entrevistas irlandesas tendem a ser conversacionais e focadas em relacionamento, menos formais do que as alemãs ou holandesas. Seu CV é uma porta de entrada — deixe-o caloroso, específico e orientado a resultados para garantir aquela primeira chamada.</p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-zinc-900">Pronto para se candidatar a vagas na Irlanda?</h3>
          <p className="mt-2 text-sm text-zinc-500">Deixe a IA reescrever seu CV de acordo com os padrões de contratação irlandeses em segundos.</p>
          <Link href="/optimizer?country=Ireland"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
          >
            Otimizar meu CV para a Irlanda →
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
