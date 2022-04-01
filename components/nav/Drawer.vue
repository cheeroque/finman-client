<template>
  <div>
    <transition name="drawer">
      <nav
        v-show="visible"
        :class="{ open: visible, expanded: drawerExpanded }"
        class="drawer"
      >
        <ul class="nav drawer-nav">
          <NavDrawerToggle
            :expanded="drawerExpanded"
            @toggle="drawerExpanded = !drawerExpanded"
          />
          <NavDrawerHeader title="pages" />
          <NavDrawerLink
            v-for="(item, index) in drawerLinks"
            :key="`nav-item-${index}`"
            :active="isRouteActive([item.link], $route.path)"
            :item="item"
          />

          <NavDrawerDivider />

          <NavDrawerHeader title="actions" />
          <NavDrawerAction
            v-for="(item, index) in drawerActions"
            :key="`nav-item-action-${index}`"
            :item="item"
            @click="item.action"
          />
          <NavDrawerSnapshot />

          <NavDrawerDivider />

          <NavDrawerAction :item="drawerLogout" @click="logout" />
        </ul>

        <SearchForm class="sidebar-search" />
      </nav>
    </transition>
    <transition name="drawer-backdrop">
      <div
        v-show="visible"
        class="drawer-backdrop"
        aria-hidden="true"
        @click="$emit('close')"
      ></div>
    </transition>
  </div>
</template>

<script>
import { isRouteActive } from '@/utils'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawerActions: [
        {
          action: this.downloadFile,
          icon: 'export-24',
          text: this.$t('exportData'),
        },
      ],
      drawerLogout: {
        action: this.logout,
        icon: 'logout-24',
        text: this.$t('logout'),
      },
      drawerLinks: [
        {
          icon: 'home-24',
          link: '/',
          text: this.$t('home'),
        },
        {
          icon: 'categories-24',
          link: '/categories',
          text: this.$t('category.categories'),
        },
        {
          icon: 'calendar-24',
          link: '/months',
          text: this.$t('calendar'),
        },
        // {
        //   icon: 'user-24',
        //   link: '/users',
        //   text: this.$t('users'),
        // },
      ],
      drawerExpanded: false,
      loading: false,
    }
  },
  methods: {
    isRouteActive,
    async downloadFile() {
      this.loading = true
      try {
        const path = await this.$axios.$get('export')
        const link = document.createElement('a')
        link.href = `${process.env.PUBLIC_URL}${path}`
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        this.$errorToast(error)
      }
      this.loading = false
    },
    async logout() {
      await this.$auth.logout().then(() => {
        this.$auth.setUser(false)
      })
    },
    saveSnapshot() {
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
.drawer {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  max-width: 85%;
  padding: $drawer-padding-y $drawer-padding-x;
  border-radius: 0 1rem 1rem 0;
  color: $drawer-color;
  background-color: $drawer-bg;
  overflow-y: auto;
  z-index: $zindex-drawer;

  .drawer-nav {
    flex-direction: column;

    & > * {
      flex: 0 0 auto;
    }
  }

  .nav-toggle {
    display: none;
  }

  ::v-deep {
    .sidebar-search {
      margin: auto 1rem 1rem;
    }

    .search-input-group {
      .form-control {
        border-radius: $drawer-item-border-radius;
        color: var(--on-surface-variant);
        background-color: var(--surface-variant);

        &::placeholder {
          color: var(--secondary);
        }
      }

      .input-group-append {
        .btn {
          color: var(--secondary);
        }
      }
    }

    .nav-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: $drawer-item-padding-y $drawer-item-padding-x;
      border-radius: $drawer-item-border-radius;

      .icon {
        margin-right: $drawer-item-icon-spacing;
      }

      &:hover {
        color: $drawer-active-bg;
      }

      &.active {
        color: $drawer-active-color;
        background-color: $drawer-active-bg;
      }
    }
  }
}

.drawer-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $backdrop-color;
  cursor: pointer;
  z-index: 1009;
}

.btn-drawer-close {
  position: absolute;
  left: $drawer-padding-x;
  bottom: 1.5rem;
  padding: $drawer-item-padding-y $drawer-item-padding-x;
  border: none;
}

@include media-min-width('md') {
  .drawer {
    display: block !important;
    flex: 0 0 auto;
    position: static;
    width: calc(24px + #{$drawer-item-padding-x * 2});
    max-width: none;
    height: 100%;
    padding: 0;
    color: $body-color;
    background-color: transparent;
    overflow-y: auto;
    transition: $transition;
    transition-property: width;

    .nav-toggle {
      display: flex;
    }

    ::v-deep {
      .sidebar-search {
        display: none;
      }

      .nav-item {
        max-width: 100%;
        margin-bottom: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        transition: $transition;

        .icon {
          margin-right: $drawer-item-padding-x;
          transition: $transition;
        }

        &.active {
          color: var(--on-primary);
          background-color: var(--primary);
        }
      }
    }

    &.expanded {
      width: 240px;

      .drawer-nav {
        .nav-item {
          .icon {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }

  .drawer-backdrop,
  .btn-drawer-close {
    display: none;
  }
}
</style>
