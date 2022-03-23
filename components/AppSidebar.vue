<template>
  <aside class="app-sidebar">
    <SidebarSearch />
    <template v-for="widget in widgets">
      <component :is="`SidebarWidget${widget}`" :key="`widget${widget}`" />
    </template>
  </aside>
</template>

<script>
export default {
  computed: {
    widgets() {
      const routeName = this.$route.name.toString()
      return /months/.test(routeName)
        ? ['Chart', 'Categories']
        : /categories/.test(routeName)
        ? ['Chart', 'Calendar']
        : ['Calendar', 'Categories']
    },
  },
}
</script>

<style lang="scss" scoped>
.app-sidebar {
  display: flex;
  flex-direction: column;
  gap: $grid-gap * 0.5;
  transition: $transition;
  transition-property: width;
}

@include media-min-width('lg') {
  .app-sidebar {
    width: 320px;
  }
}

@include media-min-width('xl') {
  .app-sidebar {
    width: 360px;
  }
}
</style>
