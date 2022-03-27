<template>
  <nuxt-link
    :to="`/categories/${category.id}`"
    :style="{
      color: getContrastColor(
        category.color,
        'var(--on-background)',
        'var(--background)'
      ),
      backgroundColor: category.color,
    }"
    class="card category-card-simple"
  >
    <p class="h6 category-name mb-4">
      {{ category.name }}
    </p>
    <p class="category-type mb-0">
      {{ categoryTypeText }}
    </p>
  </nuxt-link>
</template>

<script>
import { getContrastColor } from '@/utils'

export default {
  props: {
    category: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    categoryTypeClass() {
      return this.category.is_income
        ? 'category-type-income'
        : 'category-type-expense'
    },
    categoryTypeText() {
      return this.$t(this.category.is_income ? 'incomes' : 'expenses')
    },
  },
  methods: {
    getContrastColor,
  },
}
</script>

<style lang="scss" scoped>
.category-card-simple {
  font-size: $font-size-base * 0.75;

  p {
    max-width: 100%;
    line-height: $line-height-heading;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &:hover {
    text-decoration: none;
    color: var(--on-primary) !important;
    background-color: var(--primary) !important;
  }
}
</style>
