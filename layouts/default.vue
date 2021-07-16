<template>
  <div>
    <AppNavbar :total="total" />
    <AppHeader :total="total" />
    <Nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    total() {
      return this.$store.state.total
    }
  },
  mounted() {
    this.$store.dispatch('getTotal')
    this.$store.dispatch('getCategories')
  }
}
</script>
