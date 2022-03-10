<template>
  <div class="input-group">
    <slot></slot>
    <div v-if="hasAppend" class="input-group-append">
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
  },
  computed: {
    hasAppend() {
      return this.$slots.append || this.append
    },
  },
}
</script>
