<template>
  <PageWrapper>
    <PageHeader>
      {{ formatPeriod($route.params.period, locale, 4) }}
    </PageHeader>
    <main class="card mb-16 p-0">
      <TableMonthRecords :categories="categories" :records="records" />
    </main>
  </PageWrapper>
</template>

<script>
import { formatPeriod } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  transition: {
    name: 'page',
    mode: '',
    duration: 200,
  },
  async asyncData({ params, store, error }) {
    try {
      const records = await store.dispatch('fetchRecordsByPeriod', {
        period: params.period,
      })
      return { records }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
  computed: {
    ...mapGetters(['categories', 'locale']),
  },
  methods: {
    formatPeriod,
  },
}
</script>
