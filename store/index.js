export const state = () => ({
  categories: [],
  currentMonthRecords: [],
  dialogOpen: false,
  drawerOpen: false,
  latestSnapshot: {},
  records: [],
  recordsTotal: 0,
  searchResults: [],
  searchResultsTotal: 0,
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
  SET_SEARCH_RESULTS(state, payload) {
    state.searchResults = payload
  },
  SET_SEARCH_RESULTS_TOTAL(state, payload) {
    state.searchResultsTotal = payload
  },
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
  records: (state) => state.records,
  recordsTotal: (state) => state.recordsTotal,
  searchResults: (state) => state.searchResults,
  searchResultsTotal: (state) => state.searchResultsTotal,
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

  async storeShapshot(_, payload) {
    await this.$axios.$post('revises', payload).catch((error) => {
      throw error
    })
  },

  async fetchTotal({ commit }) {
    const total = await this.$axios.$get('total').catch((error) => {
      throw error
    })
    commit('SET_TOTAL', total)
  },

  async fetchSearchResults({ commit }, params) {
    const page = params.page || 1
    const perPage = params.perPage || 50
    const q = params.q
    const { data, total } = await this.$axios
      .$get('search', { params: { page, perPage, q } })
      .catch((error) => {
        throw error
      })
    commit('SET_SEARCH_RESULTS', data)
    commit('SET_SEARCH_RESULTS_TOTAL', total)
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
}
