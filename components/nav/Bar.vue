<template>
  <nav class="navbar">
    <ul class="nav navbar-nav">
      <li
        v-for="(item, index) in navbarItems"
        :key="`navbar-item-${index}`"
        role="presentation"
      >
        <button v-if="item.action" class="nav-item" @click="$emit(item.action)">
          <span class="nav-item-icon">
            <svg-icon
              :name="item.icon"
              width="24"
              height="24"
              aria-hidden="true"
            />
          </span>
          {{ item.text }}
        </button>
        <nuxt-link
          v-else
          :class="{ active: isRouteActive(item.show) }"
          :to="item.show ? `/?show=${item.show}` : '/'"
          class="nav-item"
        >
          <span class="nav-item-icon">
            <svg-icon
              :name="item.icon"
              width="24"
              height="24"
              aria-hidden="true"
            />
          </span>
          {{ item.text }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navbarItems: [
        {
          action: 'drawer-show',
          icon: 'menu-24',
          text: this.$t('menu'),
        },
        {
          icon: 'home-24',
          show: null,
          text: this.$t('home'),
        },
        {
          icon: 'cart-24',
          show: 'expense',
          text: this.$t('expenses'),
        },
        {
          icon: 'card-24',
          show: 'income',
          text: this.$t('incomes'),
        },
      ],
    }
  },
  computed: {
    queryShow() {
      return this.$route.query.show || null
    },
  },
  methods: {
    isRouteActive(show) {
      return show
        ? this.queryShow === show
        : this.$route.path === '/' && this.queryShow === show
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: $navbar-padding-y $navbar-padding-x;
  color: $navbar-color;
  background-color: $navbar-bg;
  z-index: $zindex-navbar;
}

.navbar-nav {
  gap: 1.5rem;
  font-family: $navbar-font-family;

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 0;
    font-size: $font-size-base * 0.875;
    line-height: calc(#{$line-height-base} / 0.875);

    .nav-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: $navbar-icon-spacer;
      padding: $navbar-icon-padding-y $navbar-icon-padding-x;
      border-radius: 99rem;
      transition: $transition;
      transition-property: color, background-color;
    }

    &:focus {
      color: var(--secondary);

      .nav-item-icon {
        color: var(--secondary);
      }
    }

    &.active {
      color: $navbar-active-color;

      .nav-item-icon {
        color: $navbar-active-color;
        background-color: $navbar-active-bg;
      }
    }
  }
}

@include media-min-width('md') {
  .navbar {
    display: none;
  }
}
</style>
