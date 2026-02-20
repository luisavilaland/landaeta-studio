import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Landaeta Studio | Ads y Analítica para eCommerce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0f0f13",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid lines decorativas */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(91,95,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,95,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          display: "flex",
        }} />

        {/* Glow azul */}
        <div style={{
          position: "absolute",
          top: "60px", right: "80px",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(91,95,255,0.18) 0%, transparent 70%)",
          display: "flex",
        }} />

        {/* Glow rosa */}
        <div style={{
          position: "absolute",
          bottom: "40px", left: "200px",
          width: "300px", height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,91,141,0.1) 0%, transparent 70%)",
          display: "flex",
        }} />

        {/* Logo — wordmark en blanco */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0px",
        }}>
          {/* Reproducimos el logo como texto ya que es un wordmark tipográfico */}
          <span style={{
            fontSize: "28px",
            fontWeight: "300",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#ffffff",
          }}>
            LANDAETA STUDIO
          </span>
        </div>

        {/* Contenido central */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "700px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "8px",
          }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#5bffb8",
              display: "flex",
            }} />
            <span style={{ fontSize: "14px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5bffb8" }}>
              Agencia de Performance
            </span>
          </div>

          <div style={{
            fontSize: "62px",
            fontWeight: "700",
            lineHeight: "1.05",
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
          }}>
            <span>Ads + Analítica</span>
            <span style={{ color: "#5b5fff" }}>para tu eCommerce</span>
          </div>

          <p style={{
            fontSize: "22px",
            color: "#9090a8",
            lineHeight: "1.5",
            margin: "0",
            maxWidth: "580px",
          }}>
            Meta Ads · Google Ads · GA4 · Dashboards
          </p>
        </div>

        {/* Métricas decorativas abajo a la derecha */}
        <div style={{
          position: "absolute",
          right: "80px",
          bottom: "72px",
          display: "flex",
          gap: "16px",
        }}>
          {[
            { label: "ROAS", value: "3.4x", color: "#5bffb8" },
            { label: "CAC", value: "-18%", color: "#5b5fff" },
            { label: "CVR", value: "+0.7pp", color: "#ff5b8d" },
          ].map((m) => (
            <div key={m.label} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "14px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              minWidth: "90px",
            }}>
              <span style={{ fontSize: "11px", color: "#6b6b80", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {m.label}
              </span>
              <span style={{ fontSize: "24px", fontWeight: "700", color: m.color }}>
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          position: "absolute",
          left: "80px",
          bottom: "72px",
          fontSize: "14px",
          color: "#4a4a5e",
          letterSpacing: "0.08em",
        }}>
          landaetastudio.com
        </div>
      </div>
    ),
    { ...size }
  );
}