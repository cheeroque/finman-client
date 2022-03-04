<template>
  <div :class="{ 'has-append': hasAppend, 'has-prepend': hasPrepend }" class="input-group" role="group">
    <div v-if="hasPrepend" class="input-group-prepend">
      <slot name="prepend"></slot>
    </div>
    <slot></slot>
    <div v-if="hasAppend" class="input-group-append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hasAppend() {
      return this.$slots && this.$slots.append
    },
    hasPrepend() {
      return this.$slots && this.$slots.prepend
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;

  &.has-append {
    ::v-deep {
      .form-control {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  .input-group-append {
    ::v-deep {
      .btn,
      .input-group-text {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }

  &.has-prepend {
    ::v-deep {
      .form-control {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }

  .input-group-prepend {
    ::v-deep {
      .btn,
      .input-group-text {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
}
</style>
