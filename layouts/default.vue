<template>
  <div class="app-wrapper">
    <NavDrawer :visible="drawerVisible" @close="hideDrawer" />
    <Nuxt />
    <NavBar @drawer-show="showDrawer" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async fetch() {
    await this.fetchGlobalData()
  },
  data() {
    return {
      drawerVisible: false,
    }
  },
  methods: {
    ...mapActions(['fetchGlobalData']),
    hideDrawer() {
      this.drawerVisible = false
    },
    showDrawer() {
      this.drawerVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
$navbar-height: calc(
  #{$navbar-padding-y * 2} + #{$navbar-icon-padding-y * 2} + #{$navbar-icon-spacer} +
    #{$line-height-base} * var(--rem) + 24px
);

.app-wrapper {
  padding-bottom: $navbar-height;

  ::v-deep {
    .btn-fab {
      bottom: calc(#{$navbar-height} + var(--spacer));
    }
  }
}
</style>
