<template>
  <nav class="navbar">
    <ul class="nav navbar-nav">
      <li role="presentation">
        <button class="nav-item" @click="$emit('drawer-show')">
          <span class="nav-item-icon">
            <svg-icon name="menu-24" width="24" height="24" aria-hidden="true" />
          </span>
          Меню
        </button>
      </li>
      <li role="presentation">
        <nuxt-link :class="{ active: isActive(['/expenses', '/']) }" to="/" class="nav-item">
          <span class="nav-item-icon">
            <svg-icon name="cart-24" width="24" height="24" aria-hidden="true" />
          </span>
          Расходы
        </nuxt-link>
      </li>
      <li role="presentation">
        <nuxt-link :class="{ active: isActive(['/incomes']) }" to="/incomes" class="nav-item">
          <span class="nav-item-icon">
            <svg-icon name="card-24" width="24" height="24" aria-hidden="true" />
          </span>
          Доходы
        </nuxt-link>
      </li>
      <li role="presentation">
        <button class="nav-item" @click="$emit('search-show')">
          <span class="nav-item-icon">
            <svg-icon name="search-24" width="24" height="24" aria-hidden="true" />
          </span>
          Поиск
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    isActive(routes = []) {
      if (!routes || !routes.length) return
      const results = []
      routes.forEach((route) => {
        const currentRoute = this.$route.fullPath
        if (route === '/') results.push(route === currentRoute)
        else results.push(currentRoute.startsWith(route))
      })
      return results.some((result) => Boolean(result))
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
  color: var(--navbar-color);
  background-color: var(--navbar-bg);
  z-index: 1000;
}

.navbar-nav {
  gap: 1.5rem;
  font-family: $font-family-alternate;

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 0;

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

    &.active {
      .nav-item-icon {
        color: var(--navbar-active-color);
        background-color: var(--navbar-active-bg);
      }
    }
  }
}
</style>
