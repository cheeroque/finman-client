<template>
  <transition name="dialog-fullscreen">
    <div v-if="visible" class="dialog-fullscreen">
      <header class="dialog-header">
        <button
          title="Назад"
          aria-label="Назад"
          class="btn btn-dialog-back"
          @click="hide"
        >
          <svg-icon
            name="arrow-left-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </button>
        <h4 class="dialog-title">
          <slot name="dialog-title">
            {{ title }}
          </slot>
        </h4>
        <button class="btn btn-dialog-action" @click="$emit('action')">
          <slot name="dialog-action">
            {{ actionTitle }}
          </slot>
        </button>
      </header>
      <div class="dialog-body">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    actionTitle: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
  methods: {
    hide() {
      this.localVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-fullscreen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--background);
  z-index: 990;
}

.dialog-header {
  display: flex;
  align-items: center;
  padding: calc(#{$dialog-fullscreen-padding-y} - 0.5rem)
    calc(#{$dialog-fullscreen-padding-x} - 0.5rem);
  color: var(--on-primary-container);
  background-color: var(--secondary-container);
}

.dialog-title {
  margin-bottom: 0;
}

.btn-dialog-back {
  margin-right: 0.5rem;
  padding: 0.5rem;
  border: none;
}

.btn-dialog-action {
  margin: 0.25em 0 0 auto;
  padding: 0.5rem;
  border: 0;
  color: var(--primary);
}

.dialog-body {
  padding: $dialog-fullscreen-padding-y $dialog-fullscreen-padding-x;
}
</style>
