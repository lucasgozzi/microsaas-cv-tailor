import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JobAbroad.pro — Currículo otimizado para vagas internacionais";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f10 0%, #18181b 60%, #1e1b4b 100%)",
          padding: "64px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg, #6366f1, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            🌐
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
            JobAbroad.pro
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 900,
          }}
        >
          Seu currículo{" "}
          <span style={{ color: "#a5b4fc" }}>otimizado para vagas internacionais</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          CV · Cover Letter · Score ATS — em menos de 10 segundos
        </div>

        {/* Countries */}
        <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
          {["🇵🇹 Portugal", "🇩🇪 Alemanha", "🇳🇱 Holanda", "🇮🇪 Irlanda"].map((c) => (
            <div
              key={c}
              style={{
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.8)",
                fontSize: 18,
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
