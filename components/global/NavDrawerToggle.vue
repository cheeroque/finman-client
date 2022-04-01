<template>
  <li :class="{ expanded: expanded }" role="presentation" class="nav-toggle">
    <button
      class="nav-item"
      :title="$t(expanded ? 'menuCollapse' : 'menuExpand')"
      :aria-label="$t(expanded ? 'menuCollapse' : 'menuExpand')"
      @click="$emit('toggle')"
    >
      <svg
        width="24"
        height="24"
        version="1.1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
      >
        <rect x="3" y="4" width="18" height="2" />
        <rect x="3" y="11" width="18" height="2" />
        <rect x="3" y="18" width="18" height="2" />
      </svg>
    </button>
  </li>
</template>

<script>
export default {
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-toggle {
  .icon {
    rect {
      transition: $transition;
      transition-property: width;
    }
  }

  &.expanded {
    .icon {
      rect {
        & + rect {
          width: 11px;
          & + rect {
            width: 15px;
          }
        }
      }
    }
  }
}
</style>
