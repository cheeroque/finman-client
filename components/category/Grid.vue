<template>
  <nav class="category-grid">
    <nuxt-link
      v-for="(category, index) in categories"
      :key="`category-${index}`"
      :to="`/category/${category.id}`"
      class="nav-link"
    >
      {{ category.name }}
    </nuxt-link>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    await this.$store.dispatch('fetchCategories')
  },
  computed: {
    ...mapGetters(['categories', 'error'])
  }
}
</script>

<style lang="scss" scoped>
.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow: hidden;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.25rem;
  line-height: 1.125;
  text-decoration: none;
  white-space: nowrap;
  border-radius: $border-radius;
  color: inherit;
  background-color: $gray-50;

  &:hover {
    color: $white;
    background-color: $primary;
  }
}

@media (max-width: 991.98px) {
  .category-grid {
    padding: 0 1rem;
  }

  .nav-link {
    flex: 1 1 auto;
  }
}

@media (min-width: 992px) {
  .nav-link {
    flex: 0 1 0;
    padding: 0.75rem 1.5rem;
    font-family: $font-family-alternate;
    font-size: $font-size-base * 1.5;
  }
}
</style>
