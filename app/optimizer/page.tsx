"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { LANGUAGES, TARGET_COUNTRIES, type LanguageCode, type TargetCountry } from "@/lib/openai";
import type { OptimizeResult } from "@/lib/openai";
import ResultTabs from "@/components/ResultTabs";
import FeedbackWidget from "@/components/FeedbackWidget";


export default function OptimizerPage() {
  const { data: session } = useSession();
  const [cv, setCv] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [language, setLanguage] = useState<LanguageCode>("pt");
  const [targetCountry, setTargetCountry] = useState<TargetCountry>("Remote / Global");
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const savedCv = localStorage.getItem("jobabroad:cv");
    const savedJob = localStorage.getItem("jobabroad:job");
    const savedLang = localStorage.getItem("jobabroad:lang") as LanguageCode | null;
    const savedCountry = localStorage.getItem("jobabroad:country") as TargetCountry | null;
    if (savedCv) setCv(savedCv);
    if (savedJob) setJobDescription(savedJob);
    if (savedLang && savedLang in LANGUAGES) setLanguage(savedLang);
    if (savedCountry && (TARGET_COUNTRIES as readonly string[]).includes(savedCountry)) setTargetCountry(savedCountry);
  }, []);

  const handleCvChange = (value: string) => { setCv(value); localStorage.setItem("jobabroad:cv", value); };
  const handleJobChange = (value: string) => { setJobDescription(value); localStorage.setItem("jobabroad:job", value); };
  const handleLanguageChange = (code: LanguageCode) => { setLanguage(code); localStorage.setItem("jobabroad:lang", code); };
  const handleCountryChange = (c: TargetCountry) => { setTargetCountry(c); localStorage.setItem("jobabroad:country", c); };

  const submitForm = useCallback(async (cvVal: string, jobVal: string, langVal: LanguageCode, countryVal: TargetCountry) => {
    setError("");
    setResult(null);
    setLoading(true);

    const res = await fetch("/api/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cv: cvVal, jobDescription: jobVal, language: langVal, targetCountry: countryVal }),
    });

    let data: Record<string, unknown> = {};
    try { data = await res.json(); } catch { /* empty body */ }
    setLoading(false);

    if (!res.ok) { setError((data.error as string) ?? "Erro inesperado. Tente novamente."); return; }

    if (typeof data.remaining === "number") setRemaining(data.remaining);

    setResult(data as unknown as OptimizeResult);
    setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 100);
  }, []);

  useEffect(() => {
    if (!session) return;
    const pending = localStorage.getItem("jobabroad:pending_submit");
    if (!pending) return;
    localStorage.removeItem("jobabroad:pending_submit");
    const savedCv = localStorage.getItem("jobabroad:cv") ?? "";
    const savedJob = localStorage.getItem("jobabroad:job") ?? "";
    const savedLang = (localStorage.getItem("jobabroad:lang") as LanguageCode) ?? "pt";
    const savedCountry = (localStorage.getItem("jobabroad:country") as TargetCountry) ?? "Remote / Global";
    if (savedCv.trim().length > 50 && savedJob.trim().length > 50) {
      submitForm(savedCv, savedJob, savedLang, savedCountry);
    }
  }, [session, submitForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(cv, jobDescription, language, targetCountry);
  };

  const handleGoogleSignIn = () => {
    localStorage.setItem("jobabroad:pending_submit", "1");
    signIn("google");
  };

  const canSubmit = cv.trim().length > 50 && jobDescription.trim().length > 50;

  return (
    <main className="min-h-screen flex flex-col bg-zinc-50">
      {/* Nav */}
      <nav className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10 7H2M5 3L1 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar
            </Link>
            <div className="h-4 w-px bg-zinc-200" />
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="5" r="3.5" stroke="white" strokeWidth="1.2"/>
                  <path d="M5 1.5C5 1.5 3.5 3 3.5 5s1.5 3.5 1.5 3.5M5 1.5c0 0 1.5 1.5 1.5 3.5S5 8.5 5 8.5M1.5 5h7" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-sm font-semibold text-zinc-900">JobAbroad.pro</span>
            </div>
          </div>
          {session?.user && (
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-zinc-500 sm:block">{session.user.email}</span>
              <button onClick={() => signOut()} className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">Sair</button>
            </div>
          )}
        </div>
      </nav>

      <div className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900">Otimize seu currículo</h1>
          <p className="mt-1 text-sm text-zinc-500">Cole seu CV, a descrição da vaga e selecione o país de destino.</p>
        </div>

        <form onSubmit={handleSubmit}>
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
                <div className="flex items-center gap-3">
                  {cv.length > 0 && (
                    <span className="flex items-center gap-1 text-xs text-emerald-500">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Salvo
                    </span>
                  )}
                  <span className={`text-xs ${cv.length > 9000 ? "text-red-400" : "text-zinc-400"}`}>{cv.length.toLocaleString()}/10,000</span>
                </div>
              </div>
              <textarea id="cv" value={cv} onChange={(e) => handleCvChange(e.target.value)} maxLength={10000}
                placeholder="Cole aqui o texto completo do seu currículo..."
                rows={18}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-800 placeholder-zinc-300 shadow-sm outline-none transition-all focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 resize-none"
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
                <span className={`text-xs ${jobDescription.length > 4500 ? "text-red-400" : "text-zinc-400"}`}>{jobDescription.length.toLocaleString()}/5,000</span>
              </div>
              <textarea id="job" value={jobDescription} onChange={(e) => handleJobChange(e.target.value)} maxLength={5000}
                placeholder="Cole aqui a descrição completa da vaga..."
                rows={18}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-800 placeholder-zinc-300 shadow-sm outline-none transition-all focus:border-violet-300 focus:ring-2 focus:ring-violet-100 resize-none"
              />
            </div>
          </div>

          {/* Target country */}
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
            <label htmlFor="country" className="flex items-center gap-2 text-sm font-medium text-zinc-700 shrink-0">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="6.5" stroke="#6366f1" strokeWidth="1.3"/>
                <path d="M7.5 1C7.5 1 5 4 5 7.5s2.5 6.5 2.5 6.5M7.5 1c0 0 2.5 3 2.5 6.5S7.5 14 7.5 14M1 7.5h13" stroke="#6366f1" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              País de destino
            </label>
            <select
              id="country"
              value={targetCountry}
              onChange={(e) => handleCountryChange(e.target.value as TargetCountry)}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 shadow-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            >
              {TARGET_COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Language */}
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 shrink-0 sm:ml-4">
              Idioma do resultado
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(LANGUAGES) as [LanguageCode, string][]).map(([code, name]) => (
                <button key={code} type="button" onClick={() => handleLanguageChange(code)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    language === code
                      ? "border-indigo-300 bg-indigo-50 text-indigo-700 shadow-sm"
                      : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
                  }`}
                >{name}</button>
              ))}
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
            {session ? (
              <button type="submit" disabled={!canSubmit || loading}
                className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/15 transition-all hover:bg-zinc-700 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:translate-y-0"
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
            ) : (
              <button type="button" disabled={!canSubmit} onClick={handleGoogleSignIn}
                className="inline-flex items-center gap-2.5 rounded-xl bg-white border border-zinc-200 px-7 py-3.5 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:translate-y-0"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.68 3.68 0 0 1-1.6 2.42v2h2.58c1.51-1.39 2.4-3.44 2.4-5.88z" fill="#4285F4"/>
                  <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.58-2a4.8 4.8 0 0 1-7.14-2.52H.96v2.06A8 8 0 0 0 8 16z" fill="#34A853"/>
                  <path d="M3.58 9.54A4.82 4.82 0 0 1 3.33 8c0-.54.09-1.06.25-1.54V4.4H.96A8.01 8.01 0 0 0 0 8c0 1.29.31 2.51.96 3.6l2.62-2.06z" fill="#FBBC05"/>
                  <path d="M8 3.18c1.22 0 2.31.42 3.17 1.24l2.37-2.37A7.94 7.94 0 0 0 8 0 8 8 0 0 0 .96 4.4l2.62 2.06A4.77 4.77 0 0 1 8 3.18z" fill="#EA4335"/>
                </svg>
                Entrar com Google para continuar
              </button>
            )}
            {!canSubmit && <p className="text-xs text-zinc-400">Preencha os dois campos para continuar</p>}
            {canSubmit && session && remaining !== null && (
              <p className="text-xs text-zinc-400">
                {remaining === 0 ? "Último uso do dia utilizado" : `${remaining} uso${remaining !== 1 ? "s" : ""} restante${remaining !== 1 ? "s" : ""} hoje`}
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

        <FeedbackWidget show={!!result} />
      </div>
    </main>
  );
}
