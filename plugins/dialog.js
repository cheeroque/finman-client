export default ({ store }, inject) => {
  inject('dialog', (component, componentProps, dialogProps) => {
    store.dispatch('dialog/showDialog', {
      component,
      componentProps,
      dialogProps,
      isFullscreen: false,
    })
  })

  inject('dialogFullscreen', (component, componentProps, dialogProps) => {
    store.dispatch('dialog/showDialog', {
      component,
      componentProps,
      dialogProps,
      isFullscreen: true,
    })
  })
}
