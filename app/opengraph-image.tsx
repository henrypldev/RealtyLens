import { ImageResponse } from "next/og";
import { loadOutfitFont } from "@/lib/og-fonts";
import { OG_COLORS, OG_FONTS, OG_SIZE } from "@/lib/og-styles";

export const runtime = "edge";
export const alt = "Proppi - AI-Powered Real Estate Photo Editor";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const title = "Proppi";
  const tagline = "AI-Powered Real Estate Photo Editor";

  const [fontBold, fontRegular] = await Promise.all([
    loadOutfitFont(title, 700),
    loadOutfitFont(tagline, 400),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${OG_COLORS.background} 0%, ${OG_COLORS.backgroundGradientEnd} 100%)`,
        padding: "60px",
        fontFamily: "Outfit",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `linear-gradient(180deg, ${OG_COLORS.accent}20 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `linear-gradient(0deg, ${OG_COLORS.secondary}60 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "80px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: `3px solid ${OG_COLORS.accent}30`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: "24px",
          zIndex: 1,
        }}
      >
        {/* Brand name */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: 700,
            color: OG_COLORS.text,
            letterSpacing: "-2px",
          }}
        >
          {title}
        </div>

        {/* Accent bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "4px",
              backgroundColor: OG_COLORS.accent,
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: OG_COLORS.accent,
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              width: "60px",
              height: "4px",
              backgroundColor: OG_COLORS.accent,
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: OG_FONTS.subheading + 4,
            color: OG_COLORS.text,
            opacity: 0.7,
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          {tagline}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px solid ${OG_COLORS.border}`,
          paddingTop: "24px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: OG_FONTS.body,
            fontWeight: 700,
            color: OG_COLORS.accent,
          }}
        >
          Proppi
        </div>
        <div
          style={{
            fontSize: OG_FONTS.small,
            color: OG_COLORS.textMuted,
          }}
        >
          proppi.tech
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Outfit",
          data: fontBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Outfit",
          data: fontRegular,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
