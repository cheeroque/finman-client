<template>
  <li role="presentation">
    <component
      :is="isBeginning ? 'span' : 'nuxt-link'"
      :to="isBeginning ? null : getPageLink(1)"
      :class="{ disabled: isBeginning }"
      aria-label="В начало"
      class="btn nav-item nav-item-first"
    >
      <svg-icon
        name="chevron-double-left-24"
        width="24"
        height="24"
        aria-hidden="true"
      />
    </component>
  </li>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: null,
    },
    to: {
      type: [Object, String],
      default() {
        return {}
      },
    },
  },
}
</script>
