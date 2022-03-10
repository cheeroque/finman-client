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
    <span :style="{ backgroundColor: category.color }" class="category-color" />
  </div>
</template>

<script>
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
      return this.category.is_income ? 'Доходы' : 'Расходы'
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
    align-self: start;
    justify-self: end;
    grid-column: 2 / 3;
    grid-row: 1 / 4;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 99rem;
  }
}
</style>
