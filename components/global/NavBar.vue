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
          :class="{ active: item.show === queryShow }"
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
          text: 'Меню',
        },
        {
          icon: 'home-24',
          show: null,
          text: 'Главная',
        },
        {
          icon: 'cart-24',
          show: 'expense',
          text: 'Расходы',
        },
        {
          icon: 'card-24',
          show: 'income',
          text: 'Доходы',
        },
      ],
    }
  },
  computed: {
    queryShow() {
      return this.$route.query.show || null
    },
  },
}
</script>
