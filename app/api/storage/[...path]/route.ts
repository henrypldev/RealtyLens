import { type NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const STORAGE_BUCKET = 'aistudio-bucket'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params

  if (!SUPABASE_URL) {
    return NextResponse.json({ error: 'Storage not configured' }, { status: 500 })
  }

  if (!path || path.length === 0) {
    return NextResponse.json({ error: 'Path required' }, { status: 400 })
  }

  const storagePath = path.join('/')
  const supabaseUrl = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${storagePath}`

  try {
    const response = await fetch(supabaseUrl, {
      headers: {
        Accept: request.headers.get('Accept') || '*/*',
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'File not found' }, { status: response.status })
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'CDN-Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 })
  }
}
