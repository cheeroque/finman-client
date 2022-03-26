import { formatSum } from '@/utils'

export class Chart {
  #canvasWidth = 0
  #canvasHeight = 0
  #canvasStyles = {}
  #defaultOptions = {
    axisBorderWidth: 1,
    axisTickSize: 4,
    barThicknessRatio: 0.75,
    barPadding: 8,
    labelFontSize: 12,
    maxLabelWidthRatio: 0.25,
    valueSteps: 10,
  }

  #itemHeight = 0
  #itemTop = 0
  #labelsWidth = 0
  #labelsHeight = 0
  #maxValue = 0
  #valueSize = 0

  constructor(context, items, options = {}) {
    this.context = context
    this.items = items
    this.options = Object.assign(this.#defaultOptions, options)
  }

  initCanvas() {
    const boundingRect = this.context.canvas.getBoundingClientRect()
    this.context.canvas.width = Math.round(boundingRect.width)
    this.context.canvas.height = Math.round(boundingRect.height)
    this.#canvasWidth = this.context.canvas.width
    this.#canvasHeight = this.context.canvas.height
    this.#canvasStyles = getComputedStyle(this.context.canvas)

    this.context.font = `${this.options.labelFontSize}px ${
      this.#canvasStyles.fontFamily
    }`

    this.#maxValue = Math.max(...this.items.map(({ value }) => value))
    this.context.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight)
  }

  getLabelMetrics() {
    // Get item labels width
    const maxLabelWidth = Math.round(
      this.options.maxLabelWidthRatio * this.#canvasWidth
    )
    let labelsWidth = 0
    this.items.forEach(({ label }) => {
      const textMetrics = this.context.measureText(label)
      if (textMetrics.width > labelsWidth) {
        labelsWidth = Math.round(textMetrics.width)
      }
    })
    this.#labelsWidth = Math.min(maxLabelWidth, labelsWidth)

    // Get value labels height
    const maxLabelHeight = Math.round(
      this.options.maxLabelWidthRatio * this.#canvasHeight
    )
    const textMetrics = this.context.measureText(formatSum(this.#maxValue))
    this.#labelsHeight = Math.round(
      Math.min(textMetrics.width + this.options.barPadding, maxLabelHeight)
    )
  }

  getItemMetrics() {
    const itemCount = this.items.length + (1 - this.options.barThicknessRatio)
    this.#itemHeight = Math.round(
      (this.#canvasHeight - this.#labelsHeight) / itemCount
    )
    this.#itemTop = Math.round(
      this.#itemHeight * this.options.barThicknessRatio
    )
  }

  drawLabels() {
    this.context.fillStyle = this.#canvasStyles.borderColor

    // Draw item labels
    this.context.textBaseline = 'middle'
    this.context.textAlign = 'right'

    let offsetTop = this.#itemTop

    this.items.forEach(({ label }) => {
      const itemWidth = this.#labelsWidth - this.options.barPadding
      const y =
        offsetTop +
        Math.round((this.#itemHeight * this.options.barThicknessRatio) / 2)
      this.drawText(label, itemWidth, y, itemWidth)
      offsetTop += this.#itemHeight
    })

    // Draw value labels
    this.context.textBaseline = 'bottom'

    const valueWidth =
      (this.#canvasWidth - this.#labelsWidth) / this.options.valueSteps

    let offsetLeft = this.#labelsWidth
    for (let i = 1; i <= this.options.valueSteps; i++) {
      let step
      if (i < this.options.valueSteps) {
        offsetLeft += valueWidth
        step = Math.round((this.#maxValue * i) / this.options.valueSteps)
      } else {
        offsetLeft = this.#canvasWidth
        step = this.#maxValue
      }
      this.drawText(
        formatSum(step),
        offsetLeft,
        this.#canvasHeight - this.#labelsHeight + this.options.barPadding,
        undefined,
        true
      )
    }
  }

  drawAxis() {
    this.context.fillStyle = this.#canvasStyles.borderColor
    this.context.globalAlpha = 0.25

    // X axis
    this.context.fillRect(
      this.#labelsWidth + this.options.axisBorderWidth,
      this.#canvasHeight - this.#labelsHeight,
      this.#canvasWidth - this.#labelsWidth - this.options.axisBorderWidth,
      this.options.axisBorderWidth
    )

    // Y axis
    this.context.fillRect(
      this.#labelsWidth,
      0,
      this.options.axisBorderWidth,
      this.#canvasHeight - this.#labelsHeight + this.options.axisBorderWidth
    )

    if (this.options.axisBorderWidth) {
      // ticks
      this.context.globalAlpha = 0.15
      this.context.fillRect(
        this.#labelsWidth - this.options.axisTickSize,
        this.#canvasHeight - this.#labelsHeight,
        this.options.axisTickSize,
        this.options.axisBorderWidth
      )
      this.context.fillRect(
        this.#labelsWidth,
        this.#canvasHeight - this.#labelsHeight + this.options.axisBorderWidth,
        this.options.axisBorderWidth,
        this.options.axisTickSize
      )
    }
    this.context.globalAlpha = 1
  }

  drawText(text, x, y, maxWidth, rotate = false) {
    const shortenedText = maxWidth
      ? this.getShortenedText(text, maxWidth)
      : text
    this.context.save()
    if (rotate) {
      this.context.translate(x, y)
      this.context.rotate((-90 * Math.PI) / 180)
      this.context.fillText(shortenedText, 0, 0)
      this.context.restore()
    } else {
      this.context.fillText(shortenedText, x, y)
    }
  }

  getShortenedText(text, maxWidth) {
    if (!document) return text

    const span = document.createElement('span')
    span.innerHTML = text
    span.style.position = 'absolute'
    span.style.left = '-99999px'
    span.style.opacity = 0
    span.style.fontFamily = this.#canvasStyles.fontFamily
    span.style.fontSize = `${this.options.labelFontSize}px`
    document.body.appendChild(span)

    let isShortened = false
    let w = span.offsetWidth
    let shortenedText = text
    while (w > maxWidth) {
      isShortened = true
      shortenedText = shortenedText.slice(0, -1)
      span.innerHTML = `${shortenedText}...`
      w = span.offsetWidth
    }
    document.body.removeChild(span)
    return isShortened ? `${shortenedText}...` : text
  }

  draw() {
    this.initCanvas()
    this.getLabelMetrics()
    this.getItemMetrics()
    this.drawLabels()
    this.drawAxis()
  }
}
