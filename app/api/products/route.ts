import { NextResponse } from 'next/server'
import { clearProductsCache, getPolarProducts } from '@/lib/polar'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    if (searchParams.get('refresh') === 'true') {
      clearProductsCache()
    }

    const products = await getPolarProducts()
    return NextResponse.json({ products })
  } catch (error) {
    console.error('[api/products] Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', details: String(error) },
      { status: 500 },
    )
  }
}
