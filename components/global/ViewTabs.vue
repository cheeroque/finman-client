<template>
  <nav class="view-tabs">
    <ul class="nav-tabs">
      <li v-for="(tab, index) in tabs" :key="`tab-${index}`" class="nav-item">
        <nuxt-link
          :to="{ query: tab.value ? { show: tab.value } : null }"
          :class="{ active: tab.value === active }"
          class="nav-link"
        >
          <svg-icon :name="tab.icon" width="24" height="24" aria-hidden="true" />
          {{ tab.text }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: null
    },
    tabs: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-tabs {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  border-bottom: $border-width solid $border-color;

  .nav-item {
    flex: 1 1 100%;
    margin-bottom: -#{$border-width};
  }

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.34375rem 0.75rem;
    font-family: $font-family-alternate;
    font-size: $font-size-2;
    font-weight: $font-weight-medium;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;

    .icon {
      margin-right: 0.5rem;
    }

    &.active {
      border-bottom-color: currentColor;
    }
  }
}

@media (max-width: 991.98px) {
  .nav-tabs {
    .nav-link {
      .icon {
        display: none;
      }
    }
  }
}

@media (min-width: 992px) {
  .nav-tabs {
    .nav-link {
      padding: 0.9375rem 1.5rem;
      font-size: $font-size-base;
    }
  }
}
</style>
