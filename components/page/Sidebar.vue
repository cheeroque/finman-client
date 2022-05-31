<template>
  <aside class="app-sidebar">
    <SearchForm class="search-widget" />
    <div v-show="showWidgets">
      <SidebarWidgetChart :expanded="isCalendarRoute" />
      <SidebarWidgetCalendar v-if="!isCalendarRoute" />
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    showWidgets: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isCalendarRoute() {
      return this.$route.name.startsWith('months')
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

@include media-max-width('md') {
  .app-sidebar {
    display: none;
  }
}

@include media-min-width('xl') {
  .app-sidebar {
    width: 360px;
    height: min-content;
  }
}
</style>
