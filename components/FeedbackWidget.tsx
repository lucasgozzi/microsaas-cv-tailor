"use client";

import { useState, useEffect } from "react";

const REACTIONS = [
  { value: 1, emoji: "😞", label: "Ruim" },
  { value: 2, emoji: "😐", label: "Regular" },
  { value: 3, emoji: "😊", label: "Bom" },
  { value: 4, emoji: "🤩", label: "Incrível" },
];

function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);

  const dismiss = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  const handleSubmit = () => {
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: selected, comment }),
    }).catch(() => {});
    setSubmitted(true);
    setTimeout(dismiss, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        style={{ transition: "opacity 0.3s ease", opacity: closing ? 0 : 1 }}
        onClick={dismiss}
      />
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl shadow-black/20 p-6"
        style={{
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
          transform: closing ? "scale(0.92)" : "scale(1)",
          opacity: closing ? 0 : 1,
        }}
      >
        <button onClick={dismiss} className="absolute right-4 top-4 text-zinc-300 hover:text-zinc-500 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {submitted ? (
          <div className="py-4 text-center">
            <div className="text-4xl mb-3">🙏</div>
            <p className="font-semibold text-zinc-900">Obrigado pelo feedback!</p>
            <p className="mt-1 text-sm text-zinc-400">Isso nos ajuda muito.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <p className="font-semibold text-zinc-900">Como foi sua experiência?</p>
              <p className="mt-1 text-xs text-zinc-400">Leva 5 segundos e ajuda muito</p>
            </div>
            <div className="flex justify-center gap-2">
              {REACTIONS.map((r) => (
                <button key={r.value} onClick={() => setSelected(r.value)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-3.5 py-3 transition-all ${
                    selected === r.value
                      ? "border-indigo-300 bg-indigo-50 scale-110 shadow-sm"
                      : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:scale-105"
                  }`}
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <span className="text-[10px] text-zinc-500">{r.label}</span>
                </button>
              ))}
            </div>
            {selected !== null && (
              <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                  placeholder="O que poderia ser melhor? (opcional)" rows={3}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 resize-none"
                />
                <button onClick={handleSubmit}
                  className="mt-3 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
                >
                  Enviar feedback
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Fab({ onFeedback, showHint }: { onFeedback: () => void; showHint: boolean }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    if (!showHint) return;
    setHintVisible(true);
    const t = setTimeout(() => setHintVisible(false), 4000);
    return () => clearTimeout(t);
  }, [showHint]);

  const handleShare = async () => {
    const url = window.location.origin;
    if (navigator.share) {
      await navigator.share({ title: "JobAbroad.pro", text: "Otimizei meu CV para vagas internacionais com IA — grátis!", url }).catch(() => {});
      setOpen(false);
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // fallback for non-secure context
        const el = document.createElement("textarea");
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => { setCopied(false); setOpen(false); }, 2000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Hint tooltip */}
      {hintVisible && !open && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 mb-1 flex items-center gap-2 rounded-xl bg-zinc-900 px-3.5 py-2.5 text-xs font-medium text-white shadow-lg">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0 text-indigo-300">
            <path d="M1 1h11v7.5H8L5 12V8.5H1V1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
          Quer deixar seu feedback? Clique aqui
          <div className="absolute bottom-[3.75rem] right-5 h-2 w-2 rotate-45 bg-zinc-900" />
        </div>
      )}

      {open && (
        <>
          {/* Share */}
          <button onClick={handleShare}
            className="flex items-center gap-2.5 rounded-xl bg-white border border-zinc-200 shadow-lg px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all animate-in fade-in slide-in-from-bottom-2 duration-150"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="11.5" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="11.5" cy="12.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="3.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M5 6.5l5-3M5 8.5l5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            {copied ? "Link copiado!" : "Compartilhar"}
          </button>

          {/* Feedback */}
          <button onClick={() => { setOpen(false); onFeedback(); }}
            className="flex items-center gap-2.5 rounded-xl bg-white border border-zinc-200 shadow-lg px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 2h11v8H8.5L5 13v-3H2V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
            Feedback
          </button>
        </>
      )}

      {/* Main FAB */}
      <button onClick={() => { setOpen((o) => !o); setHintVisible(false); }}
        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all ${
          open ? "bg-zinc-900 rotate-45" : "bg-zinc-900 hover:bg-zinc-700 hover:scale-105"
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 4v10M4 9h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

export default function FeedbackWidget({ show }: { show: boolean }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [fabVisible, setFabVisible] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setModalVisible(true), 15000);
    return () => clearTimeout(t);
  }, [show]);

  const closeModal = () => {
    setModalVisible(false);
    setFabVisible(true);
    setShowHint(true);
  };

  return (
    <>
      {modalVisible && <FeedbackModal onClose={closeModal} />}
      {fabVisible && <Fab onFeedback={() => setModalVisible(true)} showHint={showHint} />}
    </>
  );
}
