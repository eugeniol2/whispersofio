// APOD pages are addressed as apYYMMDD.html, e.g. 2026-08-21 -> ap260821.html
export function getApodPageUrl(date: string): string {
  const [year, month, day] = date.split('-')
  return `https://apod.nasa.gov/apod/ap${year.slice(2)}${month}${day}.html`
}
