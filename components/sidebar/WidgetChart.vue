<template>
  <div class="card card-widget">
    <div class="card-header">
      <h5 class="card-title">{{ $t('thisMonth') }}</h5>
    </div>
    <SidebarChartMonthly
      v-if="chartData && chartData.length"
      :items="chartData"
    />
    <p v-else class="widget-empty">
      {{ $t('nothingToDisplay') }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    await this.$store.dispatch('fetchCurrentMonthRecords')
  },
  computed: {
    ...mapGetters(['currentMonthRecords']),
    chartData() {
      return Object.values(this.currentMonthRecords).map((group) => {
        const category = group[0]?.category || {}
        const { color, id, is_income, name } = category
        const value = group.reduce(
          (total, record) => (total += parseInt(record.sum || 0)),
          0
        )
        return { color, id, is_income, name, value }
      })
    },
  },
}
</script>
