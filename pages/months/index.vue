<template>
  <div class="dialog-fullscreen">
    <header class="dialog-header">
      <nuxt-link to="/" class="btn dialog-header-back">
        <svg-icon
          name="arrow-left-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </nuxt-link>
      <h4 class="dialog-title mb-0">Календарь</h4>
    </header>

    <main class="container mb-12">
      <MonthCalendar :items="calendarItems" />
    </main>
  </div>
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
