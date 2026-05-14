import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Currículo para a Holanda — Como conseguir emprego na Holanda | JobAbroad.pro",
  description: "Aprenda a escrever um CV para o mercado de trabalho holandês. Dicas de ATS, padrões locais de contratação e ferramenta de IA gratuita para otimizar seu currículo para a Holanda.",
};

const faqs = [
  {
    q: "Devo incluir foto no meu CV para a Holanda?",
    a: "Não — a Holanda desencoraja fortemente fotos em CVs para evitar discriminação. Mantenha seu currículo sem foto, a menos que seja explicitamente solicitado.",
  },
  {
    q: "Qual deve ser o tamanho do CV para a Holanda?",
    a: "No máximo 2 páginas. Empregadores holandeses preferem CVs concisos. Foque em experiências relevantes e resultados mensuráveis em vez de listar cada responsabilidade.",
  },
  {
    q: "Devo escrever meu CV em holandês ou inglês?",
    a: "Inglês é amplamente aceito — a Holanda tem uma das maiores taxas de proficiência em inglês do mundo. Para cargos governamentais ou voltados ao mercado local, um CV em holandês é mais indicado.",
  },
  {
    q: "O que empregadores holandeses mais valorizam em um CV?",
    a: "Resultados e conquistas concretas. Use números sempre que possível. A cultura holandesa é direta — seja específico sobre o que você realizou, não apenas sobre o que era sua responsabilidade.",
  },
];

export default function ResumeForNetherlands() {
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
          🇳🇱 Holanda
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Como escrever um currículo para a Holanda
        </h1>
        <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
          A Holanda é um dos mercados de trabalho mais amigáveis para estrangeiros na Europa, com uma cena tech vibrante em Amsterdã e alta demanda por talentos internacionais. Veja como adaptar seu CV para empregadores holandeses.
        </p>

        <div className="mt-10 space-y-8 text-zinc-700">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Formato do CV holandês</h2>
            <p className="mt-3 leading-relaxed">Mantenha o CV limpo, moderno e focado em resultados. Sem foto, sem data de nascimento. Inclua um forte resumo profissional, experiência em ordem cronológica inversa com conquistas quantificadas, formação, competências e idiomas. Empregadores holandeses apreciam espaço em branco e legibilidade.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Cultura direta = CV direto</h2>
            <p className="mt-3 leading-relaxed">A cultura holandesa é conhecida pela diretividade ("directheid"). Seu CV deve refletir isso: sem enrolação, sem descrições vagas. Em vez de "responsável pela gestão de uma equipe", escreva "gerenciei uma equipe de 8 engenheiros, aumentando a velocidade de entrega em 30%".</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Otimização para ATS em empresas holandesas</h2>
            <p className="mt-3 leading-relaxed">Empresas como ASML, Booking.com, Heineken e ING usam ATS intensamente. Use palavras-chave da descrição da vaga, evite tabelas e colunas e opte por um layout de coluna única para compatibilidade com ATS. O LinkedIn é extremamente popular na Holanda — certifique-se de que seu perfil está alinhado com o CV.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Carta de motivação na Holanda</h2>
            <p className="mt-3 leading-relaxed">Uma "motivatiebrief" (carta de motivação) é esperada. Deve ser concisa (1 página), específica para a vaga e explicar por que você quer trabalhar na Holanda. Demonstrar conhecimento da cultura de trabalho holandesa é um diferencial.</p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-zinc-900">Pronto para se candidatar a vagas na Holanda?</h3>
          <p className="mt-2 text-sm text-zinc-500">Deixe a IA reescrever seu CV de acordo com os padrões de contratação holandeses em segundos.</p>
          <Link href="/optimizer?country=Netherlands"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
          >
            Otimizar meu CV para a Holanda →
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
