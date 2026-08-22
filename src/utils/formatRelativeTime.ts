const relativeTimeFormatter = new Intl.RelativeTimeFormat('en-US', {
  numeric: 'auto'
})

export function formatRelativeTime(dateString: string): string {
  const diffHours = Math.round(
    (new Date(dateString).getTime() - Date.now()) / (1000 * 60 * 60)
  )

  if (Math.abs(diffHours) < 24) {
    return relativeTimeFormatter.format(diffHours, 'hour')
  }

  return relativeTimeFormatter.format(Math.round(diffHours / 24), 'day')
}
