export default ({ app }, inject) => {
  inject('monthApiLink', (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${date.getMonth() + 1}`
  })
  inject('dateWithFormat', (dateString, dateOptions, locale = 'ru-RU') => {
    const date = new Date(dateString)
    return date.toLocaleString(locale, dateOptions)
  })
}
