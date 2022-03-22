<template>
  <div class="app-wrapper">
    <NavDrawer
      :visible="drawerOpen"
      @close="setDrawerOpen(false)"
      v-on="$listeners"
    />
    <Nuxt class="app-content" />
    <NavBar @drawer-show="setDrawerOpen(true)" />
    <ToastMessage />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
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
  methods: {
    ...mapActions(['setDrawerOpen']),
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
    display: flex;
    max-height: 100vh;
    padding-bottom: 0;

    ::v-deep {
      .btn-fab {
        right: 5rem;
        bottom: 5rem;
      }
    }
  }

  .app-content {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
  }
}
</style>
