<template>
  <button
    :title="title"
    :aria-label="title"
    class="btn btn-fab"
    @click="$emit('click')"
  >
    <svg-icon name="edit-24" width="24" height="24" aria-hidden="true" />
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-fab {
  position: fixed;
  right: #{$grid-gap * 0.5};
  bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  border: none;
  color: var(--fab-color);
  background-color: var(--fab-bg);
  box-shadow: $shadow-2;

  &:hover {
    color: var(--fab-hover-color);
    background-color: var(--fab-hover-bg);
    box-shadow: $shadow-6;
  }
}
</style>
