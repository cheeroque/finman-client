<template>
  <div>
    <transition name="drawer">
      <nav
        v-show="visible"
        :class="{ open: visible, expanded: drawerExpanded }"
        class="drawer"
      >
        <ul class="nav drawer-nav">
          <li role="presentation" class="nav-toggle">
            <button
              class="nav-item"
              :title="drawerExpanded ? 'Свернуть' : 'Развернуть'"
              :aria-label="drawerExpanded ? 'Свернуть' : 'Развернуть'"
              @click="drawerExpanded = !drawerExpanded"
            >
              <svg-icon
                name="menu-24"
                width="24"
                height="24"
                aria-hidden="true"
              />
            </button>
          </li>
          <li role="presentation">
            <p class="nav-item-header h5">Страницы</p>
          </li>
          <li
            v-for="(item, index) in drawerLinks"
            :key="`nav-item-${index}`"
            role="presentation"
          >
            <NavDrawerLink
              :active="isRouteActive([item.link], $route.path)"
              :item="item"
            />
          </li>
          <li role="presentation">
            <hr class="nav-item-divider" />
          </li>
          <li role="presentation">
            <p class="nav-item-header h5">Действия</p>
          </li>
          <li
            v-for="(item, index) in drawerActions"
            :key="`nav-item-action-${index}`"
            role="presentation"
          >
            <NavDrawerAction :item="item" @click="item.action" />
          </li>
          <li role="presentation">
            <hr class="nav-item-divider" />
          </li>
          <li role="presentation">
            <NavDrawerAction :item="drawerLogout" @click="logout" />
          </li>
        </ul>
        <button
          title="Закрыть меню"
          aria-label="Закрыть меню"
          class="btn btn-drawer-close"
          @click="$emit('close')"
        >
          <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
        </button>
      </nav>
    </transition>
    <transition name="drawer-backdrop">
      <div
        v-if="visible"
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
          text: 'Экспорт данных',
        },
        {
          action: this.saveSnapshot,
          icon: 'datetime-24',
          text: 'Дата',
        },
      ],
      drawerLogout: {
        action: this.logout,
        icon: 'logout-24',
        text: 'Выйти',
      },
      drawerLinks: [
        {
          icon: 'home-24',
          link: '/',
          text: 'Главная',
        },
        {
          icon: 'categories-24',
          link: '/categories',
          text: 'Категории',
        },
        {
          icon: 'calendar-24',
          link: '/months',
          text: 'Календарь',
        },
        {
          icon: 'user-24',
          link: '/users',
          text: 'Пользователи',
        },
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
