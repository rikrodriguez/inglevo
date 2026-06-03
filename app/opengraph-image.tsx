import { ImageResponse } from "next/og";

export const alt = "Inglevo verified profile for LATAM remote talent";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fbfbfd",
          color: "#08080a",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              fontSize: 34,
              fontWeight: 800,
              gap: 16,
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: "linear-gradient(135deg,#7459f6,#5fb7f7,#de61bf)",
                borderRadius: 20,
                color: "white",
                display: "flex",
                fontSize: 30,
                height: 52,
                justifyContent: "center",
                width: 52,
              }}
            >
              IV
            </div>
            Inglevo
          </div>
          <div
            style={{
              color: "#6f45dd",
              display: "flex",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 1.4,
              textTransform: "uppercase",
            }}
          >
            Verified English for LATAM remote talent
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 900,
              letterSpacing: -5,
              lineHeight: 0.94,
              maxWidth: 680,
            }}
          >
            Build stronger hiring signals for US remote roles.
          </div>
          <div style={{ color: "#5f646d", display: "flex", fontSize: 30, lineHeight: 1.35, maxWidth: 650 }}>
            Role English, remote setup, tools and professional readiness in one
            verified profile.
          </div>
        </div>
        <div
          style={{
            background: "white",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 42,
            boxShadow: "0 34px 110px rgba(40,31,89,0.18)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            padding: 34,
            width: 360,
          }}
        >
          {["English", "Remote setup", "Role tools"].map((label, index) => (
            <div
              key={label}
              style={{
                background: "#f8f8f7",
                borderRadius: 24,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: 22,
              }}
            >
              <div style={{ display: "flex", fontSize: 24, fontWeight: 800, justifyContent: "space-between" }}>
                <span>{label}</span>
                <span style={{ color: "#15803d" }}>Verified</span>
              </div>
              <div style={{ background: "#e7e4df", borderRadius: 999, display: "flex", height: 12 }}>
                <div
                  style={{
                    background: "linear-gradient(90deg,#7459f6,#5fb7f7,#de61bf)",
                    borderRadius: 999,
                    height: "100%",
                    width: `${91 - index * 8}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
