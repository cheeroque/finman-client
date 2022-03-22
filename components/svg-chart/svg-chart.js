import { formatSum } from '@/utils'

export class SvgChart {
  #defaultOptions = {
    barHeight: 40,
    barPadding: 12,
    barSpacing: 8,
    borderRadius: 0,
    combineThreshold: 0,
    fontSize: 16,
    strokeWidth: 2,
  }

  #maxValue = 0
  #svgRoot = null
  #svgWidth = 0
  #svgHeight = 0
  #totalValue = 0

  constructor(el, items, options = {}) {
    this.#totalValue = items.reduce((acc, cur) => (acc += cur.value), 0)
    this.#maxValue = items.reduce(
      (acc, cur) => (cur.value > acc ? cur.value : acc),
      0
    )

    this.options = Object.assign(this.#defaultOptions, options)
    this.el = el
    this.items = this.combineItems(items)

    this.#svgWidth = el.getBoundingClientRect().width
    this.#svgHeight = el.getBoundingClientRect().height
  }

  draw() {
    this.calculateHeight()
    this.createSvgRoot()

    let offsetTop = 0
    this.items.forEach((item) => {
      const itemWidth = (this.#svgWidth * item.value) / this.#maxValue
      this.drawBar(
        0,
        offsetTop,
        itemWidth,
        this.options.barHeight,
        item.fill,
        this.options.borderRadius,
        item.isCombined ? 'svg-chart-bar-combined' : null
      )

      const textOffsetTop = offsetTop + this.options.barHeight / 2
      const labelText = this.drawText(
        item.label,
        this.options.barPadding,
        textOffsetTop,
        'central'
      )

      const labelWidth = labelText.getBBox().width
      if (labelWidth > itemWidth - this.options.barPadding * 2) {
        labelText.setAttributeNS(null, 'x', this.options.barPadding + itemWidth)
        labelText.classList.add('svg-chart-label-out')
      } else {
        labelText.setAttributeNS(null, 'fill', item.textFill)
        labelText.classList.add('svg-chart-label-in')
      }

      offsetTop += this.options.barHeight + this.options.barSpacing
    })
  }

  calculateHeight() {
    this.#svgHeight =
      this.items.length * this.options.barHeight +
      (this.items.length - 1) * this.options.barSpacing
  }

  combineItems(items) {
    if (!(this.options.combineThreshold > 0)) return items
    else {
      let combinedSum = 0
      const combinedItems = []
      items.forEach((item) => {
        const ratio = item.value / this.#totalValue
        if (ratio >= this.options.combineThreshold) combinedItems.push(item)
        else combinedSum += item.value
      })
      if (combinedSum > 0) {
        combinedItems.push({
          displayValue: formatSum(combinedSum),
          isCombined: true,
          label: 'Прочее',
          value: combinedSum,
        })
      }
      /* if combined items length is the same as items,
      then there's only one item below threshold,
      so return original items */
      return combinedItems.length < items.length ? combinedItems : items
    }
  }

  createSvgRoot() {
    /* Clear previously created charts */
    while (this.el.firstChild) {
      this.el.removeChild(this.el.lastChild)
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttributeNS(null, 'width', this.#svgWidth)
    svg.setAttributeNS(null, 'height', this.#svgHeight)
    svg.setAttributeNS(
      null,
      'viewbox',
      `0 0 ${this.#svgWidth} ${this.#svgHeight}`
    )
    svg.classList.add('svg-chart-root')
    this.el.appendChild(svg)
    this.#svgRoot = svg
  }

  drawBar(x, y, width, height, fill, borderRadius, classList) {
    const strokeOffset = this.options.strokeWidth / 2
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttributeNS(null, 'x', x + strokeOffset)
    rect.setAttributeNS(null, 'y', y + strokeOffset)
    rect.setAttributeNS(null, 'height', height - strokeOffset * 2)
    rect.setAttributeNS(null, 'width', 0)
    rect.setAttributeNS(null, 'stroke-width', this.options.strokeWidth)
    rect.classList.add('svg-chart-bar')
    if (fill) {
      rect.setAttributeNS(null, 'fill', fill)
      rect.setAttributeNS(null, 'stroke', fill)
    }
    if (borderRadius > 0) rect.setAttributeNS(null, 'rx', borderRadius)
    if (classList) rect.classList.add(classList)
    this.#svgRoot.appendChild(rect)
    // animate width
    setTimeout(() => {
      rect.setAttributeNS(null, 'width', width - strokeOffset * 2)
    }, 1)
  }

  drawText(txt, x = 0, y = 0, verticalAlign) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttributeNS(null, 'x', x)
    text.setAttributeNS(null, 'y', y)
    if (verticalAlign) {
      text.setAttributeNS(null, 'alignment-baseline', verticalAlign)
    }
    text.classList.add('svg-chart-caption')
    text.textContent = txt
    this.#svgRoot.appendChild(text)
    return text
  }
}
