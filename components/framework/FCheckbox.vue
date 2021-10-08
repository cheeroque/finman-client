<template>
  <div
    :class="{ 'custom-control-sm': size === 'sm', 'custom-control-lg': size === 'lg' }"
    class="custom-control custom-checkbox"
  >
    <input
      v-model="localValue"
      :id="id"
      :disabled="disabled"
      :required="required"
      type="checkbox"
      class="custom-control-input"
    />
    <label :for="id" class="custom-control-label">
      <slot></slot>
    </label>
  </div>
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
    id: {
      type: String,
      required: true
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
    value: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    localValue: {
      get() {
        return Boolean(this.value)
      },
      set(newValue) {
        this.$emit('input', newValue ? 1 : 0)
      }
    }
  }
}
</script>
