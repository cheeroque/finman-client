export function formatSum(number, locale = 'ru', precision = 0) {
  return parseFloat(number || 0).toLocaleString(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })
}

export function formatDate(
  datestring,
  locale = 'ru',
  options = { dateStyle: 'short' }
) {
  const timestamp = Date.parse(datestring)
  const date = isNaN(timestamp) ? new Date() : new Date(timestamp)
  return date.toLocaleString(locale, options)
}

export function formatPeriod(period, locale, yearDigits = 2) {
  if (!period) return
  const periodArr = `${period}`.split('-')
  const year = periodArr[0]
  const month = periodArr[1] || 1
  const date = new Date(parseInt(year), parseInt(month) - 1)

  const YY = date.toLocaleString(locale, {
    year: yearDigits === 2 ? '2-digit' : 'numeric',
  })
  let MM = date.toLocaleString(locale, { month: 'long' })
  MM = MM.charAt(0).toUpperCase() + MM.slice(1)
  return `${MM} ${YY}`
}

export function isRouteActive(routes = [], currentRoute) {
  if (!routes || !routes.length) return
  const results = []
  routes.forEach((route) => {
    if (route === '/') results.push(route === currentRoute)
    else results.push(currentRoute.startsWith(route))
  })
  return results.some((result) => Boolean(result))
}

export function getContrastColor(hexColor, black = '#000', white = '#fff') {
  if (!(hexColor && hexColor.length)) return black
  const color = hexColor.substring(1)
  const rgb = []
  let lightness = 255
  for (let i = 0; i < 3; i++) {
    rgb[i] = parseInt(color.substr(i * 2, 2), 16)
  }
  lightness = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
  return lightness >= 165 ? black : white
}

export function getViewportWidth() {
  return Math.min(
    window?.innerWidth,
    document.documentElement.getBoundingClientRect().width
  )
}
