<template>
  <div ref="wrapper" class="chart-monthly">
    <nuxt-link
      v-for="row in expenses"
      :key="`bar-${row.id}`"
      :to="localePath(`/categories/${row.id}`)"
      :data-value="row.value"
      :style="{
        '--bar-color': row.color,
        '--text-color': getContrastColor(row.color),
        width: `${getBarWidth(row)}%`,
      }"
      class="chart-bar"
    >
      <div class="chart-bar-caption">
        <span class="chart-bar-value">
          {{ formatSum(row.value, $i18n.locale) }}&nbsp;₽
        </span>
        <span class="chart-bar-name">
          {{ row.name }}
        </span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { getContrastColor, getViewportWidth, formatSum } from '@/utils'

export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      availableWidth: null,
      combineThreshold: 0.05,
    }
  },
  computed: {
    expenses() {
      return this.items
        .filter(({ is_income }) => !is_income)
        .sort((a, b) => b.value - a.value)
    },
  },
  mounted() {
    this.initChartCaptions()
  },
  methods: {
    getContrastColor,
    getViewportWidth,
    formatSum,
    getBarWidth(expense) {
      return (
        Math.round((expense.value * 100000) / this.expenses[0].value) / 1000
      )
    },
    initChartCaptions() {
      if (!this.$refs.wrapper) return
      const bars = this.$refs.wrapper.querySelectorAll('.chart-bar')
      const barPaddingX = getComputedStyle(bars[0]).paddingLeft

      bars.forEach((bar) => {
        const caption = bar.querySelector('.chart-bar-caption')
        if (caption) {
          const barWidth = bar.getBoundingClientRect().width
          const maxCaptionWidth = Math.floor(
            barWidth - parseInt(barPaddingX) * 2
          )
          const captionWidth = caption.getBoundingClientRect().width
          if (captionWidth > maxCaptionWidth) {
            bar.classList.add('chart-bar-outside')
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
$bar-padding-x: 0.5rem;
$bar-padding-y: 0.25rem;

.chart-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: $bar-padding-y $bar-padding-x;
  border-radius: 0.25rem;
  background-color: var(--bar-color);

  & + .chart-bar {
    margin-top: 0.5rem;
  }

  &:not(.chart-bar-outside) {
    color: var(--text-color);
    transition: $transition;
    transition-property: background-color;

    &:hover {
      background-color: var(--primary);
    }
  }

  &.chart-bar-outside {
    .chart-bar-caption {
      left: 100%;
      margin-left: $bar-padding-x;
    }
  }
}

.chart-bar-caption {
  position: absolute;
  left: $bar-padding-x;
  top: $bar-padding-y;
  bottom: $bar-padding-y;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.2;
  white-space: nowrap;
}

.chart-bar-value {
  font-family: $font-family-alternate;
  font-weight: $font-weight-medium;
}

.chart-bar-name {
  font-size: 0.875em;
  opacity: 0.75;
}
</style>
