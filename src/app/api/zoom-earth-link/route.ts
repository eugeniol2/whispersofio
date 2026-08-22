import { NextResponse } from 'next/server'

// We only guess the zoom.earth URL from NASA's own storm title — there's
// no official pairing between the two sites, so this confirms the guess
// actually resolves before the client ever shows it. zoom.earth serves
// 200 for a real storm page and redirects (3xx) to its homepage for a
// slug that doesn't exist, so that distinction is exactly what we check.
// A storm page never stops existing once created, so once verified,
// cache indefinitely for the life of this server process.
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
