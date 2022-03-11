export const state = () => ({
  dialogOpen: false,
  drawerOpen: false,
  firstRecord: {},
  latestSnapshot: {},
  locale: 'ru',
  // monthly: {
  //   expenses: 0,
  //   incomes: 0,
  // },
  // recordsByCategory: {},
  // recordsByMonth: {},
  // recordsByPeriod: {},
  // searchResults: [],
  total: 0,
})

export const mutations = {
  SET_DIALOG_OPEN(state, payload) {
    state.dialogOpen = payload
  },
  SET_DRAWER_OPEN(state, payload) {
    state.drawerOpen = payload
  },
  // SET_FIRST_RECORD(state, payload) {
  //   state.firstRecord = payload
  // },
  SET_LATEST_SNAPSHOT(state, payload) {
    state.latestSnapshot = payload
  },
  // SET_MONTHLY(state, payload) {
  //   state.monthly = payload
  // },
  // SET_RECORDS_BY_CATEGORY(state, payload) {
  //   state.recordsByCategory = payload
  // },
  // SET_RECORDS_BY_MONTH(state, payload) {
  //   state.recordsByMonth = payload
  // },
  // SET_RECORDS_BY_PERIOD(state, payload) {
  //   state.recordsByPeriod = payload
  // },
  // SET_SEARCH_RESULTS(state, payload) {
  //   state.searchResults = payload
  // },
  SET_TOTAL(state, payload) {
    state.total = payload
  },
}

export const getters = {
  bodyFixed: (state) => state.dialogOpen || state.drawerOpen,
  drawerOpen: (state) => state.drawerOpen,
  // firstRecord: (state) => state.firstRecord,
  latestSnapshot: (state) => state.latestSnapshot,
  locale: (state) => state.locale,
  // monthlyExpenses: (state) => parseInt(state.monthly?.expenses || 0),
  // monthlyIncomes: (state) => parseInt(state.monthly?.incomes || 0),
  // recordsByCategory: (state) => state.recordsByCategory,
  // recordsByPeriod: (state) => state.recordsByPeriod,
  // searchResults: (state) => state.searchResults,
  total: (state) => state.total,
}

export const actions = {
  async fetchRecords(_, params) {
    const records = await this.$axios
      .$get('records', { params })
      .catch((error) => {
        throw error
      })
    return records
  },

  async fetchRecordById(_, id) {
    const record = await this.$axios.$get(`records/${id}`).catch((error) => {
      throw error
    })
    record.created_at = new Date(record.created_at)
    return record
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

  async fetchCategories() {
    const categories = await this.$axios.$get('categories').catch((error) => {
      throw error
    })
    return categories
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

  /* To rework */

  // async fetchFirstRecord({ commit, dispatch }) {
  //   const firstRecord = await this.$axios
  //     .$get('records/first')
  //     .catch((error) => {
  //       dispatch('setError', { path: 'firstRecord', error })
  //     })
  //   commit('SET_FIRST_RECORD', firstRecord)
  // },
  // async fetchMonthly({ commit, dispatch }) {
  //   const monthly = await this.$axios.$get('monthly').catch((error) => {
  //     dispatch('setError', { path: 'monthly', error })
  //   })
  //   commit('SET_MONTHLY', monthly)
  // },

  // async fetchRecordsByCategory({ commit, dispatch }, { categoryId, params }) {
  //   if (!params.perPage) params.perPage = 18
  //   const recordsByCategory = await this.$axios
  //     .$get(`category/${categoryId}`, { params })
  //     .catch((error) => {
  //       dispatch('setError', {
  //         path: 'recordsByCategory',
  //         categoryId,
  //         params,
  //         error,
  //       })
  //     })
  //   commit('SET_RECORDS_BY_CATEGORY', recordsByCategory)
  // },
  // async fetchRecordsByPeriod({ commit, dispatch }, { period }) {
  //   const recordsByPeriod = await this.$axios
  //     .$get(`month/${period}`)
  //     .catch((error) => {
  //       dispatch('setError', { path: 'recordsByPeriod', period, error })
  //     })
  //   commit('SET_RECORDS_BY_PERIOD', recordsByPeriod)
  // },
  // async fetchSearchResults({ commit, dispatch }, params) {
  //   const total = await this.$axios
  //     .$get('search', { params })
  //     .catch((error) => {
  //       dispatch('setError', { path: 'search', error })
  //     })
  //   commit('SET_SEARCH_RESULTS', total)
  // },
}
