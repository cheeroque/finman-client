<template>
  <div class="custom-select">
    <select v-model="localValue" class="form-control">
      <option v-for="(option, index) in normalizedOptions" :key="`option-${index}`" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    textField: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: null
    },
    valueField: {
      type: String,
      default: 'value'
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
    normalizedOptions() {
      return this.options.map((option) => {
        return {
          value: option[this.valueField] || option,
          text: option[this.textField] || option
        }
      })
    }
  }
}
</script>
