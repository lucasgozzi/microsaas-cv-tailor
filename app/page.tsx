import Link from "next/link";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12.39 7.26L18 8.27L14 12.14L14.76 18L10 15.27L5.24 18L6 12.14L2 8.27L7.61 7.26L10 2Z" stroke="#6366f1" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "CV otimizado para ATS",
    desc: "Seu currículo reescrito profissionalmente com as palavras-chave certas para passar pelos filtros automáticos.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 4.5h14M3 8.5h9M3 12.5h14M3 16.5h6" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Cover letter personalizada",
    desc: "Carta de apresentação convincente gerada com base no seu perfil e na vaga específica.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="#3b82f6" strokeWidth="1.5"/>
        <path d="M10 6.5v4l2.5 2.5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Score de compatibilidade",
    desc: "Veja em tempo real o quanto seu perfil se encaixa na vaga, com sugestões práticas de melhoria.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col flex-1 hero-bg">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5L8.8 5.4L13 6.1L10 9L10.6 13.5L7 11.4L3.4 13.5L4 9L1 6.1L5.2 5.4L7 1.5Z" fill="white"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-zinc-900">CV Optimizer AI</span>
        </div>
        <Link
          href="/optimizer"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          Começar →
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs font-medium text-indigo-600">Powered by GPT-4o</span>
        </div>

        <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-zinc-900 leading-[1.1] sm:text-6xl">
          Seu currículo{" "}
          <span className="gradient-text">otimizado pela IA</span>{" "}
          em segundos
        </h1>

        <p className="mt-6 max-w-md text-lg text-zinc-500 leading-relaxed">
          Cole seu CV e a descrição da vaga. A IA reescreve, adapta para ATS,
          cria uma cover letter e calcula seu score de compatibilidade.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/optimizer"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:bg-zinc-700 hover:shadow-xl hover:shadow-zinc-900/25 hover:-translate-y-0.5"
          >
            Otimizar meu CV
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <span className="text-xs text-zinc-400">Gratuito · Sem cadastro</span>
        </div>

        {/* Feature cards */}
        <div className="mt-20 grid max-w-3xl gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-zinc-100 bg-white p-6 text-left card-glow"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-zinc-900">{f.title}</h3>
              <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <p className="mt-12 text-xs text-zinc-400">
          Resultados gerados em menos de 10 segundos
        </p>
      </section>

      <footer className="px-6 py-5 text-center text-xs text-zinc-400">
        © 2025 CV Optimizer AI
      </footer>
    </main>
  );
}
