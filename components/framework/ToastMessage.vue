<template>
  <transition name="toast">
    <div
      v-if="toastVisible"
      :style="{ bottom: bottomOffset }"
      class="toast-container"
    >
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
    bottomOffset: {
      type: [Number, String],
      default: null,
    },
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

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: $navbar-height;
  z-index: $zindex-modal + 1;
}

.toast {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: $toast-color;
  background-color: $toast-bg;
  opacity: $toast-opacity;

  .toast-header {
    display: flex;
    align-items: center;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
  }

  .toast-body {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
  }

  .toast-title {
    flex: 1 1 auto;
    margin: 0;
    font-weight: $font-weight-medium;
  }

  .btn-close {
    margin: -0.125rem;
    padding: 0.125rem;
    border-radius: 99rem;
    border: none;
  }

  &.toast-secondary {
    color: $toast-secondary-color;
    background-color: $toast-secondary-bg;
  }

  &.toast-success {
    color: $toast-success-color;
    background-color: $toast-success-bg;
  }

  &.toast-danger {
    color: $toast-danger-color;
    background-color: $toast-danger-bg;
  }
}

@include media-min-width('md') {
  .toast-container {
    top: $grid-gap * 0.5;
    right: $grid-gap * 0.5;
    bottom: auto;
    left: auto;
  }

  .toast {
    width: 320px;
    padding: 0.5rem 1.125rem;
    border-radius: 0.75rem;
    box-shadow: $shadow-12;

    .toast-header {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .toast-body {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
  }
}
</style>
