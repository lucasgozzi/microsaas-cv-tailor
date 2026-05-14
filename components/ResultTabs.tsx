"use client";

import { useState } from "react";
import type { OptimizeResult } from "@/lib/openai";
import { printAsPdf } from "@/lib/generatePdf";

interface Props {
  result: OptimizeResult;
}

const TABS = [
  { id: "cv" as const, label: "CV Otimizado" },
  { id: "cover" as const, label: "Cover Letter" },
  { id: "analysis" as const, label: "Análise de Compatibilidade" },
];
type TabId = (typeof TABS)[number]["id"];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm transition-all hover:border-zinc-300 hover:text-zinc-800 active:scale-95"
    >
      {copied ? (
        <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Copiado!</>
      ) : (
        <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="4" y="4" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><path d="M3 8H2a.5.5 0 0 1-.5-.5v-6A.5.5 0 0 1 2 1h6a.5.5 0 0 1 .5.5V3" stroke="currentColor" strokeWidth="1.2"/></svg>Copiar</>
      )}
    </button>
  );
}

function DownloadButton({ title, content }: { title: string; content: string }) {
  return (
    <button onClick={() => printAsPdf(title, content)}
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm transition-all hover:border-zinc-300 hover:text-zinc-800 active:scale-95"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1v6M3.5 5L6 7.5 8.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.5 9.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
      Baixar PDF
    </button>
  );
}

function ScoreArc({ score }: { score: number }) {
  const radius = 52;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const label = score >= 75 ? "Excelente match" : score >= 50 ? "Bom match" : "Match fraco";

  return (
    <div className="flex flex-col items-center">
      <svg width="130" height="72" viewBox="0 0 130 72">
        <path d="M 13 65 A 52 52 0 0 1 117 65" fill="none" stroke="#f4f4f5" strokeWidth="10" strokeLinecap="round"/>
        <path d="M 13 65 A 52 52 0 0 1 117 65" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)", transformOrigin: "center" }}
        />
        <text x="65" y="62" textAnchor="middle" fontSize="22" fontWeight="700" fill={color}>{score}%</text>
      </svg>
      <span className="text-xs font-medium" style={{ color }}>{label}</span>
    </div>
  );
}

export default function ResultTabs({ result }: Props) {
  const [active, setActive] = useState<TabId>("cv");

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-zinc-900">Resultados gerados pela IA</h2>
            <p className="mt-0.5 text-sm text-zinc-500">Seu CV otimizado, cover letter e análise de compatibilidade</p>
          </div>
          <ScoreArc score={result.matchScore} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-100 px-6">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            className={`mr-1 border-b-2 px-1 py-3.5 text-sm transition-colors ${
              active === tab.id ? "border-zinc-900 font-medium text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >{tab.label}</button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {(active === "cv" || active === "cover") && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-zinc-400">{active === "cv" ? "CV otimizado para ATS e para o país de destino" : "Cover letter personalizada"}</p>
              <div className="flex items-center gap-2">
                <DownloadButton
                  title={active === "cv" ? "Optimized Resume" : "Cover Letter"}
                  content={active === "cv" ? result.optimizedCv : result.coverLetter}
                />
                <CopyButton text={active === "cv" ? result.optimizedCv : result.coverLetter} />
              </div>
            </div>
            <pre className="whitespace-pre-wrap rounded-xl border border-zinc-100 bg-zinc-50 px-5 py-4 text-sm leading-relaxed text-zinc-700 font-sans">
              {active === "cv" ? result.optimizedCv : result.coverLetter}
            </pre>
          </div>
        )}

        {active === "analysis" && (
          <div className="space-y-6">
            {/* Strengths */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                Pontos fortes identificados
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((item, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-zinc-700">
                    <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing keywords */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2v4M5 7.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
                Palavras-chave ausentes
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((kw, i) => (
                  <span key={i} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">{kw}</span>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1.5L6.1 3.8L8.5 4.1L6.8 5.7L7.2 8L5 6.8L2.8 8L3.2 5.7L1.5 4.1L3.9 3.8L5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                </span>
                Melhorias recomendadas
              </h3>
              <ul className="space-y-2">
                {result.improvements.map((item, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
