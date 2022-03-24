<template>
  <div class="page">
    <transition name="sidebar">
      <PageSidebar
        v-if="sidebarVisible"
        :show-widgets="widgetsVisible"
        :widgets="widgets"
      />
    </transition>
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { getViewportWidth } from '@/utils'

export default {
  props: {
    widgets: {
      type: Array,
      default() {
        return ['Chart', 'Calendar', 'Categories']
      },
    },
  },
  data() {
    return {
      breakpointSidebar: 768,
      breakpointWidgets: 1200,
      sidebarVisible: false,
      widgetsVisible: false,
    }
  },
  mounted() {
    this.toggleSidebar()
    this.toggleWidgets()
    window.addEventListener('resize', this.toggleSidebar, { passive: true })
    window.addEventListener('resize', this.toggleWidgets, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.toggleSidebar)
    window.removeEventListener('resize', this.toggleWidgets)
  },
  methods: {
    getViewportWidth,
    toggleSidebar() {
      const vw = this.getViewportWidth()
      this.sidebarVisible = vw >= this.breakpointSidebar
    },
    toggleWidgets() {
      const vw = this.getViewportWidth()
      this.widgetsVisible = vw >= this.breakpointWidgets
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-min-width('md') {
  .page {
    flex: 1 1 auto;
    min-height: 0;
    padding: 1.5rem 1.5rem 1.5rem 0;
    overflow-y: auto;
  }

  ::v-deep {
    .pagination {
      display: flex;
      justify-content: center;
      padding: 0 1.5rem;
    }

    .pagination-nav {
      width: auto;

      .nav-item {
        min-width: 2.5rem;
      }
    }
  }
}

@include media-min-width('xl') {
  .page {
    display: flex;
    gap: $grid-gap;
  }

  .page-content {
    height: min-content;
  }

  ::v-deep {
    .pagination {
      justify-content: flex-end;
    }
  }
}
</style>
