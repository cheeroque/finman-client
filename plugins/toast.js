export default ({ store }, inject) => {
  inject('errorToast', (error) => {
    let message
    if (error?.response?.statusText) {
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
}
