<template>
  <component
    :is="isSimpleGroup ? 'div' : 'fieldset'"
    ref="group"
    :class="{
      'form-group-disabled': isDisabled,
      'form-group-invalid': state === false,
      'form-group-no-label': !label,
      'form-group-valid': state === true,
    }"
    :role="isSimpleGroup ? 'group' : null"
    class="form-group"
  >
    <component
      :is="isSimpleGroup ? 'label' : 'legend'"
      v-if="label"
      :for="isSimpleGroup ? controlId : null"
      :tabindex="isSimpleGroup ? null : -1"
      class="form-group-label"
    >
      <span>{{ label }}</span>
    </component>
    <slot></slot>
    <transition name="form-feedback">
      <p v-if="state === false" class="form-invalid-feedback">
        {{ invalidFeedback || $t('fieldRequired') }}
      </p>
    </transition>
  </component>
</template>

<script>
export default {
  props: {
    invalidFeedback: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    state: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      isDisabled: false,
      isSimpleGroup: true,
    }
  },
  computed: {
    controlId() {
      return `form-control-${this._uid}`
    },
  },
  mounted() {
    this.checkControls()
  },
  methods: {
    checkControls() {
      const controls = this.$refs.group.querySelectorAll(
        '.form-control:not([class*="custom"])'
      )
      if (controls && controls.length === 1) {
        controls[0].setAttribute('id', this.controlId)
        this.isDisabled = Boolean(controls[0].getAttribute('disabled'))
      } else {
        this.isSimpleGroup = false
      }
    },
  },
}
</script>
