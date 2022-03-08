export const state = () => ({
  categories: [],
  dialogOpen: false,
  drawerOpen: false,
  error: false,
  firstRecord: {},
  latestRevise: {},
  locale: 'ru',
  monthly: {
    expenses: 0,
    incomes: 0,
  },
  records: {},
  recordsByCategory: {},
  recordsByMonth: {},
  recordsByPeriod: {},
  searchResults: [],
  total: 0,
})

export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },
  SET_DIALOG_OPEN(state, payload) {
    state.dialogOpen = payload
  },
  SET_DRAWER_OPEN(state, payload) {
    state.drawerOpen = payload
  },
  SET_ERROR(state, payload) {
    state.error = payload
  },
  SET_FIRST_RECORD(state, payload) {
    state.firstRecord = payload
  },
  SET_LATEST_REVISE(state, payload) {
    state.latestRevise = payload
  },
  SET_MONTHLY(state, payload) {
    state.monthly = payload
  },
  SET_RECORDS(state, payload) {
    state.records = payload
  },
  SET_RECORDS_BY_CATEGORY(state, payload) {
    state.recordsByCategory = payload
  },
  SET_RECORDS_BY_MONTH(state, payload) {
    state.recordsByMonth = payload
  },
  SET_RECORDS_BY_PERIOD(state, payload) {
    state.recordsByPeriod = payload
  },
  SET_SEARCH_RESULTS(state, payload) {
    state.searchResults = payload
  },
  SET_TOTAL(state, payload) {
    state.total = payload
  },
}

export const getters = {
  bodyFixed: (state) => state.dialogOpen || state.drawerOpen,
  categories: (state) => state.categories,
  firstRecord: (state) => state.firstRecord,
  latestRevise: (state) => state.latestRevise,
  locale: (state) => state.locale,
  monthlyExpenses: (state) => parseInt(state.monthly?.expenses || 0),
  monthlyIncomes: (state) => parseInt(state.monthly?.incomes || 0),
  records: (state) => state.records,
  recordsByCategory: (state) => state.recordsByCategory,
  recordsByPeriod: (state) => state.recordsByPeriod,
  searchResults: (state) => state.searchResults,
  total: (state) => state.total,
  error: (state) => state.error,
}

export const actions = {
  async fetchGlobalData({ dispatch }) {
    await dispatch('fetchTotal')
    await dispatch('fetchMonthly')
    await dispatch('fetchLatestRevise')
    await dispatch('fetchCategories')
  },

  async fetchCategories({ commit }) {
    const categories = await this.$axios.$get('categories').catch((error) => {
      commit('SET_ERROR', { path: 'categories', error })
    })
    commit('SET_CATEGORIES', categories)
  },
  async fetchFirstRecord({ commit }) {
    const firstRecord = await this.$axios
      .$get('records/first')
      .catch((error) => {
        commit('SET_ERROR', { path: 'firstRecord', error })
      })
    commit('SET_FIRST_RECORD', firstRecord)
  },
  async fetchLatestRevise({ commit }) {
    const latestRevise = await this.$axios
      .$get('revises/latest')
      .catch((error) => {
        commit('SET_ERROR', { path: 'latestRevise', error })
      })
    commit('SET_LATEST_REVISE', latestRevise)
  },
  async fetchMonthly({ commit }) {
    const monthly = await this.$axios.$get('monthly').catch((error) => {
      commit('SET_ERROR', { path: 'monthly', error })
    })
    commit('SET_MONTHLY', monthly)
  },
  async fetchRecordById({ commit }, id) {
    const record = await this.$axios.$get(`records/${id}`).catch((error) => {
      commit('SET_ERROR', { path: 'record', error })
    })
    record.created_at = new Date(record.created_at)
    return record
  },
  async fetchRecords({ commit }, params) {
    if (!params.perPage) params.perPage = 50
    const records = await this.$axios
      .$get('records', { params })
      .catch((error) => {
        commit('SET_ERROR', { path: 'records', params, error })
      })
    commit('SET_RECORDS', records)
  },
  async fetchRecordsByCategory({ commit }, { categoryId, params }) {
    if (!params.perPage) params.perPage = 18
    const recordsByCategory = await this.$axios
      .$get(`category/${categoryId}`, { params })
      .catch((error) => {
        commit('SET_ERROR', {
          path: 'recordsByCategory',
          categoryId,
          params,
          error,
        })
      })
    commit('SET_RECORDS_BY_CATEGORY', recordsByCategory)
  },
  async fetchRecordsByPeriod({ commit }, { period }) {
    const recordsByPeriod = await this.$axios
      .$get(`month/${period}`)
      .catch((error) => {
        commit('SET_ERROR', { path: 'recordsByPeriod', period, error })
      })
    commit('SET_RECORDS_BY_PERIOD', recordsByPeriod)
  },
  async fetchSearchResults({ commit }, params) {
    const total = await this.$axios
      .$get('search', { params })
      .catch((error) => {
        commit('SET_ERROR', { path: 'search', error })
      })
    commit('SET_SEARCH_RESULTS', total)
  },
  async fetchTotal({ commit }) {
    const total = await this.$axios.$get('total').catch((error) => {
      commit('SET_ERROR', { path: 'total', error })
    })
    commit('SET_TOTAL', total)
  },

  setDialogOpen({ commit }, payload) {
    commit('SET_DIALOG_OPEN', payload)
  },
  setDrawerOpen({ commit }, payload) {
    commit('SET_DRAWER_OPEN', payload)
  },
}
