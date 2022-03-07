<template>
  <div class="form-control">
    <input
      v-model="localValue"
      ref="input"
      :max="max"
      :min="min"
      :placeholder="placeholder"
      :step="step"
      :type="type"
      class="form-control-input"
    />
    <div v-if="hasAppend" class="form-control-append" @click="focusInput">
      <slot name="append">
        {{ append }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    append: {
      type: String,
      default: null,
    },
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
    hasAppend() {
      return this.$slots.append || this.append
    },
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    focusInput() {
      if (!this.$refs.input) return
      this.$refs.input.focus()
    },
  },
}
</script>
