<template>
  <transition name="sidebar" duration="200">
    <aside v-show="visible" class="app-sidebar">
      <div class="sidebar-content">
        <SidebarSearch />
        <ul class="sidebar-nav">
          <li class="nav-text">Администрирование</li>
          <li class="nav-item">
            <nuxt-link to="/categories" class="nav-link"> Категории </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/users" class="nav-link"> Пользователи </nuxt-link>
          </li>
          <SidebarExport />
        </ul>

        <ul class="sidebar-nav">
          <li class="nav-text">Дата сверки</li>
          <SidebarRevise />
        </ul>

        <hr class="sidebar-divider" />

        <ul class="sidebar-nav">
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout"> Выйти </a>
          </li>
        </ul>

        <button class="btn btn-icon sidebar-toggle" title="Скрыть боковое меню" @click="$emit('hide')">
          <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
        </button>
      </div>
      <div class="sidebar-backdrop" @click="$emit('hide')"></div>
    </aside>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
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
.sidebar-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding-top: 1.5rem;
  color: $white;
  background-color: $primary;
}

.sidebar-nav {
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 0;
  list-style: none;

  /deep/ {
    .nav-link {
      display: block;
      padding: 0.375rem 1rem;
      text-decoration: none;
      color: inherit;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .nav-text {
    display: block;
    padding: 0 1rem 0.5rem;
    font-family: $font-family-alternate;
    font-size: $font-size-1;
    font-weight: $font-weight-medium;
    line-height: $line-height-heading;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
}

.sidebar-divider {
  margin: 0 0 1.5rem;
  border-color: rgba($white, 0.15);
}

.sidebar-toggle {
  position: absolute;
  left: 0.25rem;
  bottom: 0.25rem;
}

@media (max-width: 991.98px) {
  .app-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: $transition-base;
    transition-property: transform;
    z-index: 1000;
  }

  .sidebar-content {
    position: relative;
    width: 75%;
    z-index: 1;
  }

  .sidebar-backdrop {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($black, 0.75);
    opacity: 1;
    cursor: pointer;
    transition: $transition-base;
    transition-property: opacity;
  }

  .sidebar-enter-active,
  .sidebar-leave-active {
    .sidebar-content {
      transition: $transition-base;
      transition-property: transform;
      transition-duration: 0.2s;
    }

    .sidebar-backdrop {
      transition: $transition-base;
      transition-property: opacity;
      transition-duration: 0.1s;
    }
  }

  .sidebar-enter,
  .sidebar-leave-to {
    .sidebar-content {
      transform: translateX(-100%);
    }

    .sidebar-backdrop {
      opacity: 0;
    }
  }
}

@media (min-width: 992px) {
  .app-sidebar {
    display: block !important;
    flex: 0 0 400px;
    min-height: 0;
    overflow-y: auto;
  }

  .sidebar-toggle,
  .sidebar-backdrop {
    display: none;
  }
}
</style>
