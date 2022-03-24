<template>
  <PageWrapper :widgets="['Chart', 'Calendar']">
    <PageHeader> Категории </PageHeader>
    <main class="categories-list">
      <CardCategory
        v-for="(category, index) in categories"
        :key="`category-${index}`"
        :category="category"
        class="categories-list-item"
      />
    </main>
    <FloatingButton link="/categories/create" title="Добавить категорию" />
  </PageWrapper>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  transition: {
    name: 'page',
    mode: '',
  },
  computed: {
    ...mapGetters(['categories']),
  },
}
</script>

<style lang="scss" scoped>
.categories-list {
  margin-bottom: 1rem;
}

.categories-list-item {
  margin-bottom: 0.5rem;
}

@include media-min-width('lg') {
  .categories-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $grid-gap;
  }

  .categories-list-item {
    margin-bottom: 0;
  }
}

@include media-min-width('xl') {
  .categories-list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
