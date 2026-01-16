import type { MetadataRoute } from 'next'
import { getMetadataBaseUrl } from '@/lib/constructMetadata'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getMetadataBaseUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/dashboard/*',
          '/admin',
          '/admin/*',
          '/video',
          '/video/*',
          '/api/',
          '/onboarding',
          '/invite/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/blog/', '/help/', '/about', '/pricing'],
        disallow: ['/dashboard', '/admin', '/video', '/api/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/blog/', '/help/'],
        disallow: ['/dashboard', '/admin', '/video', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
