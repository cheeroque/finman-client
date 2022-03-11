<template>
  <div class="dialog dialog-fullscreen dialog-page">
    <header class="dialog-header">
      <nuxt-link :to="linkBack" class="btn dialog-header-back">
        <svg-icon
          name="arrow-left-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </nuxt-link>
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
        <slot></slot>
      </div>
    </div>
  </div>
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
    linkBack: {
      type: String,
      default: '/',
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>
