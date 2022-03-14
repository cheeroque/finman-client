<template>
  <InputGroup class="custom-color">
    <template #append>
      <span
        :style="{ backgroundColor: localValue }"
        class="form-color-indicator"
        aria-hidden="true"
      />
    </template>
    <FormInput
      v-model="localValue"
      :placeholder="placeholder"
      :state="state"
      @focus="handleInputFocus"
    />
    <input
      ref="colorInput"
      v-model="localValue"
      type="color"
      autocomplete="off"
      class="custom-color-input"
    />
  </InputGroup>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: null,
    },
    state: {
      type: Boolean,
      default: null,
    },
    value: {
      type: String,
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
  methods: {
    handleInputFocus() {
      if (this.$refs.colorInput) this.$refs.colorInput.click()
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .input-group-append {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(#{$input-line-height} * #{$input-font-size});
  }
}

.form-color-indicator {
  display: block;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 99rem;
}
</style>
