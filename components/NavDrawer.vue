<template>
  <div>
    <transition name="drawer">
      <nav v-if="visible" class="drawer">
        <ul class="nav drawer-nav">
          <li
            v-for="(item, index) in drawerItems"
            :key="`nav-item-${index}`"
            role="presentation"
          >
            <component v-if="item.component" :is="item.component" />
            <p v-else-if="item.isHeader" class="nav-item-header h5">
              {{ item.text }}
            </p>
            <nuxt-link
              v-else-if="item.link"
              :to="item.link"
              :class="{ active: isRouteActive([item.link], $route.fullPath) }"
              class="nav-item"
            >
              <svg-icon
                :name="item.icon"
                width="24"
                height="24"
                aria-hidden="true"
              />
              {{ item.text }}
            </nuxt-link>
            <button v-else class="nav-item" @click="$emit(item.action)">
              <svg-icon
                :name="item.icon"
                width="24"
                height="24"
                aria-hidden="true"
              />
              {{ item.text }}
            </button>
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
      drawerItems: [
        {
          isHeader: true,
          text: 'Меню',
        },
        {
          icon: 'home-24',
          link: '/',
          text: 'Главная страница',
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
        {
          action: 'export',
          icon: 'export-24',
          text: 'Экспорт данных',
        },
        {
          isHeader: true,
          text: 'Снапшоты',
        },
        {
          component: 'DrawerSnapshots',
        },
      ],
    }
  },
  methods: {
    isRouteActive,
  },
}
</script>
