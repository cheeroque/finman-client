<template>
  <li role="presentation">
    <nuxt-link
      :to="localePath(item.link)"
      :title="item.text"
      :class="{ active: active }"
      class="nav-item"
    >
      <svg-icon :name="item.icon" width="24" height="24" aria-hidden="true" />
      {{ item.text }}
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>
