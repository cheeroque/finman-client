<template>
  <div>
    <AppHeader />
    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('getTotal')
    this.$store.dispatch('getCategories')
  }
}
</script>
