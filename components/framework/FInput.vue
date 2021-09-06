<template>
  <input v-model="localValue" :type="type" class="form-control" />
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
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
