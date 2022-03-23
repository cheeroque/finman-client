<template>
  <nav class="navbar">
    <ul class="nav navbar-nav">
      <li
        v-for="(item, index) in navbarItems"
        :key="`navbar-item-${index}`"
        role="presentation"
      >
        <nuxt-link
          v-if="item.link"
          :class="{
            active: isRouteActive(item.matchLinks || [item.link], $route.path),
          }"
          :to="item.link"
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
        <button v-else class="nav-item" @click="$emit(item.action)">
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
      </li>
    </ul>
  </nav>
</template>

<script>
import { isRouteActive } from '@/utils'

export default {
  data() {
    return {
      navbarItems: [
        {
          action: 'drawer-show',
          icon: 'menu-24',
          text: 'Меню',
        },
        {
          icon: 'home-24',
          link: '/',
          text: 'Главная',
        },
        {
          icon: 'cart-24',
          link: '/expenses',
          text: 'Расходы',
        },
        {
          icon: 'card-24',
          link: '/incomes',
          text: 'Доходы',
        },
      ],
    }
  },
  methods: {
    isRouteActive,
  },
}
</script>
