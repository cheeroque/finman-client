<template>
  <div class="app-wrapper">
    <AppSidebar :visible="sidebarShow" @hide="sidebarShow = false" />
    <div class="app-content">
      <AppHeader />
      <Nuxt />
    </div>
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
  }
}
</script>

<style lang="scss" scoped>
.app-content {
  padding-bottom: calc(3.8125rem + 39px);
}

@media (min-width: 992px) {
  .app-wrapper {
    display: flex;
    max-height: 100vh;
    overflow: hidden;
  }

  .app-content {
    flex: 1 1 auto;
    min-height: 0;
    padding: 0 1.5rem;
    overflow-y: auto;
  }
}
</style>
