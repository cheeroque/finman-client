<template>
  <div class="app-wrapper">
    <!-- <NavDrawer /> -->
    <Nuxt />
    <NavBar />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async fetch() {
    await this.fetchGlobalData()
  },
  methods: {
    ...mapActions(['fetchGlobalData']),
  },
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  padding-bottom: calc(
    #{$navbar-padding-y * 2} + #{$navbar-icon-padding-y * 2} + #{$navbar-icon-spacer} + #{$line-height-base} *
      var(--rem) + 24px
  );
}
</style>
