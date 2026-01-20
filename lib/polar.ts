import { Polar } from '@polar-sh/sdk'

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: process.env.POLAR_SANDBOX === 'true' ? 'sandbox' : 'production',
})

export const POLAR_CONFIG = {
  ORGANIZATION_ID: process.env.POLAR_ORGANIZATION_ID!,
} as const

export type PolarProduct = {
  id: string
  name: string
  description: string | null
  priceCents: number
  currency: string
  maxImages: number
  benefits: string[]
}

let productsCache: PolarProduct[] | null = null
let productsCacheTime = 0
const CACHE_TTL = 1000 * 60 * 5

export function clearProductsCache() {
  productsCache = null
  productsCacheTime = 0
}

export async function getPolarProducts(): Promise<PolarProduct[]> {
  if (productsCache && Date.now() - productsCacheTime < CACHE_TTL) {
    return productsCache
  }

  const products: PolarProduct[] = []

  const result = await polar.products.list({
    organizationId: POLAR_CONFIG.ORGANIZATION_ID,
    isArchived: false,
  })

  for await (const page of result) {
    const items = page.result?.items || page.items || []
    for (const product of items) {
      const price = product.prices?.[0]
      const priceCents = price && 'priceAmount' in price ? (price.priceAmount as number) : 0
      const currency = price && 'priceCurrency' in price ? (price.priceCurrency as string) : 'usd'
      const metadata = product.metadata as Record<string, unknown> | null
      const maxImagesRaw = metadata?.maxImages
      const maxImages =
        typeof maxImagesRaw === 'number'
          ? maxImagesRaw
          : typeof maxImagesRaw === 'string'
            ? parseInt(maxImagesRaw, 10)
            : 0

      const benefits: string[] = []
      for (const benefit of product.benefits || []) {
        if (benefit.description) {
          benefits.push(benefit.description)
        }
      }

      products.push({
        id: product.id,
        name: product.name,
        description: product.description || null,
        priceCents,
        currency,
        maxImages,
        benefits,
      })
    }
  }

  products.sort((a, b) => a.priceCents - b.priceCents)

  productsCache = products
  productsCacheTime = Date.now()
  return products
}

export async function getProductForImageCount(imageCount: number): Promise<PolarProduct | null> {
  const products = await getPolarProducts()
  const validProducts = products.filter((p) => p.maxImages >= imageCount)
  return validProducts[0] || products[products.length - 1] || null
}

export async function getProductById(productId: string): Promise<PolarProduct | null> {
  const products = await getPolarProducts()
  return products.find((p) => p.id === productId) || null
}

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}
