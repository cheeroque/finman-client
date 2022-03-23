<template>
  <transition name="sidebar">
    <aside v-if="sidebarVisible" class="app-sidebar">
      <SidebarSearch />
      <template v-if="widgetsVisible">
        <component
          v-for="widget in widgets"
          :is="`SidebarWidget${widget}`"
          :key="`widget${widget}`"
        />
      </template>
    </aside>
  </transition>
</template>

<script>
import { getViewportWidth } from '@/utils'

export default {
  data() {
    return {
      breakpointSidebar: 768,
      breakpointWidgets: 1200,
      sidebarVisible: false,
      widgetsVisible: false,
    }
  },
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
.app-sidebar {
  flex: 0 0 auto;
  transition: $transition;
  transition-property: width;
}

@include media-min-width('xl') {
  .app-sidebar {
    width: 360px;

    & > * {
      margin-bottom: $grid-gap * 0.5;
    }
  }
}
</style>
