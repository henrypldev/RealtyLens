import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pricing - Proppi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAF8F5",
        padding: "60px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: "24px",
        }}
      >
        {/* Page title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#3D3426",
          }}
        >
          Simple Pricing
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "28px",
            color: "#3D3426",
            opacity: 0.7,
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Pay per project, no subscriptions. Transparent pricing for real estate
          professionals.
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: "120px",
            height: "6px",
            backgroundColor: "#C97A4A",
            borderRadius: "3px",
            marginTop: "16px",
          }}
        />
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(61, 52, 38, 0.1)",
          paddingTop: "24px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#C97A4A",
          }}
        >
          Proppi
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#3D3426",
            opacity: 0.5,
          }}
        >
          proppi.tech
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
