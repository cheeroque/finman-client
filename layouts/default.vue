<template>
  <div>
    <app-header />
    <Nuxt />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: {
    AppHeader
  },
  mounted() {
    this.$store.dispatch('getTotal')
    this.$store.dispatch('getCategories')
  }
}
</script>
