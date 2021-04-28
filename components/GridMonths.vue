<template>
  <nav class="nav nav-grid-months">
    <div
      v-for="month in months"
      :key="`${month.month}-${month.year}`"
      :class="`grid-col-${month.month}`"
      class="nav-item"
    >
      <b-link :to="`/month/${month.year}-${month.month}`" class="nav-link">
        <span class="month">
          {{ month.monthName }}
        </span>
        <span class="year">
          {{ month.year }}
        </span>
      </b-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      first: {}
    }
  },
  async fetch() {
    await this.getFirstRecord()
  },
  computed: {
    months() {
      const months = []
      const datestring = this.first.created_at
      let date = new Date(datestring)
      while (date <= new Date()) {
        const month = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          monthName: date.toLocaleString('default', { month: 'long' })
        }
        months.push(month)
        date = new Date(date.setMonth(date.getMonth() + 1))
      }
      return months.reverse()
    }
  },
  methods: {
    async getFirstRecord() {
      this.first = await this.$http.$get(`${process.env.API_URL}/records/first`)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-grid-months {
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@for $month from 1 through 12 {
  .nav-grid-months .grid-col-#{$month} {
    grid-column: #{13 - $month} / span 1;
  }
}
</style>
