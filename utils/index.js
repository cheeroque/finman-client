export function formatSum(number, locale = 'ru', precision = 0) {
  return parseFloat(number || 0).toLocaleString(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })
}

export function formatDate(datestring, locale = 'ru', options = { dateStyle: 'short' }) {
  const timestamp = Date.parse(datestring)
  const date = isNaN(timestamp) ? new Date() : new Date(timestamp)
  return date.toLocaleString(locale, options)
}
