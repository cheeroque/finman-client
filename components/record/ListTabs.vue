<template>
  <nav class="records-tabs">
    <ul class="nav nav-records-tabs">
      <li
        v-for="(item, index) in tabs"
        :key="`navbar-item-${index}`"
        role="presentation"
      >
        <nuxt-link
          :class="{ active: item.show === queryShow }"
          :to="localePath(item.show ? `/?show=${item.show}` : '/')"
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
      tabs: [
        {
          icon: 'home-24',
          show: null,
          text: this.$t('allRecords'),
        },
        {
          icon: 'cart-24',
          show: 'expense',
          text: this.$t('expensesOnly'),
        },
        {
          icon: 'card-24',
          show: 'income',
          text: this.$t('incomesOnly'),
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
