<template>
  <aside class="app-sidebar">
    <SearchForm class="search-widget" />
    <transition-group name="sidebar-widgets" tag="div">
      <template v-if="showWidgets">
        <component
          :is="`SidebarWidget${widget}`"
          v-for="widget in widgets"
          :key="`widget${widget}`"
        />
      </template>
    </transition-group>
  </aside>
</template>

<script>
export default {
  props: {
    showWidgets: {
      type: Boolean,
      default: false,
    },
    widgets: {
      type: Array,
      default() {
        return ['Chart', 'Calendar', 'Categories']
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.app-sidebar {
  flex: 0 0 auto;
  transition: $transition;
  // transform for page transitions
  transition-property: width, transform;

  ::v-deep {
    .search-widget,
    .card-widget {
      margin-bottom: $grid-gap;
    }
  }
}

@include media-min-width('xl') {
  .app-sidebar {
    width: 360px;
    height: min-content;
  }
}
</style>
