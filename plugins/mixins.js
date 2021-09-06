export default ({ app }, inject) => {
  inject('monthApiLink', (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${date.getMonth() + 1}`
  })

  inject('dateWithFormat', (dateString, dateOptions, locale = 'ru-RU') => {
    const date = new Date(dateString)
    return date.toLocaleString(locale, dateOptions)
  })

  inject('isoDate', (date) => {
    const y = date.getFullYear().toString()
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    const d = date.getDate().toString().padStart(2, '0')
    return `${y}-${m}-${d}`
  })

  inject('isoTime', (date) => {
    const h = date.getHours().toString().padStart(2, '0')
    const m = date.getMinutes().toString().padStart(2, '0')
    const s = date.getSeconds().toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  })

  inject('isValidDate', (date) => {
    return date instanceof Date && !isNaN(date)
  })

  inject('sumWithFormat', (value, locale = 'ru-RU') => {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)
  })
}
