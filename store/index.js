/* eslint-disable no-console */

export const state = () => ({
  categories: [],
  error: false,
  firstRecord: {},
  latestRevise: {},
  monthly: {
    expenses: 0,
    incomes: 0
  },
  records: {},
  recordsByCategory: {},
  recordsByMonth: {},
  recordsByPeriod: {},
  total: 0
})

export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload
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
  SET_TOTAL(state, payload) {
    state.total = payload
  }
}

export const getters = {
  categories: (state) => {
    return state.categories
  },
  categoryById: (state) => (id) => {
    return state.categories && state.categories.length
      ? state.categories.find((category) => category.id.toString() === id.toString())
      : {}
  },
  firstRecord: (state) => {
    return state.firstRecord
  },
  monthlyExpenses: (state) => {
    return parseInt(state.monthly.expenses)
  },
  monthlyIncomes: (state) => {
    return parseInt(state.monthly.incomes)
  },
  recordsByCategory: (state) => {
    return state.recordsByCategory
  },
  recordsByPeriod: (state) => {
    return state.recordsByPeriod
  },
  error: (state) => {
    return state.error
  }
}

export const actions = {
  async fetchCategories({ commit }) {
    const categories = await this.$axios.$get('categories').catch((error) => {
      commit('SET_ERROR', { path: 'categories', error })
    })
    commit('SET_CATEGORIES', categories)
  },
  async fetchFirstRecord({ commit }) {
    const firstRecord = await this.$axios.$get('records/first').catch((error) => {
      commit('SET_ERROR', { path: 'firstRecord', error })
    })
    commit('SET_FIRST_RECORD', firstRecord)
  },
  async fetchLatestRevise({ commit }) {
    const latestRevise = await this.$axios.$get('revise/latest').catch((error) => {
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
  async fetchRecords({ commit }, params = { perPage: 50 }) {
    if (!params.perPage) params.perPage = 50
    const records = await this.$axios.$get('records', { params }).catch((error) => {
      commit('SET_ERROR', { path: 'records', params, error })
    })
    commit('SET_RECORDS', records)
  },
  async fetchRecordsByCategory({ commit }, { categoryId, params = { perPage: 18 } }) {
    const recordsByCategory = await this.$axios.$get(`category/${categoryId}`, { params }).catch((error) => {
      commit('SET_ERROR', { path: 'recordsByCategory', categoryId, params, error })
    })
    commit('SET_RECORDS_BY_CATEGORY', recordsByCategory)
  },
  async fetchRecordsByPeriod({ commit }, { period }) {
    const recordsByPeriod = await this.$axios.$get(`month/${period}`).catch((error) => {
      commit('SET_ERROR', { path: 'recordsByPeriod', period, error })
    })
    commit('SET_RECORDS_BY_PERIOD', recordsByPeriod)
  },
  async fetchTotal({ commit }) {
    const total = await this.$axios.$get('total').catch((error) => {
      commit('SET_ERROR', { path: 'total', error })
    })
    commit('SET_TOTAL', total)
  }
}
