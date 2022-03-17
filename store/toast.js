export const state = () => ({
  message: null,
  title: null,
  variant: null,
})

export const mutations = {
  SHOW_TOAST(state, { message, title, variant }) {
    state.message = message
    state.title = title
    state.variant = variant
  },
  CLEAR_TOAST(state) {
    state.message = null
    state.title = null
    state.variant = null
  },
}

export const actions = {
  showToast({ commit }, payload) {
    commit('SHOW_TOAST', payload)
  },
  clearToast({ commit }) {
    commit('CLEAR_TOAST')
  },
}
