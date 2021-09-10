<template>
  <div class="app-wrapper">
    <AppSidebar :visible="sidebarVisible" @hide="sidebarVisible = false" />
    <div class="app-content">
      <AppHeader />
      <Nuxt />
    </div>

    <AppControls @toggle-sidebar="sidebarVisible = !sidebarVisible" @toggle-search="modalSearchVisible = true" />
    <ModalRecordEdit v-model="modalRecordVisible" :create="modalRecordIsCreate" :item="modalRecordItem" />
    <ModalReviseEdit v-model="modalReviseVisible" :item="modalReviseItem" />
    <ModalSearch v-model="modalSearchVisible" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalRecordIsCreate: false,
      modalRecordItem: {},
      modalRecordVisible: false,
      modalReviseItem: {},
      modalReviseVisible: false,
      modalSearchVisible: false,
      sidebarVisible: false
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
  beforeMount() {
    this.$root.$on('record-add', (event) => {
      this.modalRecordIsCreate = true
      this.modalRecordItem = {}
      this.modalRecordVisible = true
    })
    this.$root.$on('record-edit', (event) => {
      this.modalRecordIsCreate = false
      this.modalRecordItem = event
      this.modalRecordVisible = true
    })
    this.$root.$on('revise-edit', (event) => {
      this.modalReviseItem = event
      this.modalReviseVisible = true
    })
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
    height: 100vh;
    overflow: hidden;
  }

  .app-content {
    flex: 1 1 auto;
    min-height: 0;
    padding: 0 1.5rem 1.5rem;
    overflow-y: auto;
  }
}
</style>
