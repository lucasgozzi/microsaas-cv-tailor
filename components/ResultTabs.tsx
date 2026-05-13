"use client";

import { useState } from "react";
import type { OptimizeResult } from "@/lib/openai";
import ScoreRing from "./ScoreRing";

interface Props {
  result: OptimizeResult;
}

const TABS = [
  {
    id: "cv" as const,
    label: "CV Otimizado",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M4 5h6M4 7h6M4 9h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "cover" as const,
    label: "Cover Letter",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 3.5h10v8H2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M2 3.5l5 4.5 5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "tips" as const,
    label: "Melhorias",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.5L8.5 4.8L12 5.3L9.5 7.7L10.1 11.5L7 9.7L3.9 11.5L4.5 7.7L2 5.3L5.5 4.8L7 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
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
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm transition-all hover:border-zinc-300 hover:text-zinc-800 active:scale-95"
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Copiado!
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M3 8H2a.5.5 0 0 1-.5-.5v-6A.5.5 0 0 1 2 1h6a.5.5 0 0 1 .5.5V3" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          Copiar
        </>
      )}
    </button>
  );
}

export default function ResultTabs({ result }: Props) {
  const [active, setActive] = useState<TabId>("cv");

  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Score header */}
      <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              Resultado gerado pela IA
            </h2>
            <p className="mt-0.5 text-sm text-zinc-500">
              CV, cover letter e análise prontos para usar
            </p>
          </div>
          <ScoreRing score={result.score} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-100 px-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`mr-1 flex items-center gap-2 border-b-2 px-1 py-3.5 text-sm transition-colors ${
              active === tab.id
                ? "border-zinc-900 font-medium text-zinc-900"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            <span className={active === tab.id ? "text-zinc-700" : "text-zinc-400"}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {(active === "cv" || active === "cover") && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-zinc-400">
                {active === "cv" ? "Currículo reescrito para ATS" : "Carta de apresentação personalizada"}
              </p>
              <CopyButton text={active === "cv" ? result.optimizedCV : result.coverLetter} />
            </div>
            <pre className="whitespace-pre-wrap rounded-xl border border-zinc-100 bg-zinc-50 px-5 py-4 text-sm leading-relaxed text-zinc-700 font-sans">
              {active === "cv" ? result.optimizedCV : result.coverLetter}
            </pre>
          </div>
        )}

        {active === "tips" && (
          <ul className="space-y-3">
            {result.improvements.map((item, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3.5 text-sm text-zinc-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
