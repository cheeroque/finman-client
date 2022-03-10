<template>
  <div class="app-wrapper">
    <NavDrawer :visible="drawerVisible" @close="hideDrawer" v-on="$listeners" />
    <Nuxt />
    <NavBar @drawer-show="showDrawer" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      drawerVisible: false,
      scrollTop: 0,
    }
  },
  async fetch() {
    await this.fetchGlobalData()
  },
  computed: {
    ...mapGetters(['bodyFixed']),
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
    ...mapActions(['fetchGlobalData', 'setDrawerOpen']),
    hideDrawer() {
      this.drawerVisible = false
      this.setDrawerOpen(false)
    },
    showDrawer() {
      this.setDrawerOpen(true)
      this.drawerVisible = true
    },
    setBodyFixed(isFixed = false) {
      if (process.client) {
        if (isFixed) {
          const rect = document?.body?.getBoundingClientRect()
          this.scrollTop = rect?.top || 0
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
$navbar-height: calc(
  #{$navbar-padding-y * 2} + #{$navbar-icon-padding-y * 2} + #{$navbar-icon-spacer} +
    #{$line-height-base * $font-size-base} + 24px
);

.app-wrapper {
  padding-bottom: $navbar-height;

  ::v-deep {
    .btn-fab {
      bottom: calc(#{$navbar-height} + #{$grid-gap * 0.5});
    }
  }
}
</style>
