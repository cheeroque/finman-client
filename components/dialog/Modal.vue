<template>
  <div class="dialog dialog-modal" role="dialog">
    <div class="dialog-content">
      <header class="dialog-header">
        <h5 class="dialog-title">{{ title }}</h5>
        <button
          title="Закрыть"
          aria-label="Закрыть"
          class="btn btn-dialog-close"
          @click="close"
        >
          <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
        </button>
      </header>
      <div class="dialog-body">
        <slot :close="close"></slot>
      </div>
    </div>
    <div class="dialog-backdrop" aria-hidden="true" @click="$emit('close')" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $grid-gap;

  .dialog-content {
    width: 100%;
    max-width: 400px;
    border-radius: $dialog-border-radius;
    color: $dialog-color;
    background-color: $dialog-bg;
  }

  .dialog-header {
    display: flex;
    align-items: center;
    padding: $dialog-padding-y $dialog-padding-x 0;
  }

  .dialog-title {
    flex: 1 1 auto;
    margin-bottom: 0;
  }

  .dialog-body {
    padding: $dialog-padding-y $dialog-padding-x;
  }

  .btn-dialog-close {
    margin: -$btn-padding-y;
    margin-left: 0;
    padding: $btn-padding-y;
    border: none;
    border-radius: 99rem;
  }

  ::v-deep {
    .form-control {
      &:not(:focus):not(:disabled):not(:read-only) {
        background-color: var(--background);
      }
    }
  }
}
</style>
