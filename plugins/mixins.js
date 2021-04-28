export default ({ app }, inject) => {
  inject('getPeriod', (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${date.getMonth() + 1}`
  })
}
