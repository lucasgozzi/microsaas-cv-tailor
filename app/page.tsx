import Link from "next/link";
import Image from "next/image";
import NavAuth from "@/components/NavAuth";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12.39 7.26L18 8.27L14 12.14L14.76 18L10 15.27L5.24 18L6 12.14L2 8.27L7.61 7.26L10 2Z" stroke="#6366f1" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "CV adaptado para o mercado global",
    desc: "Seu currículo reescrito no padrão internacional, com as palavras-chave certas para passar pelos filtros automáticos de empresas no exterior.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 4.5h14M3 8.5h9M3 12.5h14M3 16.5h6" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Cover letter em qualquer idioma",
    desc: "Carta de apresentação profissional gerada em inglês, espanhol, francês ou alemão — adaptada para a vaga e para o país.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="#3b82f6" strokeWidth="1.5"/>
        <path d="M10 6.5v4l2.5 2.5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Score real de compatibilidade",
    desc: "Descubra o quanto seu perfil atual se encaixa na vaga — e o que mudar para aumentar suas chances lá fora.",
  },
];

const painPoints = [
  "Cansado da instabilidade econômica?",
  "Salário que não acompanha a inflação?",
  "Querendo dar uma vida melhor pra sua família?",
];

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      {/* Hero background image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black/85" />
      </div>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.3"/>
              <path d="M7 1.5C7 1.5 5 4 5 7s2 5.5 2 5.5M7 1.5c0 0 2 2.5 2 5.5s-2 5.5-2 5.5M1.5 7h11" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">JobAbroad.pro</span>
        </div>
        <NavAuth />
      </nav>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 animate-pulse" />
          <span className="text-xs font-medium text-white/90">Para quem quer ir além das fronteiras</span>
        </div>

        <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-white leading-[1.1] sm:text-6xl">
          Seu próximo emprego{" "}
          <span className="text-indigo-300">pode ser em outro país</span>
        </h1>

        <p className="mt-6 max-w-lg text-lg text-white/85 leading-relaxed">
          Transformamos seu currículo para o padrão internacional em segundos.
          Você foca em escolher o país. A IA cuida do CV.
        </p>

        {/* Pain points */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {painPoints.map((p) => (
            <span
              key={p}
              className="rounded-full border border-white/30 bg-white/15 backdrop-blur-sm px-4 py-1.5 text-xs text-white font-medium"
            >
              {p}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/optimizer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg shadow-black/30 transition-all hover:bg-zinc-100 hover:shadow-xl hover:-translate-y-0.5"
          >
            Adaptar meu CV agora
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <span className="text-xs text-white/70">Gratuito · Sem cadastro · Resultado em segundos</span>
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
        <p className="mt-12 text-xs text-white/60">
          Resultado em menos de 10 segundos · Suporta PT, EN, ES, FR, DE
        </p>
      </section>

      <footer className="px-6 py-5 text-center text-xs text-white/30">
        © 2026 JobAbroad.pro
      </footer>
    </main>
  );
}
