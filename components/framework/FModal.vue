<template>
  <transition name="modal" duration="200">
    <div v-if="visible" class="modal-outer">
      <div class="modal-backdrop" @click="close"></div>
      <div :class="{ 'modal-lg': size === 'lg' }" class="modal" role="dialog">
        <header class="modal-header">
          <slot name="modal-header">{{ title }}</slot>
          <button class="btn btn-close" aria-label="Закрыть" title="Закрыть" @click="close">
            <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
          </button>
        </header>
        <section class="modal-body">
          <slot :close="close"></slot>
        </section>
        <footer class="modal-footer">
          <slot :close="close" name="modal-footer">
            <button class="btn btn-primary" aria-label="Закрыть" title="Закрыть" @click="close">Закрыть</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    size: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  watch: {
    visible(value) {
      if (value) this.$emit('show')
      else this.$emit('hide')
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onKeydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeydown)
  },
  methods: {
    close() {
      this.$emit('change', false)
    },
    onKeydown({ key }) {
      if (key === 'Escape') this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-outer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: $zindex-modal;
}

.modal-backdrop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba($black, 0.75);
}

.modal {
  position: relative;
  flex: 0 0 auto;
  width: 320px;
  max-width: calc(100vw - 2rem);
  padding: 0.75rem 0;
  border-radius: $border-radius;
  background-color: $body-bg;
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  font-family: $font-family-alternate;
  font-size: $font-size-4;
  font-weight: $font-weight-medium;
}

.modal-body {
  padding: 0.75rem 1.5rem;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 1.5rem 0.5rem;
}

.modal-enter-active,
.modal-leave-active {
  .modal-backdrop {
    transition: opacity 0.2s ease-in;
  }

  .modal {
    transition: transform 0.2s ease-out;
  }
}

.modal-enter,
.modal-leave-to {
  .modal-backdrop {
    opacity: 0;
  }

  .modal {
    transform: translateY(-50vh);
  }
}

@media (max-width: 991.98px) {
  .modal-footer {
    flex-wrap: wrap;

    /deep/ {
      & > * {
        flex: 1 1 auto;
      }
    }
  }
}

@media (min-width: 992px) {
  .modal {
    width: 560px;

    &.modal-lg {
      width: 720px;
    }
  }
}
</style>
