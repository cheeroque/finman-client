<template>
  <b-sidebar
    v-model="localVisible"
    bg-variant="primary"
    text-variant="white"
    sidebar-class="app-sidebar"
    width="280px"
    backdrop
  >
    <template #header>
      <h1 class="display-3 mb-0">
        <AppTotal />
      </h1>
    </template>
    <b-nav class="sidebar-nav" vertical>
      <b-nav-text> Администрирование </b-nav-text>
      <b-nav-item to="/categories" link-classes="text-reset"> Категории </b-nav-item>
      <b-nav-item to="/users" link-classes="text-reset"> Пользователи </b-nav-item>
      <b-nav-item to="/export" link-classes="text-reset"> Экспорт </b-nav-item>

      <b-nav-text class="mt-16"> Дата сверки </b-nav-text>
      <LatestRevise />

      <b-nav-item class="mt-auto" link-classes="text-reset" @click="logout">
        <span class="caption"> Выйти </span>
      </b-nav-item>
    </b-nav>
  </b-sidebar>
</template>

<script>
import { BSidebar, BNav, BNavText, BNavItem } from 'bootstrap-vue'

export default {
  components: {
    BSidebar,
    BNav,
    BNavText,
    BNavItem
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit('change', newValue)
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
::v-deep {
  .app-sidebar {
    background-image: linear-gradient(to top, $primary, $primary-dark);

    .b-sidebar-header {
      padding: 0.75rem $grid-gutter-width / 2;
    }

    .b-sidebar-body {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    .sidebar-nav {
      height: 100%;

      .navbar-text {
        padding: 0.5rem $grid-gutter-width / 2;
        font-size: 0.75em;
        font-weight: $font-weight-medium;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        opacity: 0.5;
      }

      .nav-link {
        display: flex;
        align-items: center;
        padding: 0.5rem $grid-gutter-width / 2;

        .icon {
          flex: 0 0 auto;
          margin-right: 0.5rem;
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .b-sidebar-backdrop {
      display: none;
    }

    .app-sidebar {
      display: flex !important;
      position: static;
      width: auto !important;
      transform: none !important;

      .b-sidebar-header {
        padding: 0.75rem 2rem;
      }

      .sidebar-nav {
        .navbar-text {
          padding: 0.5rem 2rem;
        }

        .nav-link {
          padding: 0.5rem 2rem;
        }
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .b-sidebar-outer {
    position: static;
    height: auto;
  }
}
</style>
