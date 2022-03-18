<template>
  <DialogPage title="Календарь">
    <MonthCalendar :items="calendarItems" class="mb-12" />
  </DialogPage>
</template>

<script>
export default {
  async asyncData({ store, error }) {
    try {
      const firstRecord = await store.dispatch('fetchFirstRecord')
      return { firstRecord }
    } catch (e) {
      return error({ statusCode: e?.response?.status || 500 })
    }
  },
  computed: {
    calendarItems() {
      const items = {}
      const startDate = new Date(this.firstRecord?.created_at)
      const startYear = startDate.getFullYear()
      const startMonth = startDate.getMonth() + 1

      const endDate = new Date()
      const endYear = endDate.getFullYear()
      const endMonth = endDate.getMonth() + 1

      for (let y = startYear; y <= endYear; y++) {
        items[y] = []
        for (let m = 1; m <= 12; m++) {
          const hasItems =
            (y > startYear && y < endYear) ||
            (y === startYear && m >= startMonth) ||
            (y === endYear && m <= endMonth)
          items[y].push({ month: m, disabled: !hasItems })
        }
      }
      return items
    },
  },
}
</script>
