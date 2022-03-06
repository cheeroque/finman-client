<template>
  <div ref="group" class="form-group" role="group">
    <label v-if="label" :for="controlId" class="form-group-label">
      <span>{{ label }}</span>
    </label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
  },
  computed: {
    controlId() {
      return `form-control-${this._uid}`
    },
  },
  mounted() {
    this.setControlId()
  },
  methods: {
    setControlId() {
      const control = this.$refs.group.querySelector('.form-control')
      if (control) control.setAttribute('id', this.controlId)
    },
  },
}
</script>
