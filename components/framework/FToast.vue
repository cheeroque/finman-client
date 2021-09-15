<template>
  <div :class="{ show: visible }" class="toast">
    <div v-if="hasHeader" class="toast-header">
      <slot name="header">
        {{ title }}
      </slot>
    </div>
    <div class="toast-body">
      <slot>
        {{ message }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    hasHeader() {
      return !!this.title || (this.$slots && this.$slots.header)
    }
  }
}
</script>
