<template>
  <button :title="item.text" class="nav-item" @click="$emit('click')">
    <svg-icon :name="item.icon" width="24" height="24" aria-hidden="true" />
    <slot>{{ item.text }}</slot>
  </button>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>
