import { PricingPage } from '@/components/landing/pricing-page'
import { ProductJsonLd } from '@/components/seo/json-ld'
import { constructMetadata } from '@/lib/constructMetadata'

export const metadata = constructMetadata({
  title: 'Pricing | RealtyLens - AI Real Estate Photo Editing from $99/project',
  description:
    'Simple, transparent pricing for AI real estate photo editing. $99 per project includes virtual staging, sky replacement, and unlimited edits. No subscriptions.',
  canonical: '/pricing',
  keywords: [
    'real estate photo editing pricing',
    'virtual staging cost',
    'AI photo editing price',
    'property photo editing rates',
    'affordable virtual staging',
  ],
})

export default function Page() {
  return (
    <>
      <ProductJsonLd
        name="RealtyLens AI Photo Editing"
        description="AI-powered real estate photo editing with virtual staging, sky replacement, and professional enhancement. Includes unlimited revisions."
        price="99"
        currency="USD"
      />
      <PricingPage />
    </>
  )
}
