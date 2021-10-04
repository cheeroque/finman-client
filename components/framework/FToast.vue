<template>
  <transition name="toast" duration="200">
    <div v-if="visible" :class="`toast-${variant}`" class="toast">
      <div v-if="hasHeader" class="toast-header">
        <slot name="header">
          {{ title }}
        </slot>
        <button class="btn btn-close" aria-label="Закрыть" title="Закрыть" @click="$root.$emit('toast-hide')">
          <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
        </button>
      </div>
      <div class="toast-body">
        <slot>
          {{ message }}
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    timeout: {
      type: [Number, String, Boolean],
      default: 3000
    },
    variant: {
      type: String,
      default: 'white'
    },
    visible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    hasHeader() {
      return !!this.title || (this.$slots && this.$slots.header)
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        let timer
        if (value && this.timeout) {
          timer = setTimeout(() => {
            this.$root.$emit('toast-hide')
          }, parseInt(this.timeout))
        } else {
          clearTimeout(timer)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: calc(3.8125rem + 39px);
  padding: 0.75rem 1rem;
  font-size: $font-size-2;
  border-radius: $border-radius;
  border: $border-width solid $gray-100;
  background-color: $white;
  box-shadow: $box-shadow-sm;
  z-index: 1000;
}

.toast-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-family: $font-family-alternate;
  font-size: $font-size-3;
  font-weight: $font-weight-medium;

  .btn-close {
    padding: 0;
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: $transition-base;
  transition-property: opacity, transform;
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@media (min-width: 992px) {
  .toast {
    left: auto;
    right: 1.5rem;
    top: 1.5rem;
    bottom: auto;
    width: 320px;
    padding: 1rem 1.25rem;
    font-size: $font-size-3;
    opacity: 0.75;
  }
}

@each $color, $value in $theme-colors {
  .toast-#{$color} {
    border-color: lighten($value, 48%);
    background-color: lighten($value, 50%);

    .toast-header {
      color: $value;
    }
  }
}
</style>
