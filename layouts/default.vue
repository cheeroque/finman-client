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
.app-wrapper {
  display: flex;
  overflow: hidden;
}
</style>
