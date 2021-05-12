export const state = () => ({
  categories: [],
  total: 0
})

export const mutations = {
  SET_TOTAL(state, payload) {
    state.total = payload
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  }
}

export const actions = {
  async getTotal({ commit }) {
    const total = await this.$axios.$get('total')
    commit('SET_TOTAL', total)
  },
  async getCategories({ commit }) {
    const categories = await this.$axios.$get('categories')
    commit('SET_CATEGORIES', categories)
  }
}
