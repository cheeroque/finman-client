<template>
  <input
    v-model="localValue"
    :placeholder="placeholder"
    :type="type"
    class="form-control"
  />
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [Number, String],
      default: null,
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
