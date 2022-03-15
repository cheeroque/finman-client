<template>
  <component
    :is="link ? 'nuxt-link' : 'button'"
    :to="link"
    :title="title"
    :aria-label="title"
    :class="{ offscreen: scrolledToBottom }"
    class="btn btn-fab"
    @click="$emit('click')"
  >
    <svg-icon name="edit-24" width="24" height="24" aria-hidden="true" />
  </component>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    link: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['scrolledToBottom']),
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
  color: $fab-color;
  background-color: $fab-bg;
  box-shadow: $shadow-2;
  opacity: 1;
  transform: translateX(0);
  transition: $transition;
  transition-property: opacity, transform;

  &:hover {
    color: $fab-active-color;
    background-color: $fab-active-bg;
    box-shadow: $shadow-6;
  }

  &.offscreen {
    opacity: 0;
    transform: translateX(150%);
  }
}
</style>
