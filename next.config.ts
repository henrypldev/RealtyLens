import { withPostHogConfig } from '@posthog/nextjs-config'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ]
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  allowedDevOrigins: ['*.brown-ling.ts.net'],
}

export default withPostHogConfig(nextConfig, {
  personalApiKey: process.env.POSTHOG_PERSONAL_KEY!, // Your personal API key from PostHog settings
  envId: process.env.POSTHOG_ENV_ID!, // Your environment ID (project ID)
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST, // Optional: Your PostHog instance URL, defaults to https://us.posthog.com
  sourcemaps: {
    enabled: true, // Optional: Enable sourcemaps generation and upload, defaults to true on production builds
    project: 'RealtyLens', // Optional: Project name, defaults to git repository name
    deleteAfterUpload: true, // Optional: Delete sourcemaps after upload, defaults to true
  },
})
