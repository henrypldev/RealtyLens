/**
 * Shared OG image constants and styles
 */

export const OG_SIZE = { width: 1200, height: 630 }

export const OG_COLORS = {
  background: '#FAF8F5',
  backgroundGradientStart: '#FAF8F5',
  backgroundGradientEnd: '#F5EDE6',
  text: '#3D3426',
  textMuted: 'rgba(61, 52, 38, 0.6)',
  accent: '#C97A4A',
  accentLight: '#E8A878',
  secondary: '#E8DDD4',
  border: 'rgba(61, 52, 38, 0.1)',
}

export const OG_FONTS = {
  heading: 64,
  headingLarge: 72,
  subheading: 28,
  body: 24,
  small: 20,
}

// Shared base styles for OG images
export const baseContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '60px',
  fontFamily: 'Outfit, system-ui, sans-serif',
  position: 'relative',
  overflow: 'hidden',
}

export const footerStyle: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: `1px solid ${OG_COLORS.border}`,
  paddingTop: '24px',
  marginTop: 'auto',
}

export const brandStyle: React.CSSProperties = {
  fontSize: OG_FONTS.body,
  fontWeight: 700,
  color: OG_COLORS.accent,
}

export const domainStyle: React.CSSProperties = {
  fontSize: OG_FONTS.small,
  color: OG_COLORS.textMuted,
}
