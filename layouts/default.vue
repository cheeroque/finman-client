<template>
  <div class="app-wrapper">
    <AppSidebar v-model="sidebarShow" />
    <AppHeader />
    <Nuxt class="app-content" />
    <AppControls @toggle-sidebar="sidebarShow = !sidebarShow" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarShow: false
    }
  },
  watch: {
    $route() {
      if (process.client) {
        const content = document.querySelector('.app-content')
        content.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  },
  mounted() {
    this.$store.dispatch('getTotal')
    this.$store.dispatch('getCategories')
  }
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-up(lg) {
  .app-wrapper {
    display: flex;
    height: 100vh;
    overflow: hidden;

    ::v-deep {
      .app-content {
        min-height: 0;
        padding: 1.5rem 0;
        overflow-y: auto;
      }
    }
  }
}
</style>
