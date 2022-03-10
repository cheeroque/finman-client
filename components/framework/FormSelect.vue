<template>
  <div class="form-select">
    <select v-model="localValue" class="form-control">
      <option
        v-for="(option, index) in options"
        :key="`option-${index}`"
        :disabled="option.disabled"
        :value="getValue(option)"
      >
        {{ getText(option) }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default() {
        return []
      },
    },
    value: {
      type: null,
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
    getText(option) {
      return typeof option === 'object' ? option.text : option
    },
    getValue(option) {
      return typeof option === 'object' ? option.value : option
    },
  },
}
</script>
