export function getApodPageUrl(date: string): string {
  const [year, month, day] = date.split('-')
  return `https://apod.nasa.gov/apod/ap${year.slice(2)}${month}${day}.html`
}
