<template>
  <div
    ref="wrapper"
    :style="{ '--aspect-ratio': aspect }"
    class="chart chart-bar"
  >
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
const LABEL_FONT_SIZE = 12

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
      canvasStyles: {},
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
      this.canvasStyles = getComputedStyle(canvas)
      this.setCanvasSize(canvas)
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const startX = this.drawAxis(ctx)
      this.drawItems(ctx, startX)
    },
    drawAxis(ctx) {
      ctx.font = `${LABEL_FONT_SIZE}px ${this.canvasStyles.fontFamily}`
      let maxLabelWidth = 0
      this.items.forEach((item) => {
        const textMetrics = ctx.measureText(item.label)
        if (textMetrics.width > maxLabelWidth) {
          maxLabelWidth = Math.round(textMetrics.width)
        }
      })

      const labelWidth =
        Math.min(maxLabelWidth, Math.round(this.canvasWidth / 4)) + BAR_PADDING

      ctx.fillStyle = this.canvasStyles.borderColor
      ctx.globalAlpha = 0.5
      ctx.fillRect(
        AXIS_TICK_SIZE + labelWidth,
        0,
        AXIS_BORDER_WIDTH,
        this.canvasHeight
      )
      ctx.fillRect(
        AXIS_TICK_SIZE + labelWidth,
        this.canvasHeight - AXIS_TICK_SIZE - AXIS_BORDER_WIDTH,
        this.canvasWidth - AXIS_TICK_SIZE - labelWidth,
        AXIS_BORDER_WIDTH
      )
      ctx.globalAlpha = 1

      return labelWidth
    },
    drawItems(ctx, startX) {
      const itemCount = this.items.length + (1 - BAR_THICKNESS)
      const itemHeight = Math.round(this.canvasHeight / itemCount)
      const startY = this.canvasHeight - itemHeight * this.items.length

      const maxValue = Math.max(...this.items.map(({ value }) => value))
      const contentWidth = this.canvasWidth - startX

      let offsetY = startY
      this.items.forEach((item) => {
        const barHeight = Math.round(itemHeight * BAR_THICKNESS)
        const barWidth = Math.round((contentWidth * item.value) / maxValue)
        const textTop = offsetY + 1 + barHeight / 2

        const labelText = this.getShortenedText(
          item.label,
          startX - BAR_PADDING
        )

        ctx.fillStyle = item.color
        ctx.fillRect(AXIS_BORDER_WIDTH + startX, offsetY, barWidth, barHeight)

        ctx.font = `${LABEL_FONT_SIZE}px ${this.canvasStyles.fontFamily}`
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'right'
        ctx.fillStyle = this.canvasStyles.borderColor
        ctx.fillText(
          labelText,
          startX - BAR_PADDING,
          textTop,
          startX - BAR_PADDING
        )

        let textLeft
        let textColor

        ctx.font = `500 ${LABEL_FONT_SIZE}px ${this.canvasStyles.fontFamily}`
        ctx.textAlign = 'left'
        const sumText = `${this.formatSum(item.value, this.locale)}`
        const textMetrics = ctx.measureText(sumText)

        if (textMetrics.width > barWidth - BAR_PADDING * 2) {
          // text doesn't fit inside bar
          textColor = this.canvasStyles.color
          textLeft = startX + barWidth + AXIS_BORDER_WIDTH + BAR_PADDING
        } else {
          // text fits inside bar
          textColor = this.getContrastColor(item.color)
          textLeft = startX + AXIS_BORDER_WIDTH + BAR_PADDING
        }

        ctx.fillStyle = textColor
        ctx.fillText(sumText, textLeft, textTop)

        offsetY += itemHeight
      })
    },
    getShortenedText(text, width) {
      const span = document.createElement('span')
      span.innerHTML = text
      span.style.position = 'absolute'
      span.style.left = '-99999px'
      span.style.fontSize = `${LABEL_FONT_SIZE}px`
      this.$refs.wrapper.appendChild(span)

      let isShortened = false
      let w = span.offsetWidth
      let shortenedText = text
      while (w > width) {
        isShortened = true
        shortenedText = shortenedText.slice(0, -1)
        span.innerHTML = `${shortenedText}...`
        w = span.offsetWidth
      }
      return isShortened ? `${shortenedText}...` : text
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
  overflow: hidden;

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
  font-family: $font-family-base;
  font-size: $font-size-base * 0.75;
  border: none;
  border-color: var(--outline);
}
</style>
