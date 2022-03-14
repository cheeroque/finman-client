<template>
  <component
    :is="isSimpleGroup ? 'div' : 'fieldset'"
    ref="group"
    :class="{
      'form-group-no-label': !label,
      'form-group-invalid': state === false,
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
        {{ invalidFeedback }}
      </p>
    </transition>
  </component>
</template>

<script>
export default {
  props: {
    invalidFeedback: {
      type: String,
      default: 'Поле необходимо заполнить',
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
      } else {
        this.isSimpleGroup = false
      }
    },
  },
}
</script>
