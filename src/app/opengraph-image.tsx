import { ImageResponse } from "next/og";

export const alt = "Kritrimam is artificial. We are here to make it deliberate.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated OG card — dark ground, brass + indigo italic accents.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B1013",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C2954A",
            fontFamily: "monospace",
          }}
        >
          Kritrimam Research Lab — Kerala, India
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 76,
            lineHeight: 1.1,
            color: "#E4E2D9",
            maxWidth: 980,
          }}
        >
          <span>Kritrimam is&nbsp;</span>
          <span style={{ color: "#C2954A", fontStyle: "italic" }}>artificial.</span>
          <span>&nbsp;We are here to make it&nbsp;</span>
          <span style={{ color: "#4E5FC4", fontStyle: "italic" }}>deliberate.</span>
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#8B9298",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          NEST.ai · Budhi
        </div>
      </div>
    ),
    { ...size },
  );
}
