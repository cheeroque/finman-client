<template>
  <div class="app-wrapper">
    <!-- <NavDrawer /> -->
    <Nuxt />
    <!-- <NavBar /> -->
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
