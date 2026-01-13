export const siteConfig = {
  name: 'RealtyLens',
  title: 'RealtyLens - AI-Powered Real Estate Photo Editor',
  description:
    'Transform your real estate photos with AI. Professional virtual staging, sky replacement, and photo enhancement for property listings.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://www.realtylens.io',

  sourceCode: 'https://github.com/henrypldev/Proppi',

  ogImage: '/og-image.png',
  locale: 'en',
  keywords: [
    'real estate',
    'AI photo editor',
    'property photos',
    'virtual staging',
    'real estate photography',
    'property listing photos',
    'AI image enhancement',
  ],
  authors: [{ name: 'RealtyLens', url: 'https://www.realtylens.io' }],
  creator: 'RealtyLens',
  twitterHandle: '@realtylens',

  email: {
    from: 'noreply@updates.realtylens.io',
    replyTo: 'hello@realtylens.io',
  },

  // Links
  links: {
    dashboard: '/dashboard',
    settings: '/dashboard/settings',
    help: '/help',
  },
} as const

export type SiteConfig = typeof siteConfig
