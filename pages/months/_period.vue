<template>
  <div class="dialog-fullscreen">
    <header class="dialog-header">
      <nuxt-link to="/months" class="btn dialog-header-back">
        <svg-icon
          name="arrow-left-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </nuxt-link>
      <h4 class="dialog-title mb-0">
        {{ formatPeriod($route.params.period, locale, 4) }}
      </h4>
      <nuxt-link to="/months" class="btn dialog-header-action">
        Календарь
      </nuxt-link>
    </header>

    <main class="container mb-12">
      <div class="card p-0">
        <TableMonthRecords :categories="categories" :records="records" />
      </div>
    </main>
  </div>
</template>

<script>
import { formatPeriod } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  async asyncData({ params, store, error }) {
    try {
      const categories = await store.dispatch('fetchCategories')
      const records = await store.dispatch('fetchRecordsByPeriod', {
        period: params.period,
      })
      return { categories, records }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
  computed: {
    ...mapGetters(['locale']),
  },
  methods: {
    formatPeriod,
  },
}
</script>
