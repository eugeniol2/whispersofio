import { NextResponse } from 'next/server'

const verifiedSlugs = new Map<string, boolean>()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  const cached = verifiedSlugs.get(slug)
  if (cached !== undefined) {
    return NextResponse.json({ valid: cached })
  }

  try {
    const response = await fetch(`https://zoom.earth/storms/${slug}/`, {
      method: 'HEAD',
      redirect: 'manual'
    })
    const valid = response.status === 200
    verifiedSlugs.set(slug, valid)
    return NextResponse.json({ valid })
  } catch {
    return NextResponse.json({ valid: false })
  }
}
