<template>
  <input
    ref="input"
    :value="value"
    :class="{
      'form-control-valid': state === true,
      'form-control-invalid': state === false,
    }"
    placeholder="0"
    type="text"
    class="form-control"
    @blur="calculateValue"
    @focus="setCaret"
    @input.prevent="filterValue"
    @keydown.enter="onEnter"
  />
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    state: {
      type: Boolean,
      default: null,
    },
    value: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      hasTotal: true,
    }
  },
  methods: {
    calculateValue({ target }) {
      const matches = target.value.match(/([+-]{0,}\d{1,})/gi) || []
      const total = matches.reduce((total, match) => {
        total += parseInt(match)
        return total
      }, 0)
      this.$emit('input', total)
      this.hasTotal = true
    },
    filterValue({ target }) {
      this.hasTotal = false
      const pattern = /[^\d+-]/
      const filteredValue = `${target.value}`.replace(pattern, '')
      target.value = filteredValue || 0
    },
    onEnter(event) {
      if (!this.hasTotal) {
        event.preventDefault()
        this.calculateValue({ target: this.$refs.input })
        /* force input value update (for +0 situations) */
        this.$refs.input.value = this.value
      }
    },
    setCaret({ target }) {
      /* move caret to the end on input focus */
      if (target.selectionEnd) {
        target.setSelectionRange(target.selectionEnd, target.selectionEnd)
      }
    },
  },
}
</script>
