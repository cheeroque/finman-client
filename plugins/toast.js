export default ({ i18n, store }, inject) => {
  inject('errorToast', (error, msg) => {
    let message
    if (msg) {
      message = msg
    } else if (error?.response?.statusText) {
      message = `${error?.response?.status}: ${error?.response?.statusText}`
    } else {
      message = i18n.t('connectionError')
    }
    store.dispatch('toast/showToast', {
      message,
      title: i18n.t('error.error'),
      variant: 'danger',
    })
  })

  inject('infoToast', (message, title) => {
    store.dispatch('toast/showToast', {
      message,
      title,
      variant: 'success',
    })
  })
}
