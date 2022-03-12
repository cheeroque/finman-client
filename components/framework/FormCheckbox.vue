<template>
  <div class="custom-control custom-checkbox">
    <input
      :id="customControlId"
      v-model="localChecked"
      :name="name"
      :value="value"
      type="checkbox"
      class="custom-control-input"
    />
    <label :for="customControlId" class="custom-control-label">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'input',
  },
  props: {
    checked: {
      type: null,
      default: true,
    },
    name: {
      type: String,
      default: null,
    },
    uncheckedValue: {
      type: null,
      default: false,
    },
    value: {
      type: null,
      default: null,
    },
  },
  computed: {
    customControlId() {
      return `custom-control-${this._uid}`
    },
    localChecked: {
      get() {
        return Array.isArray(this.checked)
          ? this.checked.includes(this.value)
          : Boolean(this.value) === Boolean(this.checked)
      },
      set(newValue) {
        this.$emit('input', newValue ? this.value : this.uncheckedValue)
      },
    },
  },
}
</script>
