<template>
  <input
    v-model="localValue"
    ref="input"
    :max="max"
    :min="min"
    :placeholder="placeholder"
    :step="step"
    :type="type"
    autocomplete="off"
    class="form-control"
    @focus="$emit('focus', $event)"
  />
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: null,
    },
    max: {
      type: [Number, String],
      default: null,
    },
    min: {
      type: [Number, String],
      default: null,
    },
    step: {
      type: [Number, String],
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
