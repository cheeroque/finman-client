export default ({ store }, inject) => {
  inject('errorToast', (error, msg) => {
    let message
    if (msg) {
      message = msg
    } else if (error?.response?.statusText) {
      message = `${error?.response?.status}: ${error?.response?.statusText}`
    } else {
      message = 'Ошибка подключения'
    }
    store.dispatch('toast/showToast', {
      message,
      title: 'Ошибка',
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
