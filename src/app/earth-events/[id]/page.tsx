import { EarthEventDetail } from '@/features/EarthEvents/EventDetail'

interface EarthEventDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function EarthEventDetailPage({
  params
}: EarthEventDetailPageProps) {
  const { id } = await params
  return <EarthEventDetail id={id} />
}
