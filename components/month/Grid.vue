<template>
  <nav class="month-grid">
    <div v-for="year in years" :key="`year-${year.year}`" class="row g-8 mb-16 mb-lg-8">
      <div class="col-12 col-lg-1 d-lg-flex align-end">
        <p class="year-title">{{ year.year }}</p>
      </div>
      <div class="col-12 col-lg-11">
        <div class="row g-8">
          <div
            v-for="(month, index) in year.months"
            :key="`month-${$isoDate(month)}`"
            :class="index === 0 ? getMonthClass(month) : null"
            class="col-2 col-lg-1"
          >
            <nuxt-link :to="`/month/${$monthApiLink(month)}`" class="nav-link">
              <span class="month-numeric" v-text="`${$dateWithFormat(month, { month: '2-digit' })}`"></span>
              <span class="month-long" v-text="$dateWithFormat(month, { month: 'long' })"></span>
              <span class="year-numeric" v-text="$dateWithFormat(month, { year: 'numeric' })"></span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      locale: 'ru-RU'
    }
  },
  async fetch() {
    await this.$store.dispatch('fetchFirstRecord')
  },
  computed: {
    firstRecord() {
      return this.$store.state.firstRecord
    },
    months() {
      const months = []
      const now = new Date()
      let date = new Date(this.firstRecord.created_at)

      if (this.$isValidDate(date)) {
        while (this.getMonthStart(date) <= this.getMonthStart(now)) {
          const month = {
            date: this.getMonthStart(date),
            year: this.getMonthStart(date).getUTCFullYear()
          }
          months.push(month)
          date = new Date(date.setUTCMonth(date.getUTCMonth() + 1))
        }
      }
      return months.reverse()
    },
    years() {
      const years = []
      const yearsObject = this.months.reduce((acc, cur) => {
        acc[cur.year] = [...(acc[cur.year] || []), cur]
        return acc
      }, {})
      Object.keys(yearsObject).forEach((key) => {
        years.push({ year: key, months: yearsObject[key].map(({ date }) => date) })
      })
      return years.sort((a, b) => b.year - a.year)
    }
  },
  methods: {
    getMonthClass(date) {
      let cls = null
      if (this.$isValidDate(date)) {
        const month = date.getUTCMonth() + 1
        cls = `col-start-${(6 - (month % 6)) * 2 + 1} col-lg-start-${13 - month}`
      }
      return cls
    },
    getMonthStart(date) {
      return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
    }
  }
}
</script>

<style lang="scss" scoped>
.month-grid {
  padding: 0 1rem;
  overflow: hidden;
}

.year-title {
  margin: 0;
  font-size: $font-size-4;
  font-weight: $font-weight-medium;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 0.25rem;
  line-height: 1.125;
  text-decoration: none;
  border-radius: $border-radius;
  color: inherit;
  background-color: $gray-50;

  &:hover {
    color: $white;
    background-color: $primary;

    .month-long {
      color: inherit;
    }
  }
}

.year-title,
.month-numeric,
.year-numeric {
  font-family: $font-family-alternate;
}

@media (max-width: 991.98px) {
  .year-title {
    border-bottom: $border-width * 2 solid $gray-100;
  }

  .month-long,
  .year-numeric {
    display: none;
  }
}

@media (min-width: 992px) {
  .year-title {
    padding: 0.75rem 0;
    font-size: $font-size-base * 2.125;
    line-height: 1.125;
    color: $gray-300;
  }

  .nav-link {
    align-items: flex-start;
    padding: 0.75rem 1.25rem;
  }

  .month-numeric {
    font-size: $font-size-base * 2.125;
  }

  .month-long {
    font-size: $font-size-2;
    color: $gray-500;
  }

  .year-numeric {
    display: none;
  }
}
</style>
