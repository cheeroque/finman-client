export const state = () => ({
  categories: [],
  currentMonthRecords: [],
  dialogOpen: false,
  drawerOpen: false,
  latestSnapshot: {},
  locale: 'ru',
  records: [],
  recordsTotal: null,
  // searchResults: [],
  scrolledToBottom: false,
  total: 0,
})

export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },
  SET_CURRENT_MONTH_RECORDS(state, payload) {
    state.currentMonthRecords = payload
  },
  SET_DIALOG_OPEN(state, payload) {
    state.dialogOpen = payload
  },
  SET_DRAWER_OPEN(state, payload) {
    state.drawerOpen = payload
  },
  SET_LATEST_SNAPSHOT(state, payload) {
    state.latestSnapshot = payload
  },
  SET_RECORDS(state, payload) {
    state.records = payload
  },
  SET_RECORDS_TOTAL(state, payload) {
    state.recordsTotal = payload
  },
  // SET_SEARCH_RESULTS(state, payload) {
  //   state.searchResults = payload
  // },
  SET_SCROLLED_TO_BOTTOM(state, payload) {
    state.scrolledToBottom = payload
  },
  SET_TOTAL(state, payload) {
    state.total = payload
  },
}

export const getters = {
  categories: (state) => state.categories,
  currentMonthRecords: (state) => state.currentMonthRecords,
  drawerOpen: (state) => state.drawerOpen,
  latestSnapshot: (state) => state.latestSnapshot,
  locale: (state) => state.locale,
  records: (state) => state.records,
  recordsTotal: (state) => state.recordsTotal,
  // searchResults: (state) => state.searchResults,
  scrolledToBottom: (state) => state.scrolledToBottom,
  total: (state) => state.total,
}

export const actions = {
  async fetchRecords({ commit }, params) {
    const order = params.order || 'DESC'
    const orderBy = params.orderBy || 'created_at'
    const page = params.page || 1
    const perPage = params.perPage || 50
    const show = params.show || null

    const { data, total } = await this.$axios
      .$get('records', { params: { order, orderBy, page, perPage, show } })
      .catch((error) => {
        throw error
      })
    commit('SET_RECORDS', data)
    commit('SET_RECORDS_TOTAL', total)
  },

  async fetchRecordById(_, id) {
    const record = await this.$axios.$get(`records/${id}`).catch((error) => {
      throw error
    })
    record.created_at = new Date(record.created_at)
    return record
  },

  async fetchRecordsByCategory(_, { categoryId, params }) {
    const records = await this.$axios
      .$get(`category/${categoryId}`, { params })
      .catch((error) => {
        throw error
      })
    return records
  },

  async fetchRecordsByPeriod(_, { period }) {
    const records = await this.$axios.$get(`month/${period}`).catch((error) => {
      throw error
    })
    return records
  },

  async fetchFirstRecord() {
    const record = await this.$axios.$get('records/first').catch((error) => {
      throw error
    })
    return record
  },

  async fetchCurrentMonthRecords({ commit }) {
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const records = await this.$axios.$get(`month/${y}-${m}`).catch((error) => {
      throw error
    })
    commit('SET_CURRENT_MONTH_RECORDS', records)
  },

  async storeRecord(_, payload) {
    await this.$axios.$post('records', payload).catch((error) => {
      throw error
    })
  },

  async updateRecord(_, payload) {
    await this.$axios.$put(`records/${payload.id}`, payload).catch((error) => {
      throw error
    })
  },

  async deleteRecord(_, id) {
    await this.$axios.$delete(`records/${id}`).catch((error) => {
      throw error
    })
  },

  async fetchCategories({ commit }) {
    const categories = await this.$axios.$get('categories').catch((error) => {
      throw error
    })
    commit('SET_CATEGORIES', categories)
  },

  async fetchCategoryById(_, id) {
    const categories = await this.$axios
      .$get(`categories/${id}`)
      .catch((error) => {
        throw error
      })
    return categories
  },

  async storeCategory(_, payload) {
    await this.$axios.$post('categories', payload).catch((error) => {
      throw error
    })
  },

  async updateCategory(_, payload) {
    await this.$axios
      .$put(`categories/${payload.id}`, payload)
      .catch((error) => {
        throw error
      })
  },

  async deleteCategory(_, id) {
    await this.$axios.$delete(`categories/${id}`).catch((error) => {
      throw error
    })
  },

  async fetchLatestShapshot({ commit }) {
    const snapshot = await this.$axios.$get('revises/latest').catch((error) => {
      throw error
    })
    commit('SET_LATEST_SNAPSHOT', snapshot)
  },

  async fetchTotal({ commit }) {
    const total = await this.$axios.$get('total').catch((error) => {
      throw error
    })
    commit('SET_TOTAL', total)
  },

  setDialogOpen({ commit }, payload) {
    commit('SET_DIALOG_OPEN', payload)
  },

  setDrawerOpen({ commit }, payload) {
    commit('SET_DRAWER_OPEN', payload)
  },

  setScrolledToBottom({ commit }, payload) {
    commit('SET_SCROLLED_TO_BOTTOM', payload)
  },

  /* To rework */

  // async fetchSearchResults({ commit, dispatch }, params) {
  //   const total = await this.$axios
  //     .$get('search', { params })
  //     .catch((error) => {
  //       dispatch('setError', { path: 'search', error })
  //     })
  //   commit('SET_SEARCH_RESULTS', total)
  // },
}
