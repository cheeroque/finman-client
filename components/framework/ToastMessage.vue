<template>
  <transition name="toast">
    <div v-if="toastVisible" class="toast-container">
      <div :class="variantClass" class="toast">
        <div class="toast-header">
          <p class="h6 toast-title">{{ title }}</p>
          <button
            title="Закрыть"
            aria-label="Закрыть"
            class="btn btn-close"
            @click="hideToast"
          >
            <svg-icon
              name="close-16"
              width="16"
              height="16"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="toast-body">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    timeout: {
      type: [Boolean, Number],
      default: 5000,
    },
  },
  data() {
    return {
      message: null,
      title: null,
      toastVisible: false,
      variant: null,
    }
  },
  computed: {
    variantClass() {
      return this.variant ? `toast-${this.variant}` : null
    },
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'toast/SHOW_TOAST') {
        this.showToast(state.toast)
      }
    })
  },
  methods: {
    showToast({ message, title, variant }) {
      this.message = message
      this.title = title
      this.variant = variant
      this.toastVisible = true
      if (this.timeout) {
        const timer = setTimeout(() => {
          this.hideToast()
          clearTimeout(timer)
        }, this.timeout)
      }
    },
    hideToast() {
      this.$store.dispatch('toast/clearToast')
      this.toastVisible = false
    },
  },
}
</script>
