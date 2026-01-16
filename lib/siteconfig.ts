export const siteConfig = {
  name: 'RealtyLens',
  title: 'RealtyLens - AI-Powered Real Estate Photo Editor | Virtual Staging & Enhancement',
  description:
    'Transform your real estate photos with AI in seconds. Professional virtual staging, sky replacement, decluttering, and photo enhancement for property listings. Used by 500+ real estate agents.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://www.realtylens.studio',

  sourceCode: 'https://github.com/henrypldev/Proppi',

  ogImage: '/api/og',
  locale: 'en',
  // Comprehensive SEO keywords optimized for real estate photography market
  keywords: [
    // Primary keywords
    'real estate photo editor',
    'AI photo editing',
    'virtual staging',
    'property photo enhancement',
    // Secondary keywords
    'real estate photography',
    'property listing photos',
    'AI image enhancement',
    'real estate marketing',
    // Long-tail keywords
    'virtual staging software',
    'AI virtual staging for real estate',
    'property photo editing tool',
    'real estate photo editing service',
    'automatic photo enhancement',
    // Feature-specific
    'sky replacement',
    'photo decluttering',
    'lawn enhancement',
    'interior photo editing',
    'exterior photo editing',
    // Industry terms
    'MLS photo editing',
    'listing photos',
    'property photography',
    'real estate agent tools',
    'realtor marketing tools',
    // Geographic modifiers (helps with local SEO)
    'online photo editor',
    'cloud-based photo editing',
  ],
  authors: [{ name: 'RealtyLens', url: 'https://www.realtylens.studio' }],
  creator: 'RealtyLens',
  twitterHandle: '@realtylens',

  email: {
    from: 'hello@realtylens.studio',
    replyTo: 'hello@realtylens.studio',
  },

  // Links
  links: {
    dashboard: '/dashboard',
    settings: '/dashboard/settings',
    help: '/help',
  },
} as const

export type SiteConfig = typeof siteConfig
