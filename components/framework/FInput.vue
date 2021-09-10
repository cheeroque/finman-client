<template>
  <input
    v-model="localValue"
    :type="type"
    :class="{ 'form-control-sm': size === 'sm', 'form-control-lg': size === 'lg' }"
    class="form-control"
  />
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    size: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: null
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
    }
  }
}
</script>
