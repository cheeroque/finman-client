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
      <SvgChartHorizontal
        :aspect="1.25"
        :border-radius="4"
        :combine-threshold="0.05"
        :items="chartData"
      />
    </div>
  </DialogPage>
</template>

<script>
import { formatPeriod, formatSum, getContrastColor } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  transition: {
    name: 'page',
    mode: '',
  },
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
        if (!category.is_income) {
          const value =
            this.records[key]?.reduce(
              (total, record) => (total += parseInt(record.sum || 0)),
              0
            ) || 0
          result.push({
            displayValue: this.formatSum(value, this.locale),
            fill: category?.color,
            label: category?.name,
            textFill: this.getContrastColor(category?.color),
            value,
          })
        }
      })
      return result.sort((a, b) => b.value - a.value)
    },
  },
  methods: {
    formatPeriod,
    formatSum,
    getContrastColor,
  },
}
</script>
