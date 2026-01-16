import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'RealtyLens'
  const description = searchParams.get('description') || 'AI-Powered Real Estate Photo Editor'
  const type = searchParams.get('type') || 'default' // 'default' | 'blog' | 'help'

  // Color scheme based on type
  const colors = {
    default: { bg: '#0a0a0a', accent: '#6366f1', text: '#ffffff' },
    blog: { bg: '#0f172a', accent: '#3b82f6', text: '#ffffff' },
    help: { bg: '#052e16', accent: '#22c55e', text: '#ffffff' },
  }

  const colorScheme = colors[type as keyof typeof colors] || colors.default

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colorScheme.bg,
        padding: '60px',
        position: 'relative',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 20%, ${colorScheme.accent}20 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${colorScheme.accent}10 0%, transparent 40%)`,
        }}
      />

      {/* Content container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${colorScheme.accent}, ${colorScheme.accent}99)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '24px', color: '#fff' }}>R</span>
          </div>
          <span
            style={{
              fontSize: '28px',
              fontWeight: 600,
              color: colorScheme.text,
              opacity: 0.9,
            }}
          >
            RealtyLens
          </span>
          {type !== 'default' && (
            <span
              style={{
                fontSize: '18px',
                color: colorScheme.accent,
                marginLeft: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {type}
            </span>
          )}
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 50 ? '48px' : '64px',
              fontWeight: 700,
              color: colorScheme.text,
              lineHeight: 1.1,
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: '24px',
                color: colorScheme.text,
                opacity: 0.8,
                margin: 0,
                maxWidth: '800px',
                lineHeight: 1.4,
              }}
            >
              {description.length > 150 ? `${description.slice(0, 150)}...` : description}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid ${colorScheme.text}20`,
            paddingTop: '24px',
          }}
        >
          <span style={{ fontSize: '18px', color: colorScheme.text, opacity: 0.6 }}>
            realtylens.studio
          </span>
          <span style={{ fontSize: '18px', color: colorScheme.accent }}>
            AI-Powered Photo Editing
          </span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
