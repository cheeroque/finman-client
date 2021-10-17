<template>
  <div class="app-wrapper">
    <AppSidebar :visible="sidebarVisible" @hide="sidebarVisible = false" />
    <div class="app-content">
      <AppHeader />
      <Nuxt />
    </div>

    <AppControls @toggle-sidebar="sidebarVisible = !sidebarVisible" />

    <FToast v-model="toastVisible" :message="errorMessage" title="Ошибка!" variant="danger" />

    <portal-target name="portal-modal" multiple />
    <portal-target name="portal-toast" multiple />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      sidebarVisible: false,
      toastVisible: false
    }
  },
  async fetch() {
    await this.fetchGlobalData()
  },
  computed: {
    ...mapGetters(['error']),
    errorMessage() {
      return this.error && this.error.path && `Действие: ${this.error.path}. Сообщение: ${this.error.error.message}`
    }
  },
  watch: {
    $route() {
      this.sidebarVisible = false
      this.scrollToTop()
    },
    error: {
      immediate: true,
      handler({ error, path }) {
        if (error && path) {
          this.toastVisible = true
        }
      }
    }
  },
  beforeMount() {
    this.$root.$on('toast-show', ({ title, message, variant }) => {
      this.toast = { message, title, variant }
      this.toastVisible = true
    })

    this.$root.$on('toast-hide', () => {
      this.toastVisible = false
    })
  },
  methods: {
    ...mapActions(['fetchGlobalData']),
    scrollToTop() {
      if (process.client) {
        const content = document.querySelector('.app-content')
        if (content) {
          content.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
        }
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
