<template>
  <div
    ref="wrapper"
    :style="{ '--aspect-ratio': aspect }"
    class="svg-chart"
  ></div>
</template>

<script>
import { SvgChart } from '@/components/svg-chart/svg-chart'

export default {
  props: {
    aspect: {
      type: Number,
      default: 1,
    },
    borderRadius: {
      type: Number,
      default: 0,
    },
    combineThreshold: {
      type: Number,
      default: 0,
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  watch: {
    items: {
      deep: true,
      handler() {
        this.drawChart()
      },
    },
  },
  mounted() {
    this.drawChart()
    window.addEventListener('resize', this.drawChart, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.drawChart)
  },
  methods: {
    drawChart() {
      const chart = new SvgChart(this.$refs.wrapper, this.items, {
        borderRadius: this.borderRadius,
        combineThreshold: this.combineThreshold,
        combinedLabel: this.$t('other'),
      })
      chart.draw()
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .svg-chart-root {
    display: block;
    width: 100%;

    .svg-chart-bar {
      // transition: all 0.5s cubic-bezier(0.25, 0.5, 0.9, 0.75);
      transition: none;
    }

    .svg-chart-bar-combined {
      fill: none;
      stroke: var(--outline);
    }

    .svg-chart-label-out {
      fill: var(--on-background);
    }
  }
}
</style>
