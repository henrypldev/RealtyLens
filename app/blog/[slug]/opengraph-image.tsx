import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const alt = "Proppi Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title || "Blog Post";
  const category = post?.category || "Article";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FAF8F5",
        padding: "60px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Category badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            backgroundColor: "#C97A4A",
            color: "white",
            padding: "8px 20px",
            borderRadius: "20px",
            fontSize: "18px",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          {category}
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#3D3426",
            lineHeight: 1.2,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
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
            display: "flex",
            alignItems: "center",
            gap: "12px",
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
            Blog
          </div>
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
