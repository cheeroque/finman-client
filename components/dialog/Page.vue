<template>
  <div>
    <header class="header header-secondary">
      <a
        v-if="!disableBack"
        href="#"
        class="btn btn-header-back"
        @click.prevent="$router.back()"
      >
        <svg-icon
          name="arrow-left-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </a>
      <h4 class="header-content mb-0">
        <slot name="dialog-title">
          {{ title }}
        </slot>
      </h4>
      <button
        v-if="actionTitle"
        class="btn btn-header-action"
        @click="$emit('action')"
      >
        <slot name="dialog-action">
          {{ actionTitle }}
        </slot>
      </button>
    </header>
    <main class="container">
      <slot></slot>
    </main>
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
    disableBack: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>
