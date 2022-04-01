<template>
  <li role="presentation">
    <p class="nav-item-header h5">{{ $te(title) ? $t(title) : title }}</p>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-item-header {
  margin-bottom: 0;
  padding: $drawer-item-padding-y $drawer-item-padding-x;
  font-weight: $font-weight-medium;
}

@include media-min-width('md') {
  .nav-item-header {
    display: none;
  }
}
</style>
