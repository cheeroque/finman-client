<template>
  <div class="form-group" role="group">
    <label v-if="label" :for="labelFor">{{ label }}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    labelFor: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: $gray-500;
  }
}
</style>
