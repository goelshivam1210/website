import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A2B2F",
          color: "#3AAFB9",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: "0.06em",
          borderRadius: 40,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        SG
      </div>
    ),
    { ...size }
  );
}
