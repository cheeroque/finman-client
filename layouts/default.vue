<template>
  <div class="app-wrapper">
    <NavDrawer
      :visible="drawerOpen"
      @close="setDrawerOpen(false)"
      class="app-drawer"
    />
    <transition name="sidebar">
      <AppSidebar v-if="sidebarVisible" />
    </transition>
    <Nuxt class="app-content" />
    <NavBar @drawer-show="setDrawerOpen(true)" />
    <ToastMessage />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getViewportWidth } from '@/utils'

export default {
  data() {
    return {
      sidebarVisible: false,
    }
  },
  computed: {
    ...mapGetters(['bodyFixed', 'drawerOpen']),
  },
  watch: {
    bodyFixed: {
      immediate: true,
      handler(value) {
        this.setBodyFixed(value)
      },
    },
  },
  mounted() {
    this.toggleSidebar()
    window.addEventListener('resize', this.toggleSidebar, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.toggleSidebar)
  },
  methods: {
    getViewportWidth,
    ...mapActions(['setDrawerOpen']),
    toggleSidebar() {
      const vw = this.getViewportWidth()
      this.sidebarVisible = vw >= 768
    },
    setBodyFixed(isFixed = false) {
      if (process.client) {
        if (isFixed) {
          document.body.style.height = '100vh'
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.height = null
          document.body.style.overflow = null
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  min-height: 100vh;
  padding-bottom: $navbar-height;

  ::v-deep {
    .btn-fab {
      bottom: calc(#{$navbar-height} + #{$grid-gap * 0.5});
    }
  }
}

@include media-min-width('md') {
  .app-wrapper {
    display: grid;
    gap: $grid-gap;
    grid-template-columns: min-content auto;
    grid-template-rows: auto auto;
    max-height: 100vh;
    padding: 1.5rem;

    ::v-deep {
      .btn-fab {
        right: 5rem;
        bottom: 5rem;
      }
    }
  }

  .app-drawer {
    grid-row: 1 / span 2;
  }

  .app-content {
    min-height: 0;
    overflow-y: auto;
  }
}

@include media-min-width('lg') {
  .app-wrapper {
    grid-template-columns: min-content min-content auto;
    grid-template-rows: auto;
  }

  .app-drawer {
    grid-row: 1 / 2;
  }
}
</style>
