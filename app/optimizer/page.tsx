"use client";

import { useState } from "react";
import Link from "next/link";
import type { OptimizeResult } from "@/lib/openai";
import ResultTabs from "@/components/ResultTabs";

export default function OptimizerPage() {
  const [cv, setCv] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    const res = await fetch("/api/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cv, jobDescription }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Erro inesperado. Tente novamente.");
      return;
    }

    setResult(data as OptimizeResult);

    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const canSubmit = cv.trim().length > 50 && jobDescription.trim().length > 50;

  return (
    <main className="min-h-screen flex flex-col bg-zinc-50">
      {/* Nav */}
      <nav className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 7H2M5 3L1 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar
          </Link>
          <div className="h-4 w-px bg-zinc-200" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1L6.3 3.8L9.5 4.3L7 6.8L7.6 10L5 8.5L2.4 10L3 6.8L0.5 4.3L3.7 3.8L5 1Z" fill="white"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-900">CV Optimizer AI</span>
          </div>
        </div>
      </nav>

      <div className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900">Otimizar currículo</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Preencha os dois campos abaixo e clique em gerar.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Inputs */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* CV */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <label htmlFor="cv" className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  Seu CV
                </label>
                <span className={`text-xs ${cv.length > 9000 ? "text-red-400" : "text-zinc-400"}`}>
                  {cv.length.toLocaleString()}/10.000
                </span>
              </div>
              <textarea
                id="cv"
                value={cv}
                onChange={(e) => setCv(e.target.value)}
                maxLength={10000}
                placeholder="Cole aqui o texto completo do seu currículo..."
                rows={18}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-800 placeholder-zinc-300 shadow-sm outline-none ring-0 transition-all focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 resize-none"
              />
            </div>

            {/* Job */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <label htmlFor="job" className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-violet-50 text-violet-600">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L6 2l4 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.5 7.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  Descrição da vaga
                </label>
                <span className={`text-xs ${jobDescription.length > 4500 ? "text-red-400" : "text-zinc-400"}`}>
                  {jobDescription.length.toLocaleString()}/5.000
                </span>
              </div>
              <textarea
                id="job"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                maxLength={5000}
                placeholder="Cole aqui a descrição completa da vaga..."
                rows={18}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-800 placeholder-zinc-300 shadow-sm outline-none ring-0 transition-all focus:border-violet-300 focus:ring-2 focus:ring-violet-100 resize-none"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5">
              <svg className="mt-0.5 shrink-0 text-red-400" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit */}
          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/15 transition-all hover:bg-zinc-700 hover:shadow-xl hover:shadow-zinc-900/20 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:translate-y-0"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Otimizando com IA...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5L9.8 5.7L14.5 6.5L11 9.9L11.8 14.5L8 12.3L4.2 14.5L5 9.9L1.5 6.5L6.2 5.7L8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                  Gerar CV otimizado
                </>
              )}
            </button>
            {!canSubmit && (
              <p className="text-xs text-zinc-400">
                Preencha os dois campos para continuar
              </p>
            )}
          </div>
        </form>

        {/* Results */}
        {result && (
          <div id="results">
            <ResultTabs result={result} />
          </div>
        )}
      </div>
    </main>
  );
}
