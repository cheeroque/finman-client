<template>
  <div class="card card-calendar">
    <div class="card-header">
      <button
        :disabled="isBeginning"
        class="btn btn-calendar-prev"
        :title="$t('month.previous')"
        :aria-label="$t('month.previous')"
        @click="setPrevYear"
      >
        <svg-icon
          name="chevron-left-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </button>

      <h5 class="card-title">{{ activeYear }}</h5>

      <button
        :disabled="isEnd"
        class="btn btn-calendar-next"
        :title="$t('month.next')"
        :aria-label="$t('month.next')"
        @click="setNextYear"
      >
        <svg-icon
          name="chevron-right-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </button>
    </div>
    <div class="calendar-years-wrapper">
      <div
        :style="{ transform: `translateX(-${activeYearIndex * 100}%)` }"
        class="calendar-years-slider"
      >
        <div v-for="year in years" :key="`year-${year}`" class="card-body">
          <div class="calendar-month-grid">
            <div
              v-for="monthItem in items[year]"
              :key="`month-${year}-${monthItem.month}`"
              class="calendar-month"
            >
              <component
                :is="monthItem.disabled ? 'span' : 'nuxt-link'"
                :to="`/months/${getPeriod(year, monthItem.month)}`"
                :class="{ disabled: monthItem.disabled }"
                class="calendar-month-content"
              >
                {{ getMonthName(monthItem.month) }}
              </component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      activeYear: null,
      months: [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
      ],
    }
  },
  computed: {
    activeYearIndex() {
      return this.years.findIndex((year) => parseInt(year) === this.activeYear)
    },
    currentYear() {
      const date = new Date()
      return date.getFullYear()
    },
    isBeginning() {
      return this.activeYearIndex === 0
    },
    isEnd() {
      return this.activeYearIndex === this.years.length - 1
    },
    items() {
      const items = {}
      const startDate = new Date(this.startDate)
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
    years() {
      return Object.keys(this.items) || []
    },
  },
  created() {
    this.activeYear = this.currentYear
  },
  methods: {
    getMonthName(month) {
      return this.$t(`month.${this.months[parseInt(month) - 1]}`)
    },
    getPeriod(year, month) {
      return `${year}-${month.toString().padStart(2, '0')}`
    },
    setNextYear() {
      if (!this.isEnd) this.activeYear++
    },
    setPrevYear() {
      if (!this.isBeginning) this.activeYear--
    },
  },
}
</script>

<style lang="scss" scoped>
.card-calendar {
  padding: 0;

  .card-header {
    display: flex;
    align-items: center;
    padding: $card-padding-y $card-padding-x;
    color: $card-color-accent;
  }

  .card-body {
    flex: 0 0 100%;
    padding: 0 $card-padding-x $card-padding-y;
  }

  .card-title {
    flex: 1 1 auto;
    margin-bottom: 0;
    text-align: center;
  }

  .btn-calendar-prev,
  .btn-calendar-next {
    padding: 0;
    border: none;
  }
}

.calendar-years-wrapper {
  max-width: 100%;
  overflow-x: hidden;
}

.calendar-years-slider {
  display: flex;
  transition: $transition;
  transition-property: transform;
}

.calendar-month-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  font-family: $font-family-alternate;
  font-size: $font-size-base * 0.875;
  text-align: center;
}

.calendar-month {
  position: relative;
  width: 100%;

  &::before {
    display: block;
    content: '';
    padding-bottom: 70%;
  }

  .calendar-month-content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 0.25rem;

    &:not(.disabled) {
      color: var(--on-surface);
      background-color: var(--surface);
      transition: $transition;
      transition-property: color, background-color;

      &:hover {
        text-decoration: none;
        color: var(--on-surface-variant);
        background-color: var(--surface-variant);
      }
    }

    &.disabled {
      color: var(--primary-container);
      cursor: default;
    }
  }
}
</style>
