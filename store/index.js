/* eslint-disable no-console */

export const state = () => ({
  categories: [],
  error: false,
  firstRecord: {},
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
  categoryById: (state) => (id) => {
    return state.categories.find((category) => category.id.toString() === id.toString()) || {}
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
  async fetchRecords({ commit }, params = { perPage: 50 }) {
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
