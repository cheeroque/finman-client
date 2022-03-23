<template>
  <nav class="records-tabs">
    <ul class="nav nav-records-tabs">
      <li
        v-for="(item, index) in tabs"
        :key="`navbar-item-${index}`"
        role="presentation"
      >
        <nuxt-link
          :class="{
            active: isRouteActive([item.link], $route.fullPath),
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
      </li>
    </ul>
  </nav>
</template>

<script>
import { isRouteActive } from '@/utils'

export default {
  data() {
    return {
      tabs: [
        {
          icon: 'home-24',
          link: '/',
          text: 'Все записи',
        },
        {
          icon: 'cart-24',
          link: '/?show=expense',
          text: 'Только расходы',
        },
        {
          icon: 'card-24',
          link: '/?show=income',
          text: 'Только доходы',
        },
      ],
    }
  },
  methods: {
    isRouteActive,
  },
}
</script>

<style lang="scss" scoped>
.nav-records-tabs {
  gap: $grid-gap;

  & > * {
    flex: 1 1 auto;
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1rem;
    font-size: $font-size-base * 0.875;
    border-radius: 99rem;

    &.active {
      color: var(--on-primary-container);
      background-color: var(--primary-container);
    }
  }

  .nav-item-icon {
    display: flex;
    margin-right: 0.5rem;
  }
}
</style>
