<template>
  <div class="app-navbar">
    <div class="btn-create-wrapper">
      <b-button variant="primary" size="lg" class="shadow" block @click="$emit('create-record')"> Добавить </b-button>
    </div>
    <b-nav class="navbar-nav">
      <b-nav-item v-for="tab in tabs" :key="tab.value" :active="show === tab.value" @click="$emit('change', tab.value)">
        <svg-icon :name="`show-${tab.value}-24`" width="24" height="24" aria-hidden="true" />
        <span class="caption">
          {{ tab.text }}
        </span>
      </b-nav-item>
      <b-nav-item class="d-none d-lg-block mt-auto" @click="logout">
        <svg-icon name="exit-24" width="24" height="24" aria-hidden="true" />
        <span class="caption"> Выйти </span>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
import { BNav, BNavItem } from 'bootstrap-vue'

export default {
  components: {
    BNav,
    BNavItem
  },
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: String,
      default: 'expense'
    },
    tabs: {
      type: Array,
      default() {
        return [
          { value: 'expense', text: 'Расходы' },
          { value: 'income', text: 'Доходы' },
          { value: 'all', text: 'Все записи' }
        ]
      }
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout().then(() => {
        this.$auth.setUser(false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-navbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $zindex-dropdown - 1;

  .btn-create-wrapper {
    padding: $grid-gutter-width / 2;
  }

  .navbar-nav {
    flex-wrap: nowrap;
    font-size: $font-size-1;
    text-align: center;
    background-color: $white;
    box-shadow: $box-shadow;

    .nav-item {
      flex: 1 1 0;
    }

    .nav-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.375rem 1rem 0.5rem;
      color: $gray-500;
      transition: $transition-base;
      transition-property: color;

      &:hover {
        color: $gray-600;
      }

      &.active {
        color: $primary;

        &:hover {
          color: $primary-dark;
        }
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .app-navbar {
    display: flex;
    left: auto;
    right: 0;
    top: 0;
    bottom: 0;
    width: $navbar-width-collapse;
    padding-top: $header-height-lg;
    padding-bottom: 1.5rem;
    background-color: $gray-200;

    .btn-create-wrapper {
      display: flex;
      align-items: center;
      position: absolute;
      right: 100%;
      left: auto;
      top: 0;
      min-height: $header-height-lg;
      padding: 0 $grid-gutter-width;
    }

    .navbar-nav {
      flex-grow: 1;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-start;
      background-color: transparent;
      box-shadow: none;

      .nav-item {
        flex: 0 0 auto;
      }

      .nav-link {
        padding: 0.5rem;
        color: $gray-500;
        transition-property: color, background-color;

        .caption {
          display: none;
        }

        &:hover {
          color: $gray-600;
        }

        &.active {
          color: $white;
          background-color: $primary;

          &:hover {
            color: $white;
            background-color: $primary-dark;
          }
        }
      }
    }
  }
}

@include media-breakpoint-up(xl) {
  .app-navbar {
    flex-direction: column;
    padding-top: 0;
    width: $navbar-width-expand;

    .btn-create-wrapper {
      position: static;
      min-height: $header-height-lg;
    }

    .navbar-nav {
      font-size: $font-size-3;

      .nav-link {
        flex-direction: row;
        padding: 0.75rem $grid-gutter-width;

        .caption {
          display: inline;
          margin-left: $grid-gutter-width / 2;
        }
      }
    }
  }
}
</style>
