<template>
  <div class="card category-card">
    <p class="h5 category-name">
      <nuxt-link :to="`/categories/${category.id}`">
        {{ category.name }}
      </nuxt-link>
    </p>
    <p class="category-slug card-text-muted">
      {{ category.slug }}
    </p>
    <p :class="categoryTypeClass" class="category-type">
      {{ categoryTypeText }}
    </p>
    <button
      :style="{
        color: getContrastColor(
          category.color,
          'var(--on-background)',
          'var(--background)'
        ),
        backgroundColor: category.color,
      }"
      :title="$t('category.edit')"
      :aria-label="$t('category.edit')"
      class="category-color"
      @click="editCategory"
    >
      <svg-icon name="edit-24" width="16" height="16" aria-hidden="true" />
    </button>
  </div>
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
    editCategory() {
      this.$dialogFullscreen(
        'CategoryForm',
        { categoryId: this.category.id },
        { title: this.$t('category.edit') }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.category-card {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(3, auto);
  gap: 0.25rem $grid-gap;
  font-size: $font-size-base * 0.875;

  p {
    margin-bottom: 0;
    line-height: $line-height-heading;
  }

  .category-name {
    grid-column: 1 / 2;
    font-weight: $font-weight-medium;
  }

  .category-slug {
    grid-column: 1 / 2;
  }

  .category-type {
    grid-column: 1 / 2;
  }

  .category-type-income {
    color: $success;
  }

  .category-type-expense {
    color: $danger;
  }

  .category-color {
    display: flex;
    align-items: center;
    align-self: start;
    justify-content: center;
    justify-self: flex-end;
    grid-column: 2 / 3;
    grid-row: 1 / 4;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 99rem;
    border: none;
    appearance: none;
    cursor: pointer;
    transition: $transition;
    transition-property: box-shadow;

    &:not(:disabled):not(.disabled):focus,
    &:not(:disabled):not(.disabled):hover {
      box-shadow: 0 0 0 0.125rem var(--secondary-container);
    }
  }
}
</style>
