<template>
  <div class="app-wrapper">
    <NavDrawer
      :visible="drawerVisible"
      class="app-drawer"
      @close="setDrawerOpen(false)"
    />
    <Nuxt class="app-content" />
    <NavBar @drawer-show="setDrawerOpen(true)" />
    <ToastMessage />
    <DialogWrapper />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getViewportWidth } from '@/utils'

export default {
  data() {
    return {
      breakpoint: 768,
      vw: null,
    }
  },
  computed: {
    ...mapGetters(['drawerOpen']),
    ...mapGetters('dialog', ['dialogVisible']),
    bodyFixed() {
      return this.dialogVisible || this.drawerOpen
    },
    drawerVisible() {
      return this.drawerOpen || this.vw >= this.breakpoint
    },
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
    this.setViewportWidth()
    window.addEventListener('resize', this.setViewportWidth, {
      passive: true,
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setViewportWidth)
  },
  methods: {
    ...mapActions(['setDrawerOpen']),
    getViewportWidth,

    closeDrawer() {
      this.setDrawerOpen(false)
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
    setViewportWidth() {
      this.vw = this.getViewportWidth()
    },
  },
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  min-height: 100vh;
  padding-bottom: $navbar-height;

  ::v-deep {
    .page-content {
      flex: 1 1 auto;
      padding-left: $grid-gap * 0.5;
      padding-right: $grid-gap * 0.5;
    }

    .btn-fab {
      bottom: calc(#{$navbar-height} + #{$grid-gap * 0.5});
    }
  }
}

@include media-min-width('md') {
  .app-wrapper {
    display: flex;
    gap: $grid-gap;
    max-height: 100vh;
    padding: 0;

    ::v-deep {
      .page-content {
        padding: 0;
      }

      .btn-fab {
        right: 3rem;
        bottom: 3rem;
      }
    }
  }

  .app-drawer {
    position: relative;
    flex: 0 0 auto;
    padding: 1.5rem 0 1.5rem 1.5rem;
    z-index: $zindex-drawer;
  }

  .page-sidebar {
    display: flex;
    flex-direction: column;
    gap: $grid-gap;
  }
}

@include media-min-width('xl') {
  .app-wrapper {
    ::v-deep {
      .btn-fab {
        right: 5rem;
        bottom: 5rem;
      }
    }
  }

  .page-sidebar {
    flex-direction: row;
  }
}
</style>
