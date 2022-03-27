<template>
  <div class="card card-widget">
    <div class="card-header">
      <h5 class="card-title">{{ $t('thisMonth') }}</h5>
    </div>
    <SvgChartHorizontal
      :border-radius="4"
      :combine-threshold="0.05"
      :items="chartData"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getContrastColor, formatSum } from '@/utils'

export default {
  computed: {
    ...mapGetters(['currentMonthRecords']),
    chartData() {
      return Object.values(this.currentMonthRecords)
        .map((group) => {
          const category = group[0]?.category
          const isIncome = category?.is_income
          const label = category?.name
          const fill = category?.color
          const textFill = this.getContrastColor(fill)
          const value = group.reduce(
            (total, record) => (total += parseInt(record.sum || 0)),
            0
          )
          const displayValue = this.formatSum(value, this.$i18n.locale)
          return { isIncome, label, fill, textFill, value, displayValue }
        })
        .sort((a, b) => b.value - a.value)
        .filter(({ isIncome }) => !isIncome)
    },
  },
  methods: {
    getContrastColor,
    formatSum,
  },
}
</script>
