<template>
  <input
    v-model="localValue"
    :class="{ 'form-control-sm': size === 'sm', 'form-control-lg': size === 'lg' }"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :type="type"
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
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    readonly: {
      type: Boolean,
      default() {
        return false
      }
    },
    required: {
      type: Boolean,
      default() {
        return false
      }
    },
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
