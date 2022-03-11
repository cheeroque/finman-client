<template>
  <transition name="dialog-fullscreen">
    <div v-if="visible" class="dialog dialog-fullscreen">
      <header class="dialog-header">
        <button
          title="Назад"
          aria-label="Назад"
          class="btn dialog-header-back"
          @click="cancel"
        >
          <svg-icon
            name="arrow-left-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </button>
        <h4 class="dialog-title mb-0">
          <slot name="dialog-title">
            {{ title }}
          </slot>
        </h4>
        <button class="btn dialog-header-action" @click="$emit('action')">
          <slot name="dialog-action">
            {{ actionTitle }}
          </slot>
        </button>
      </header>
      <div class="dialog-body">
        <div class="card">
          <slot :cancel="cancel" :ok="ok"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

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
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        this.$emit(value ? 'show' : 'hide')
        this.setDialogOpen(value)
      },
    },
  },
  methods: {
    ...mapActions(['setDialogOpen']),
    cancel() {
      this.$emit('cancel')
      this.localVisible = false
    },
    ok() {
      this.$emit('ok')
      this.localVisible = false
    },
  },
}
</script>
