import { ImageResponse } from "next/og";

export const alt = "Kritrimam is artificial. We are here to make it deliberate.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated OG card — matches the monochrome design tokens in globals.css.
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
          background: "#060606",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#ffffff",
            fontFamily: "monospace",
          }}
        >
          KRITRIMAM RESEARCH LAB — KERALA, INDIA
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 76,
            lineHeight: 1.1,
            color: "#ededed",
            maxWidth: 980,
          }}
        >
          <span>Kritrimam is&nbsp;</span>
          <span style={{ color: "#ffffff", fontStyle: "italic" }}>artificial.</span>
          <span>&nbsp;We are here to make it&nbsp;</span>
          <span style={{ color: "#b0b0b0", fontStyle: "italic" }}>deliberate.</span>
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#8c8c8c",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          NEST.ai · Budhi · www.kritrimam.com
        </div>
      </div>
    ),
    { ...size },
  );
}
