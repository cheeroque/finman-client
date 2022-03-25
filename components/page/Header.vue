<template>
  <header class="page-header">
    <a
      v-if="!disableBack"
      href="#"
      class="btn btn-header-back"
      @click.prevent="goBack"
    >
      <svg-icon
        name="arrow-left-24"
        width="24"
        height="24"
        aria-hidden="true"
      />
    </a>
    <h4 class="header-content mb-0">
      <slot> </slot>
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
</template>

<script>
export default {
  props: {
    actionTitle: {
      type: String,
      default: null,
    },
    backIsClose: {
      type: Boolean,
      default: false,
    },
    disableBack: {
      type: Boolean,
      default: false,
    },
    linkBack: {
      type: String,
      default: '/',
    },
  },
  methods: {
    goBack() {
      if (this.backIsClose) this.$emit('close')
      else if (this.$nuxt.context.from) this.$router.back()
      else this.$router.push(this.linkBack)
    },
  },
}
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  align-items: center;
  min-height: calc(24px + 2.5rem);
  padding: $grid-gap * 0.5 0;
  color: $header-color;
  background-color: $header-bg;

  .header-content {
    flex: 1 1 auto;
    max-width: 100%;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn-header-action {
    align-self: flex-end;
    margin-right: -0.5rem;
    margin-left: auto;
    margin-bottom: -0.125rem;
    padding: 0.5rem;
    border: none;
    color: $dialog-color-accent;
  }

  .btn-header-back {
    margin-right: 0.5rem;
    margin-left: -0.5rem;
    padding: 0.5rem;
    border: none;
  }
}

@include media-min-width('md') {
  .page-header {
    min-height: 0;
    padding: 0;
    margin-bottom: $grid-gap;
  }
}

@include media-min-width('xl') {
  .page-header {
    min-height: 3.5rem;
  }
}
</style>
