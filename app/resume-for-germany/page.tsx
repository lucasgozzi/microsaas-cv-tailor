import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Currículo para a Alemanha — Como conseguir emprego na Alemanha | JobAbroad.pro",
  description: "Aprenda a escrever um Lebenslauf para o mercado de trabalho alemão. Dicas de ATS, padrões locais de contratação e ferramenta de IA gratuita para otimizar seu currículo para a Alemanha.",
};

const faqs = [
  {
    q: "O que é um Lebenslauf e como ele difere de um CV comum?",
    a: "Lebenslauf é a palavra alemã para currículo. Os CVs alemães são altamente estruturados, incluem foto e seguem um formato rígido em ordem cronológica inversa. Tendem a ser mais detalhados do que os currículos anglo-saxônicos.",
  },
  {
    q: "Devo incluir foto no meu CV para a Alemanha?",
    a: "Sim — uma foto profissional (Bewerbungsfoto) é fortemente esperada na Alemanha. Deve ser um retrato de alta qualidade com fundo neutro. Isso é diferente das normas do Reino Unido e dos EUA.",
  },
  {
    q: "Qual deve ser o tamanho do meu CV alemão?",
    a: "Geralmente 2 páginas. Ao contrário do Reino Unido, empregadores alemães aceitam um CV de 2 páginas mesmo para cargos júnior. Inclua todos os detalhes relevantes — os alemães valorizam a minuciosidade.",
  },
  {
    q: "Devo escrever meu CV em alemão ou inglês para empresas alemãs?",
    a: "Em alemão para a maioria das vagas. Para empresas internacionais, startups ou empresas de tecnologia, inglês é amplamente aceito. Na dúvida, ter as duas versões é uma escolha segura.",
  },
];

export default function ResumeForGermany() {
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
          🇩🇪 Alemanha
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Como escrever um currículo para a Alemanha
        </h1>
        <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
          A Alemanha é a maior economia da Europa e um dos principais destinos para profissionais qualificados. Acertar no Lebenslauf é essencial — o processo seletivo alemão é rigoroso e detalhista.
        </p>

        <div className="mt-10 space-y-8 text-zinc-700">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Formato do CV alemão (Lebenslauf)</h2>
            <p className="mt-3 leading-relaxed">Um CV alemão é preciso e formal. Comece com uma foto profissional e dados pessoais, seguidos de objetivo profissional, experiência (ordem cronológica inversa), formação, certificações, idiomas e habilidades em TI. Os alemães apreciam completude — não deixe lacunas sem explicação.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">O que empregadores alemães buscam</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside leading-relaxed">
              <li>Estrutura clara e formatação consistente</li>
              <li>Conquistas quantificadas sempre que possível</li>
              <li>Níveis de idioma usando a escala CEFR (A1–C2)</li>
              <li>Endereço de email profissional e informações de contato completas</li>
              <li>Sem erros de ortografia — empregadores alemães são meticulosos</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">ATS na Alemanha</h2>
            <p className="mt-3 leading-relaxed">Grandes empresas alemãs (SAP, Siemens, Deutsche Telekom) utilizam ATS intensamente. Use as palavras-chave exatas do anúncio de emprego, evite imagens em campos de texto e mantenha seu formato limpo. Vagas alemãs são muito específicas sobre qualificações exigidas — atenda-as com precisão.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">A carta de apresentação alemã (Anschreiben)</h2>
            <p className="mt-3 leading-relaxed">O Anschreiben ainda é importante na Alemanha e deve ser formal, estruturado e específico. Dirija-se ao recrutador pelo nome se possível, explique por que você quer esta vaga nesta empresa específica e termine com uma chamada clara para ação.</p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-zinc-900">Pronto para se candidatar a vagas na Alemanha?</h3>
          <p className="mt-2 text-sm text-zinc-500">Deixe a IA reescrever seu CV de acordo com os padrões de contratação alemães em segundos.</p>
          <Link href="/optimizer?country=Germany"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
          >
            Otimizar meu CV para a Alemanha →
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
