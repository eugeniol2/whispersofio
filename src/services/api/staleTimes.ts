// Every route seeds its queries during SSR and is then held by ISR. A client
// refetch that happens sooner than the route can regenerate only re-requests
// what the server already embedded in the HTML, so these mirror the
// `export const revalidate` of the page that seeds each query.
export const STALE_TIME_HOURLY = 60 * 60 * 1000
export const STALE_TIME_QUARTER_HOURLY = 15 * 60 * 1000
