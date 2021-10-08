<template>
  <div
    :class="{ 'form-control-sm': size === 'sm', 'form-control-lg': size === 'lg' }"
    class="form-control custom-color"
  >
    <input
      v-model="localValue"
      :id="id"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      type="color"
      class="custom-control-input"
    />
    <label :for="id" class="custom-color-label">
      <span
        :style="{ backgroundColor: value, borderColor: value ? null : 'rgba(0,0,0,0.25)' }"
        class="custom-color-display"
        aria-hidden="true"
      ></span>
      <span :class="{ 'text-gray-600': !value }" v-text="value || 'Цвет не\xA0выбран.'">
        {{ value }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    id: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      default() {
        return false
      }
    },
    required: {
      type: Boolean,
      default() {
        return false
      }
    },
    size: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$label-before-size: $btn-input-font-size * $btn-input-line-height;
.custom-color {
  padding: 0;

  .custom-color-label {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    padding: $btn-input-padding-y $btn-input-padding-x;
    padding-left: calc(#{$btn-input-padding-x * 2} + #{$label-before-size});
    cursor: pointer;

    .custom-color-display {
      display: block;
      position: absolute;
      left: $btn-input-padding-x;
      top: 50%;
      width: $label-before-size;
      height: $label-before-size;
      border-radius: 99rem;
      border: $border-width solid transparent;
      transform: translateY(-50%);
    }
  }

  &.form-control-lg {
    .custom-color-label {
      padding: $btn-input-padding-y-lg $btn-input-padding-x-lg;
      padding-left: calc(#{$btn-input-padding-x-lg * 2} + #{$label-before-size});

      .custom-color-display {
        left: $btn-input-padding-x-lg;
      }
    }
  }
}
</style>
