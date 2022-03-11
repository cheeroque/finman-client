<template>
  <div class="app-wrapper">
    <NavDrawer
      :visible="drawerOpen"
      @close="setDrawerOpen(false)"
      v-on="$listeners"
    />
    <Nuxt />
    <NavBar @drawer-show="setDrawerOpen(true)" />
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
