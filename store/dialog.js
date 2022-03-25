export const state = () => ({
  component: null,
  componentProps: {},
  dialogProps: {},
  isFullscreen: false,
  visible: false,
})

export const getters = {
  dialogVisible: (state) => state.visible,
}

export const mutations = {
  SHOW_DIALOG(state, { component, componentProps, dialogProps, isFullscreen }) {
    state.component = component
    state.componentProps = componentProps
    state.dialogProps = dialogProps
    state.isFullscreen = isFullscreen
    state.visible = true
  },
  CLEAR_DIALOG(state) {
    state.visible = false
    state.component = null
    state.componentProps = {}
    state.dialogProps = {}
    state.isFullscreen = false
  },
}

export const actions = {
  showDialog({ commit }, payload) {
    commit('SHOW_DIALOG', payload)
  },
  clearDialog({ commit }) {
    commit('CLEAR_DIALOG')
  },
}
