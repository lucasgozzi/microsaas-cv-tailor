"use client";

interface Props {
  score: number;
}

export default function ScoreRing({ score }: Props) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const { color, bg, label } =
    score >= 75
      ? { color: "#22c55e", bg: "#f0fdf4", label: "Excelente" }
      : score >= 50
      ? { color: "#f59e0b", bg: "#fffbeb", label: "Bom" }
      : { color: "#ef4444", bg: "#fef2f2", label: "Fraco" };

  return (
    <div
      className="flex items-center gap-4 rounded-2xl px-5 py-4"
      style={{ background: bg }}
    >
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8"/>
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)" }}
        />
        <text x="44" y="49" textAnchor="middle" fontSize="20" fontWeight="700" fill={color}>
          {score}
        </text>
      </svg>
      <div>
        <p className="text-xs font-medium text-zinc-500">Score de match</p>
        <p className="text-lg font-bold" style={{ color }}>{label}</p>
        <p className="text-xs text-zinc-400">{score}/100 pontos</p>
      </div>
    </div>
  );
}
