<template>
  <DialogPage
    :title="formatPeriod($route.params.period, locale, 4)"
    action-title="Календарь"
    @action="$router.push('/months')"
  >
    <div class="card mb-12 p-0">
      <TableMonthRecords :categories="categories" :records="records" />
    </div>

    <div class="card mb-12">
      <ChartBar :items="chartData" />
    </div>
  </DialogPage>
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
    chartData() {
      const result = []
      Object.keys(this.records).forEach((key) => {
        const category = this.categories.find(
          ({ id }) => parseInt(id) === parseInt(key)
        )
        if (!category.is_income)
          result.push({
            label: category?.name,
            color: category?.color,
            value:
              this.records[key]?.reduce(
                (total, record) => (total += parseInt(record.sum || 0)),
                0
              ) || 0,
          })
      })
      return result
    },
  },
  methods: {
    formatPeriod,
  },
}
</script>
