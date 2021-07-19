export const state = () => ({
  categories: [],
  records: {},
  total: 0
})

export const mutations = {
  SET_TOTAL(state, payload) {
    state.total = payload
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },
  SET_RECORDS(state, payload) {
    state.records = payload
  }
}

export const getters = {
  categoryById: (state) => (id) => {
    return state.categories.find((category) => category.id.toString() === id.toString()) || {}
  }
}

export const actions = {
  async fetchTotal({ commit }) {
    const total = await this.$axios.$get('total')
    commit('SET_TOTAL', total)
  },
  async fetchCategories({ commit }) {
    const categories = await this.$axios.$get('categories')
    commit('SET_CATEGORIES', categories)
  },
  async fetchRecords({ commit }, params = { perPage: 50 }) {
    const records = await this.$axios.$get('records', { params }).catch((error) => {
      // eslint-disable-next-line
      console.log(error)
    })
    commit('SET_RECORDS', records)
  },

  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchTotal')
    await dispatch('fetchCategories')
    await dispatch('fetchRecords')
  }
}
