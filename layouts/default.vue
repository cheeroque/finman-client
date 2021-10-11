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

    <FToast :message="toast.message" :title="toast.title" :variant="toast.variant" :visible="toastVisible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      modalRecordIsCreate: false,
      modalRecordItem: {},
      modalRecordVisible: false,
      modalReviseItem: {},
      modalReviseVisible: false,
      modalSearchVisible: false,
      sidebarVisible: false,
      toast: {
        message: null,
        title: null,
        variant: 'white'
      },
      toastMessage: null,
      toastTitle: null,
      toastVisible: false
    }
  },
  computed: {
    ...mapGetters(['error'])
  },
  watch: {
    $route() {
      this.sidebarVisible = false
      if (process.client) {
        const content = document.querySelector('.app-content')
        content.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    },
    error: {
      immediate: true,
      handler({ error, path }) {
        if (error && path)
          this.$root.$emit('toast-show', {
            title: 'Ошибка!',
            message: `Действие: ${path}. Сообщение: ${error.message}`,
            variant: 'danger'
          })
      }
    }
  },
  beforeMount() {
    this.$root.$on('record-add', () => {
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

    this.$root.$on('toast-show', ({ title, message, variant }) => {
      this.toast = { message, title, variant }
      this.toastVisible = true
    })

    this.$root.$on('toast-hide', () => {
      this.toastVisible = false
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
    padding: 0 1.5rem calc(4.8125rem + 39px);
    overflow-y: auto;
  }
}
</style>
