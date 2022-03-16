<template>
  <div :style="{ '--aspect-ratio': aspect }" class="chart chart-bar">
    <canvas ref="canvas" class="chart-canvas"></canvas>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatSum, getContrastColor } from '@/utils'

const AXIS_BORDER_WIDTH = 1
const AXIS_TICK_SIZE = 0
const BAR_THICKNESS = 0.8
const BAR_PADDING = 8
const LABEL_FONT_SIZE = 14

export default {
  props: {
    aspect: {
      type: Number,
      default: 1,
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      canvasWidth: null,
      canvasHeight: null,
    }
  },
  computed: {
    ...mapGetters(['locale']),
  },
  mounted() {
    this.draw()
    window.addEventListener('resize', this.onWindowResize, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    formatSum,
    getContrastColor,
    draw() {
      if (!this.$refs.canvas?.getContext) return
      const canvas = this.$refs.canvas
      this.setCanvasSize(canvas)
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      this.drawAxis(ctx)
      this.drawItems(ctx)
    },
    drawAxis(ctx) {
      const canvasStyles = getComputedStyle(ctx.canvas)

      ctx.fillStyle = canvasStyles.borderColor
      ctx.globalAlpha = 0.5
      ctx.fillRect(AXIS_TICK_SIZE, 0, AXIS_BORDER_WIDTH, this.canvasHeight)
      ctx.fillRect(
        0,
        this.canvasHeight - AXIS_TICK_SIZE - AXIS_BORDER_WIDTH,
        this.canvasWidth,
        AXIS_BORDER_WIDTH
      )
      ctx.globalAlpha = 1
    },
    drawItems(ctx) {
      const itemCount = this.items.length + (1 - BAR_THICKNESS)
      const itemHeight = Math.round(this.canvasHeight / itemCount)
      const startY = this.canvasHeight - itemHeight * this.items.length

      const maxValue = Math.max(...this.items.map(({ value }) => value))

      const canvasStyles = getComputedStyle(ctx.canvas)

      let offsetY = startY
      this.items.forEach((item) => {
        const barHeight = Math.round(itemHeight * BAR_THICKNESS)
        const barWidth = Math.round((this.canvasWidth * item.value) / maxValue)

        ctx.fillStyle = item.color
        ctx.fillRect(AXIS_BORDER_WIDTH, offsetY, barWidth, barHeight)

        let textLeft
        let textColor
        const textTop = offsetY + 1 + barHeight / 2

        const sumText = `${this.formatSum(item.value, this.locale)} ₽`
        const nameText = `${item.label}: `
        const textMetrics = ctx.measureText(sumText + nameText)

        if (textMetrics.width > barWidth - BAR_PADDING * 2) {
          // text doesn't fit inside bar
          textColor = canvasStyles.color
          textLeft = barWidth + AXIS_BORDER_WIDTH + BAR_PADDING
        } else {
          // text fits inside bar
          textColor = this.getContrastColor(item.color)
          textLeft = AXIS_BORDER_WIDTH + BAR_PADDING
        }

        ctx.fillStyle = textColor
        ctx.textBaseline = 'middle'

        ctx.font = `${LABEL_FONT_SIZE}px ${canvasStyles.fontFamily}`
        const nameTextMetrics = ctx.measureText(nameText)
        ctx.fillText(nameText, textLeft, textTop)
        textLeft += nameTextMetrics.width

        ctx.font = `500 ${LABEL_FONT_SIZE}px ${canvasStyles.fontFamily}`
        ctx.fillText(sumText, textLeft, textTop)

        offsetY += itemHeight
      })
    },
    onWindowResize() {
      this.draw()
    },
    setCanvasSize(canvas) {
      const boundingRect = canvas.getBoundingClientRect()
      canvas.width = Math.round(boundingRect.width)
      canvas.height = Math.round(boundingRect.height)
      this.canvasWidth = canvas.width
      this.canvasHeight = canvas.height
    },
  },
}
</script>

<style lang="scss" scoped>
.chart {
  position: relative;

  &::before {
    display: block;
    content: '';
    padding-bottom: calc(100% * var(--aspect-ratio));
  }
}
.chart-canvas {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  font-family: $font-family-alternate;
  font-size: $font-size-base * 0.75;
  border: none;
  border-color: var(--outline);
}
</style>
