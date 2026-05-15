"use client";

import { useState } from "react";

const REACTIONS = [
  { value: 1, emoji: "😞", label: "Ruim" },
  { value: 2, emoji: "😐", label: "Regular" },
  { value: 3, emoji: "😊", label: "Bom" },
  { value: 4, emoji: "🤩", label: "Incrível" },
];

export default function FeedbackWidget() {
  const [selected, setSelected] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: selected, comment }),
    }).catch(() => {});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">
        <span className="text-lg">🙏</span>
        <p className="mt-1 text-sm font-medium text-emerald-700">Obrigado pelo feedback!</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-zinc-900 text-center">Como foi sua experiência?</p>
      <div className="mt-4 flex justify-center gap-3">
        {REACTIONS.map((r) => (
          <button
            key={r.value}
            onClick={() => setSelected(r.value)}
            className={`flex flex-col items-center gap-1.5 rounded-xl border px-4 py-3 transition-all ${
              selected === r.value
                ? "border-indigo-300 bg-indigo-50 scale-110 shadow-sm"
                : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-white hover:scale-105"
            }`}
          >
            <span className="text-2xl">{r.emoji}</span>
            <span className="text-xs text-zinc-500">{r.label}</span>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="mt-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Quer deixar um comentário? (opcional)"
            rows={3}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 resize-none"
          />
          <button
            onClick={handleSubmit}
            className="mt-3 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
          >
            Enviar feedback
          </button>
        </div>
      )}
    </div>
  );
}
