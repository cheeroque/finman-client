<template>
  <div class="dialog dialog-fullscreen" role="dialog">
    <div class="dialog-content">
      <PageHeader class="dialog-header" back-is-close @close="$emit('close')">
        {{ title }}
      </PageHeader>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <button
        :title="$t('cancel')"
        :aria-label="$t('cancel')"
        class="btn btn-dialog-close"
        @click="$emit('close')"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </button>
    </div>
    <div class="dialog-backdrop" aria-hidden="true" @click="$emit('close')" />
  </div>
</template>

<script>
export default {
  props: {
    disableBack: {
      type: Boolean,
      default: false,
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
}
</script>

<style lang="scss" scoped>
.dialog-fullscreen {
  .dialog-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: $dialog-color;
    background-color: $dialog-bg;
  }

  .dialog-header {
    padding-left: $grid-gap * 0.5;
    padding-right: $grid-gap * 0.5;
  }

  .dialog-body {
    padding: 0 $grid-gap * 0.5 $grid-gap;
  }

  .dialog-backdrop {
    display: none;
  }

  .btn-dialog-close {
    position: absolute;
    right: $grid-gap * 0.5;
    bottom: $grid-gap * 0.58;
    padding: $btn-padding-y;
    border: none;
    border-radius: 99rem;
    background-color: var(--on-primary-container);
    background-color: var(--primary-container);

    &:not(:disabled):not(.disabled):focus,
    &:not(:disabled):not(.disabled):hover {
      color: var(--on-primary);
      background-color: var(--primary);
    }
  }
}

@include media-min-width('sm') {
  .dialog-fullscreen {
    .dialog-content {
      bottom: 0;
      left: auto;
      width: 75%;
      border-radius: $dialog-border-radius 0 0 $dialog-border-radius;
    }

    .dialog-header {
      padding: ($grid-gap * 0.5) 1rem;
      margin-bottom: 0;
    }

    .dialog-body {
      padding: 0 1rem 1rem;
    }

    .dialog-backdrop {
      display: block;
    }

    .btn-dialog-close {
      display: none;
    }
  }
}

@include media-min-width('md') {
  .dialog-fullscreen {
    .dialog-content {
      width: 62.5%;
    }
  }
}

@include media-min-width('xl') {
  .dialog-fullscreen {
    .dialog-content {
      width: 37.5%;
    }
  }
}
</style>
